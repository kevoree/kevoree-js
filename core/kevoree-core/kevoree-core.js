'use strict';

const kevoree = require('kevoree-library');
const EventEmitter = require('events').EventEmitter;
const adaptationsExecutor = require('./lib/adaptation-executor');

const NAME_PATTERN = /^[\w]+$/;

/**
 * KevoreeCore is the kernel of the Kevoree JavaScript runtime
 *
 * @param       {Resolver}      resolver      service to download the DeployUnits
 * @param       {KevScript}     kevscript     service to interpret the KevScript
 * @param       {LoggerFactory} loggerFactory service to create loggers
 * @throws      {Error}                       undefined constructor params
 * @constructor
 */
function KevoreeCore(resolver, kevscript, loggerFactory) {
  if (!resolver || !kevscript || !loggerFactory) {
    throw new Error('KevoreeCore constructor needs: Resolver, KevScript engine and a LoggerFactory');
  }
  this.resolver = resolver;
  this.loggerFactory = loggerFactory;
  this.log = loggerFactory.create('Core');
  this.kevs = kevscript;
  this.stopping = false;
  this.currentModel = null;
  this.deployModel = null;
  this.nodeName = null;
  this.nodeInstance = null;
  this.firstBoot = true;
  this.scriptQueue = [];

  this.emitter = new EventEmitter();
}

