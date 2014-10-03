var Class         = require('pseudoclass'),
    kevoree       = require('kevoree-library').org.kevoree,
    KevoreeLogger = require('kevoree-commons').KevoreeLogger,
    async         = require('async'),
    os            = require('os'),
    EventEmitter  = require('events').EventEmitter;

var NAME_PATTERN = /^[\w-]+$/;

/**
 * Kevoree Core
 *
 * @type {Object}
 */
var Core = Class({
    toString: 'KevoreeCore',

    /**
     * Core constructor
     */
    construct: function(modulesPath, logger) {
        this.log = (logger != undefined) ? logger : new KevoreeLogger(this.toString());

        this.factory = new kevoree.factory.DefaultKevoreeFactory();
        this.loader  = this.factory.createJSONLoader();
        this.compare = this.factory.createModelCompare();
        this.cloner  = this.factory.createModelCloner();

        this.stopping       = false;
        this.currentModel   = null;
        this.deployModel    = null;
        this.models         = [];
        this.nodeName       = null;
        this.nodeInstance   = null;
        this.modulesPath    = modulesPath;
        this.bootstrapper   = null;
        this.intervalId     = null;
        this.uiCommand      = null;

        this.emitter = new EventEmitter();
    },

    /**
     * Starts Kevoree Core
     * @param nodeName
     */
    start: function (nodeName) {
        if (!nodeName || nodeName.length === 0) {
            nodeName = "node0";
        }

        if (nodeName.match(NAME_PATTERN)) {
            this.nodeName = nodeName;
            this.currentModel = this.factory.createContainerRoot();
            this.factory.root(this.currentModel);

            // create platform node
            var node = this.factory.createContainerNode();
            node.name = this.nodeName;
            node.started = false;

            // create node network interfaces
            var net = this.factory.createNetworkInfo();
            net.name = 'ip';
            var ifaces = os.networkInterfaces();
            for (var iface in ifaces) {
                if (ifaces.hasOwnProperty(iface)) {
                    var val = this.factory.createValue();
                    val.name = iface+'_'+ifaces[iface][0].family;
                    val.value = ifaces[iface][0].address;
                    net.addValues(val);
                }
            }
            // add net ifaces to node if any
            if (net.values.size() > 0) {
                node.addNetworkInformation(net);
            }

            // add platform node
            this.currentModel.addNodes(node);

            // starting loop function
            this.intervalId = setInterval(function () {}, 1e8);

            this.log.info(this.toString(), "Platform node name: "+nodeName);

            this.emitter.emit('started');
        } else {
            this.emitter.emit('error', new Error('Platform node name must match this regex '+NAME_PATTERN.toString()));
        }
    },

    /**
     * Compare current with model
     * Get traces and call command (that can be redefined)
     *
     * @param model ContainerRoot model
     * @emit error
     * @emit deploying
     * @emit deployed
     * @emit adaptationError
     * @emit rollbackError
     * @emit rollbackSucceed
     */
    deploy: function (model) {
        this.emitter.emit('deploying', model);
        if (model && !model.findNodesByID(this.nodeName)) {
            this.emitter.emit('error', new Error('Deploy model failure: unable to find '+this.nodeName+' in given model'));

        } else {
            this.log.debug(this.toString(), 'Deploy process started...');
            if (model) {
                // check if there is an instance currently running
                // if not, it will try to run it
                var core = this;
                this.checkBootstrapNode(model, function (err) {
                    if (err) {
                        core.emitter.emit('error', err);
                        return;
                    }

                    if (core.nodeInstance) {
                        try {
                            // given model is defined and not null
                            core.deployModel = core.cloner.clone(model, true);
                            core.deployModel.setRecursiveReadOnly();
                            var diffSeq = core.compare.diff(core.currentModel, core.deployModel);
                            var adaptations = core.nodeInstance.processTraces(diffSeq, core.deployModel);

                            // list of adaptation commands retrieved
                            var cmdStack = [];

                            // executeCommand: function that save cmd to stack and executes it
                            function executeCommand(cmd, iteratorCallback) {
                                // save the cmd to be processed in a stack using unshift
                                // in order to add the last processed cmd at the beginning of the array
                                // => cmdStack[0] = more recently executed cmd
                                cmdStack.unshift(cmd);

                                // execute cmd
                                cmd.execute(function (err) {
                                    if (err) {
                                        if (core.stopping) {
                                            // log error
                                            core.log.error(cmd.toString(), 'Fail adaptation skipped: '+err.message);
                                            // but continue adaptation because we are stopping runtime anyway
                                            err = null;
                                        }
                                    }
                                    iteratorCallback(err);
                                });
                            }

                            // rollbackCommand: function that calls undo() on cmds in the stack
                            function rollbackCommand(cmd, iteratorCallback) {
                                try {
                                    cmd.undo(iteratorCallback);
                                } catch (err) {
                                    iteratorCallback(err);
                                }
                            }

                            // execute each command synchronously
                            async.eachSeries(adaptations, executeCommand, function (err) {
                                if (err) {
                                    err.message = "Something went wrong while processing adaptations.\n"+err.message;
                                    core.log.error(core.toString(), err.stack);
                                    core.emitter.emit('adaptationError', err);
                                    core.log.info(core.toString(), 'Rollbacking to previous model...');

                                    // rollback process
                                    async.eachSeries(cmdStack, rollbackCommand, function (er) {
                                        if (er) {
                                            // something went wrong while rollbacking
                                            er.message = "Something went wrong while rollbacking. Process will exit.\n"+er.message;
                                            core.log.error(core.toString(), er.stack);
                                            // stop everything :/
                                            core.stop();
                                            core.emitter.emit('rollbackError', er);
                                        } else {
                                            // rollback succeed
                                            core.emitter.emit('rollbackSucceed');
                                        }
                                    });

                                } else {
                                    // save old model
                                    pushInArray(core.models, core.cloner.clone(model, false));
                                    // merge new model and current model
                                    core.compare.merge(core.currentModel, model).applyOn(core.currentModel);
                                    // reset deployModel
                                    core.deployModel = null;
                                    // adaptations succeed : woot
                                    core.log.debug(core.toString(), "Model deployed successfully: "+adaptations.length+" adaptations");
                                    // all good :)
                                    if (typeof (core.nodeInstance.onModelDeployed) === 'function') { // backward compatibility with kevoree-entities < 2.1.0
                                        core.nodeInstance.onModelDeployed();
                                    }
                                    core.emitter.emit('deployed', core.currentModel);
                                }
                            });
                        } catch (err) {
                            core.emitter.emit('deployError', err);
                        }

                    } else {
                        core.emitter.emit('error', new Error("There is no instance to bootstrap on"));
                    }
                });
            } else {
                this.emitter.emit('error', new Error("Model is not defined or null. Deploy aborted."));
            }
        }
    },

    /**
     * Stops Kevoree Core
     */
    stop: function () {
        var stopRuntime = function () {
            // prevent event emitter leaks by unregister them
            this.off('deployed', deployHandler);
            this.off('adaptationError', stopRuntime);
            this.off('error', stopRuntime);

            clearInterval(this.intervalId);
            if (this.nodeInstance === null) {
                this.log.info(this.toString(), 'Platform stopped before bootstrapped');
            } else {
                this.log.info(this.toString(), "Platform stopped: "+this.nodeInstance.getName());
            }

            this.currentModel   = null;
            this.deployModel    = null;
            this.models         = [];
            this.nodeName       = null;
            this.nodeInstance   = null;
            this.intervalId     = null;

            this.emitter.emit('stopped');
        }.bind(this);

        var deployHandler = function () {
            // prevent event emitter leaks by unregister them
            this.off('adaptationError', stopRuntime);
            this.off('error', stopRuntime);

            // stop node
            this.nodeInstance.stop(function (err) {
                if (err) {
                    this.emitter.emit('error', new Error(err.message));
                }

                stopRuntime();
            }.bind(this));
        }.bind(this);

        if (typeof (this.intervalId) !== 'undefined' && this.intervalId !== null && this.nodeInstance !== null) {
            var stopModel = this.cloner.clone(this.currentModel, false);
            var node = stopModel.findNodesByID(this.nodeInstance.getName());
            var subNodes = node.hosts.iterator();
            while (subNodes.hasNext()) {
                subNodes.next().delete();
                //subNodes.next().started = false;
            }

            var groups = node.groups.iterator();
            while (groups.hasNext()) {
                groups.next().delete();
//                groups.next().started = false;
            }

            var bindings = stopModel.mBindings.iterator();
            while (bindings.hasNext()) {
                var binding = bindings.next();
                if (binding.port.eContainer()
                    && binding.port.eContainer().eContainer()
                    && binding.port.eContainer().eContainer().name === node.name) {
                    if (binding.hub) {
                        binding.hub.delete();
//                        binding.hub.started = false;
                    }
                }
            }

            var comps = node.components.iterator();
            while (comps.hasNext()) {
                comps.next().delete();
//                comps.next().started = false;
            }

            this.once('deployed', deployHandler);
            this.once('adaptationError', stopRuntime);
            this.once('error', stopRuntime);

            this.stopping = true;
            this.deploy(stopModel);
        }
    },

    checkBootstrapNode: function (model, callback) {
        callback = callback || function () { console.warn('No callback defined for checkBootstrapNode(model, cb) in KevoreeCore'); };

        if (typeof (this.nodeInstance) === 'undefined' || this.nodeInstance === null) {
            this.log.debug(this.toString(), "Start '"+this.nodeName+"' bootstrapping...");
            this.bootstrapper.bootstrapNodeType(this.nodeName, model, function (err, AbstractNode) {
                if (err) {
                    err.message = "Unable to bootstrap '"+this.nodeName+"'! Start process aborted.";
                    callback(err);
                    return;
                }

                var node = model.findNodesByID(this.nodeName);

                this.nodeInstance = new AbstractNode();
                this.nodeInstance.setKevoreeCore(this);
                this.nodeInstance.setName(this.nodeName);
                this.nodeInstance.setPath(node.path());

                this.nodeInstance.start(function (err) {
                    if (err) {
                        callback(err);
                    } else {
                        this.log.info(this.toString(), this.nodeName+' : '+node.typeDefinition.name+'/'+node.typeDefinition.version+' successfully started');
                        callback();
                    }
                }.bind(this));
            }.bind(this));

        } else {
            callback();
        }
    },

    setBootstrapper: function (bootstrapper) {
        this.bootstrapper = bootstrapper;
    },

    setUICommand: function (uiCmd) {
        this.uiCommand = uiCmd;
    },

    getBootstrapper: function () {
        return this.bootstrapper;
    },

    /**
     * Save model to hdd
     */
    saveModel: function () {
        // TODO
        this.log.warn(this.toString(), 'saveModel(): not implemented yet');
    },

    /**
     * Put core in readonly mode
     */
    lock: function() {
        // TODO
        this.log.warn(this.toString(), 'lock(): not implemented yet');
    },

    /**
     * Put core in read/write mode
     */
    unlock: function() {
        // TODO
        this.log.warn(this.toString(), 'unlock(): not implemented yet');
    },

    getCurrentModel: function () {
        return this.currentModel;
    },

    getPreviousModel: function () {
        var model = null;
        if (this.models.length > 0) model = this.models[this.models.length-1];
        return model;
    },

    getPreviousModels: function () {
        return this.models;
    },

    getModulesPath: function () {
        return this.modulesPath;
    },

    getDeployModel: function () {
        return this.deployModel;
    },

    getNodeName: function () {
        return this.nodeName;
    },

    getUICommand: function () {
        return this.uiCommand;
    },

    getLogger: function () {
        return this.log;
    },

    on: function (event, callback) {
        this.emitter.addListener(event, callback);
    },

    off: function (event, callback) {
        this.emitter.removeListener(event, callback);
    },

    once: function (event, callback) {
        this.emitter.once(event, callback);
    }
});

// utility function to ensure cached model list won't go over 10 models
var pushInArray = function pushInArray(array, model) {
    if (array.length === 10) {
        array.shift();
    }
    array.push(model);
};

// Exports
module.exports = Core;