KevoreeCore.prototype = {
  /**
   * Starts the core
   * This method is synchronous.
   * Once started you can #deploy(...) models
   *
   * @param  {string} nodeName the name of the node to bootstrap on
   * @throws {Error}           invalid nodeName
   */
  start(nodeName) {
    if (!nodeName || nodeName.length === 0) {
      nodeName = 'node0';
    }

    if (nodeName.match(NAME_PATTERN)) {
      this.nodeName = nodeName;
      const factory = new kevoree.factory.DefaultKevoreeFactory();
      this.currentModel = factory.createContainerRoot();
      factory.root(this.currentModel);

      // create platform node
      const node = factory.createContainerNode();
      node.name = this.nodeName;
      node.started = false;

      // add platform node
      this.currentModel.addNodes(node);

      // hang-on until the core is stopped
      this.loopId = setInterval(() => {}, 10e10);

      this.log.info('Platform node name: ' + nodeName);
    } else {
      throw new Error('Platform node name must match this regex ' + NAME_PATTERN.toString());
    }
  },

  /**
   * Stops the core
   * @return {Promise} resolved when the core is stopped
   */
  stop() {
    this.log.info('Stopping Kevoree...');

    if (this.nodeInstance === null) {
      clearInterval(this.loopId);
      this.emitter.emit('stopped');
      return Promise.reject(new Error('Platform stopped before bootstrapped'));

    } else {
      const factory = new kevoree.factory.DefaultKevoreeFactory();
      const cloner = factory.createModelCloner();
      const stopModel = cloner.clone(this.currentModel, false);
      const node = stopModel.findNodesByID(this.nodeName);
      if (node.started) {
        node.started = false;
        const subNodes = node.hosts.iterator();
        while (subNodes.hasNext()) {
          subNodes.next().delete();
        }

        const groups = node.groups.iterator();
        while (groups.hasNext()) {
          groups.next().delete();
        }

        const bindings = stopModel.mBindings.iterator();
        while (bindings.hasNext()) {
          const binding = bindings.next();
          if (binding.port.eContainer() &&
            binding.port.eContainer().eContainer() &&
            binding.port.eContainer().eContainer().name === node.name) {
            if (binding.hub) {
              binding.hub.delete();
            }
          }
        }

        const comps = node.components.iterator();
        while (comps.hasNext()) {
          comps.next().delete();
        }

        this.stopping = true;
        return this.deploy(stopModel)
          .then(() => {
            this.log.info('Platform stopped: ' + this.nodeInstance.getName());
            clearInterval(this.loopId);
            this.emitter.emit('stopped');
          })
          .catch((err) => {
            this.log.error(err);
            this.log.error('Something went wrong while stopping Kevoree. Force stop.');
            clearInterval(this.loopId);
            this.emitter.emit('stopped');
            throw err;
          });
      }
    }
  },

  /**
   * Deploy a model
   * Ask the node platform to create a delta between the current model and the
   * given one. The resulting delta must be a set of commands to sequentially
   * execute in order to move to the next state (described by the given model)
   *
   * @param  {ContainerRoot} model the new state to converge to
   * @return {Promise}             resolved when the model is deployed
   */
  deploy(model) {
    if (!this.deployModel) {
      this.emitter.emit('deploying', model);
      if (model && !model.findNodesByID(this.nodeName)) {
        return Promise.reject(new Error('Deploy model failure: unable to find ' + this.nodeName + ' in given model'));
      } else {
        this.log.debug((this.stopping ? 'Stopping' : 'Deploy') + ' process started...');
        if (model) {
          // check if there is an instance currently running
          // if not, it will try to run it
          return this.checkBootstrapNode(model)
            .then(() => {
              if (this.nodeInstance) {
                let adaptations;
                try {
                  // monkey-patch model because of KMF
                  monkeyPatchKMF(model);
                  const factory = new kevoree.factory.DefaultKevoreeFactory();
                  // clone model so that adaptations won't modify the proposed one
                  const cloner = factory.createModelCloner();
                  this.deployModel = cloner.clone(model, true);
                  // set it read-only to ensure adaptations consistency
                  this.deployModel.setRecursiveReadOnly();
                  // make a diff between the current model and the model to deploy
                  const diffSeq = factory.createModelCompare().diff(this.currentModel, this.deployModel);
                  // ask the node platform to create the needed adaptation commands
                  adaptations = this.nodeInstance.processTraces(diffSeq, this.deployModel);
                  // execute adaptation commands
                  return adaptationsExecutor(this, model, adaptations);
                } catch (err) {
                  this.log.error(err.stack);
                  const error = new Error('Something went wrong while creating adaptations (deployment ignored)');
                  this.log.warn(error.message);
                  this.deployModel = null;
                  if (this.firstBoot) {
                    // === If firstBoot adaptations creation failed then it is bad => exit
                    this.log.warn('Shutting down Kevoree because bootstrap failed...');
                    this.emitter.emit('error', error);
                    throw error;
                  } else {
                    this.emitter.emit('error', error);
                    throw error;
                  }
                }
              } else {
                throw new Error('There is no instance to bootstrap on');
              }
            }, () => {
              this.log.error('Unable to bootstrap \'' + this.nodeName + "'");
              this.deployModel = null;
              return this.stop();
            })
            .catch((err) => {
              this.emitter.emit('error', err);
              throw err;
            });
        } else {
          return Promise.reject(new Error('Model is not defined or null. Deploy aborted.'));
        }
      }
    } else {
      // TODO add the possibility to put new deployment in pending queue
      this.log.warn('New deploy process requested: aborted because another one is in process (retry later?)');
      return Promise.reject(new Error('New deploy process requested: aborted because another one is in process (retry later?)'));
    }
  },

  submitScript(script) {
    if (this.deployModel === null) {
      // good to go
      return this.kevs.parse(script, this.currentModel)
        .then(({ model }) => this.deploy(model))
        .then(() => {
          this.log.info('KevScript submission succeeded');
        })
        .catch((err) => {
          this.log.warn('KevScript submission threw an error');
          this.log.warn(err.stack);
          throw err;
        });
    } else {
      // in "deploying state" => need to queue request to process it afterwards
      const promise = Promise.resolve();
      this.scriptQueue.push({ script: script, promise: promise });
      this.log.debug('Script added to queue at position ' + this.scriptQueue.length - 1);
      return promise;
    }
  },

  processScriptQueue() {
    if (this.scriptQueue.length > 0) {
      // retrieve first queued script
      const item = this.scriptQueue[0];
      // remove first queued script from the queue
      this.scriptQueue.splice(0, 1);
      // execute first queued script
      this.log.debug('Core.processScriptQueue parsing ' + item.script);
      item.promise.then(() => this.submitScript(item.script));
    }
  },

  /**
   * Checks whether or not the node platform is bootstrapped.
   * If not, then download the DeployUnit, installs it and run it.
   * Resolves directly if already bootstrapped.
   *
   * @param  {ContainerRoot} model the model used to retrieve the node
   * @return {Promise}             resolves when bootstrapped
   */
  checkBootstrapNode(model) {
    if (this.nodeInstance) {
      return Promise.resolve();
    } else {
      this.log.debug('Start \'' + this.nodeName + '\' bootstrapping...');
      const node = model.findNodesByID(this.nodeName);
      if (node) {
        const meta = node.typeDefinition.select('deployUnits[]/filters[name=platform,value=js]');
        if (meta.size() > 0) {
          return this.resolver.resolve(meta.get(0).eContainer())
            .then((Node) => {
              const deployNode = model.findNodesByID(this.nodeName);
              const currentNode = this.currentModel.findNodesByID(this.nodeName);

              // create node instance
              this.nodeInstance = new Node(this, deployNode, this.nodeName);

              // bootstrap node dictionary
              const factory = new kevoree.factory.DefaultKevoreeFactory();
              currentNode.dictionary = factory.createDictionary().withGenerated_KMF_ID('0');
              if (deployNode.typeDefinition.dictionaryType) {
                deployNode.typeDefinition.dictionaryType.attributes.array.forEach((attr) => {
                  if (!attr.fragmentDependant) {
                    const param = factory.createValue();
                    param.name = attr.name;
                    const currVal = deployNode.dictionary.findValuesByID(param.name);
                    if (!currVal) {
                      param.value = attr.defaultValue;
                      currentNode.dictionary.addValues(param);
                      this.log.debug('Set default node param: ' + param.name + '=' + param.value);
                    }
                  }
                });
              }
            })
            .catch(() => {
              throw new Error('Unable to bootstrap \''+ this.nodeName +'\'');
            });
        } else {
          return Promise.reject(new Error('No DeployUnit found for \'' + this.nodeName + '\' that matches the \'js\' platform'));
        }
      } else {
        return Promise.reject(new Error('Unable to find \'' + this.nodeName + '\' in the given model.'));
      }
    }
  },

  on(event, handler) {
    this.emitter.on(event, handler);
  },

  once(event, handler) {
    this.emitter.once(event, handler);
  },

  off(event, handler) {
    this.emitter.removeListener(event, handler);
  },

  getResolver() {
    return this.resolver;
  },

  getCurrentModel() {
    return this.currentModel;
  },

  getDeployModel() {
    return this.deployModel;
  },

  getLastModel() {
    if (this.deployModel) {
      return this.deployModel;
    } else {
      return this.currentModel;
    }
  },

  getNodeName() {
    return this.nodeName;
  },

  getLoggerFactory() {
    return this.loggerFactory;
  }
};

function hash(str) {
  let val = 0;
  if (str.length === 0) {
    return val + '';
  }
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    val = ((val << 5) - val) + char;
    val = val & val; // Convert to 32bit integer
  }
  return (val & 0xfffffff) + '';
}

function bindingHash(binding) {
  const hubPath = binding.hub ? binding.hub.path() : 'UNDEFINED';
  const portPath = binding.port ? binding.port.path() : 'UNDEFINED';
  return hash(hubPath + '_' + portPath);
}

function monkeyPatchKMF(proposedModel) {
  proposedModel.mBindings.array.forEach((possibleBinding) => {
    possibleBinding.generated_KMF_ID = bindingHash(possibleBinding);
  });
}

module.exports = KevoreeCore;
