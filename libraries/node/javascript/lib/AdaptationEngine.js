const kevoree = require('kevoree-library');
const ModelObjectMapper = require('./ModelObjectMapper');

// Adaptation Primitives
const AddInstance = require('./adaptations/AddInstance');
const AddBinding = require('./adaptations/AddBinding');
const AddDeployUnit = require('./adaptations/AddDeployUnit');
const RemoveBinding = require('./adaptations/RemoveBinding');
const RemoveInstance = require('./adaptations/RemoveInstance');
const StartInstance = require('./adaptations/StartInstance');
const StopInstance = require('./adaptations/StopInstance');
const UpdateInstance = require('./adaptations/UpdateInstance');
const UpdateDictionary = require('./adaptations/UpdateDictionary');
const HaraKiri = require('./adaptations/HaraKiri');


// CONSTANTS
const COMMAND_RANK = {
  // highest priority
  StopInstance: 0,
  RemoveBinding: 1,
  RemoveInstance: 2,
  RemoveTypeDef: 3,
  RemoveDeployUnit: 4,
  AddDeployUnit: 5,
  AddTypeDef: 6,
  AddInstance: 7,
  AddBinding: 8,
  UpdateDictionary: 9,
  UpdateInstance: 10,
  StartInstance: 11,
  HaraKiri: 12
  // lowest priority
};

function isInstance(c) {
  return c.metaClassName() === 'org.kevoree.ContainerNode' ||
    c.metaClassName() === 'org.kevoree.Group' ||
    c.metaClassName() === 'org.kevoree.Channel' ||
    c.metaClassName() === 'org.kevoree.ComponentInstance';
}

function isTypeDefinition(c) {
  return c.metaClassName() === 'org.kevoree.PortType' ||
    c.metaClassName() === 'org.kevoree.GroupType' ||
    c.metaClassName() === 'org.kevoree.ChannelType' ||
    c.metaClassName() === 'org.kevoree.NodeType' ||
    c.metaClassName() === 'org.kevoree.ComponentType';
}

/**
 * AdaptationEngine knows each AdaptationPrimitive command available
 * for JavascriptNode.
 * Plus, it handles model - object mapping
 *
 * @type {AdaptationEngine}
 */
function AdaptationEngine(node) {
  this.node = node;
  this.modelObjMapper = new ModelObjectMapper();
  const factory = new kevoree.factory.DefaultKevoreeFactory();
  this.compare = factory.createModelCompare();
  this.alreadyProcessedTraces = {};
  this.targetModel = null;
}

AdaptationEngine.prototype = {

  /**
   * Process traces to find the right adaptation primitive command
   * Returns a command to execute in order to do the adaptation logic
   * @param diffSeq
   * @param targetModel
   * @returns {Array}
   */
  processTraces(diffSeq, targetModel) {
    const self = this;
    this.targetModel = targetModel;

    // know if a trace has already been added to cmdList for {path <-> AdaptationPrimitive}
    const traceAlreadyProcessed = (cmd) => {
      return self.alreadyProcessedTraces[cmd.modelElement.path()] && self.alreadyProcessedTraces[cmd.modelElement.path()][cmd.toString()];
    };

    // add a trace to the processed trace map
    const addProcessedTrace = (cmd) => {
      self.alreadyProcessedTraces[cmd.modelElement.path()] = self.alreadyProcessedTraces[cmd.modelElement.path()] || {};
      self.alreadyProcessedTraces[cmd.modelElement.path()][cmd.toString()] = cmd;
    };

    // fill adaptation primitives list
    const cmdList = [];
    diffSeq.traces.array.forEach((trace) => {
      self.processTrace(trace).forEach((cmd) => {
        if (!traceAlreadyProcessed(cmd)) {
          cmdList.push(cmd);
          addProcessedTrace(cmd);
        }
      });
    });

    // clean primitives:
    //  - don't call UpdateInstance when (Start|Stop)Instance will be executed
    for (const path in this.alreadyProcessedTraces) {
      if (this.alreadyProcessedTraces[path][UpdateInstance.prototype.toString()]) {
        for (const type in this.alreadyProcessedTraces[path]) {
          if (type === StopInstance.prototype.toString() || type === StartInstance.prototype.toString()) {
            const index = cmdList.indexOf(this.alreadyProcessedTraces[path][UpdateInstance.prototype.toString()]);
            if (index > -1) {
              cmdList.splice(index, 1);
            }
          }
        }
      }
    }

    // free-up some mem
    this.targetModel = null;
    this.alreadyProcessedTraces = {};

    //return sorted command list (sort by COMMAND_RANK in order to process adaptations properly)
    // this.sortCommands(cmdList).forEach((cmd) => {
    //   var tag = cmd.toString();
    //   while (tag.length < 20) {
    //     tag += ' ';
    //   }
    //   console.log(tag, cmd.modelElement.path());
    // });
    return this.sortCommands(cmdList);
  },

  /**
   * Creates an array of AdaptationPrimitive according to the trace
   * @param trace
   */
  processTrace(trace) {
    let cmds = [];
    const modelElement = this.targetModel.findByPath(trace.previousPath || trace.srcPath);
    let currentModel, instance, du, meta, currentModelElement, targetModelElement;

    if (modelElement) {
      if (!this.isVirtual(modelElement)) {
        switch (trace.refName) {
          default:
            break;

          case 'groups':
          case 'hosts':
          case 'components':
            switch (trace.traceType.name()) {
              default:
                break;
              case 'ADD':
                if (this.isRelatedToPlatform(modelElement)) {
                  meta = modelElement.typeDefinition.select('deployUnits[]/filters[name=platform,value=js]');
                  if (meta.size() > 0) {
                    du = meta.get(0).eContainer();
                    if (!this.modelObjMapper.getObject(du.path())) {
                      cmds.push(this.createCommand(AddDeployUnit, du));
                    }
                  } else {
                    throw new Error('no DeployUnit found for \'' + modelElement.name + ': ' + modelElement.typeDefinition.name + '/' + modelElement.typeDefinition.version + '\' that matches the \'js\' platform');
                  }

                  if (!this.modelObjMapper.getObject(modelElement.path())) {
                    cmds.push(this.createCommand(AddInstance, modelElement));
                  }
                }
                break;

              case 'REMOVE':
                {
                  currentModel = this.node.getKevoreeCore().getCurrentModel(); // old model
                  const instFromCurrModel = currentModel.findByPath(trace.objPath); // instance from current model
                  const instFromTargModel = this.targetModel.findByPath(trace.objPath); // instance in target model
                  if ((instFromTargModel && !this.isRelatedToPlatform(instFromTargModel)) || !instFromTargModel) {
                    // instance is no longer related to platform or present in new model: stop & remove
                    if (this.modelObjMapper.getObject(instFromCurrModel.path())) {
                      if (instFromCurrModel.started) {
                        cmds.push(this.createCommand(StopInstance, instFromCurrModel));
                      }
                      if (this.modelObjMapper.getObject(trace.objPath)) {
                        cmds.push(this.createCommand(RemoveInstance, instFromCurrModel));
                      }
                    }
                  }
                }
                break;
            }
            break;

          case 'bindings':
            switch (trace.traceType.name()) {
              default:
                break;
              case 'ADD':
                if (this.isRelatedToPlatform(modelElement)) {
                  if (!this.isVirtual(modelElement)) {
                    cmds.push(this.createCommand(AddBinding, modelElement));
                    cmds.push(this.createCommand(UpdateInstance, modelElement.hub));

                    if (modelElement.hub && this.isRelatedToPlatform(modelElement.hub)) {
                      if (!this.modelObjMapper.getObject(modelElement.hub.path())) {
                        meta = modelElement.hub.typeDefinition.select('deployUnits[]/filters[name=platform,value=js]');
                        if (meta.size() > 0) {
                          du = meta.get(0).eContainer();
                          if (!this.modelObjMapper.getObject(du.path())) {
                            cmds.push(this.createCommand(AddDeployUnit, du));
                          }
                        } else {
                          const e = new Error('no DeployUnit found for \'' + modelElement.hub.name + ': ' + modelElement.hub.typeDefinition.name + '/' + modelElement.hub.typeDefinition.version + '\' that matches the \'js\' platform');
                          e.className = this.toString();
                          throw e;
                        }

                        if (modelElement.hub.dictionary) {
                          cmds = cmds.concat(this.createUpdateDictionaryCommands(modelElement.hub.dictionary));
                        }

                        const fragDics = modelElement.hub.fragmentDictionary.iterator();
                        while (fragDics.hasNext()) {
                          const fragDic = fragDics.next();
                          if (fragDic.name === this.node.getName()) {
                            cmds = cmds.concat(this.createUpdateDictionaryCommands(fragDic));
                          }
                        }

                        cmds.push(this.createCommand(AddInstance, modelElement.hub));
                        if (modelElement.hub.started) {
                          cmds.push(this.createCommand(StartInstance, modelElement.hub));
                        }

                        const self = this;
                        modelElement.hub.bindings.array.forEach((binding) => {
                          cmds.push(self.createCommand(AddBinding, binding));
                        });
                      }
                    }
                  }
                }
                break;

              case 'REMOVE':
                {
                  currentModel = this.node.getKevoreeCore().getCurrentModel(); // old model
                  const binding = currentModel.findByPath(trace.objPath); // binding before removal trace
                  if (binding) {
                    const newChan = this.targetModel.findByPath(binding.hub.path());
                    let chanStillUsed = false;
                    if (newChan) {
                      const bindings = newChan.bindings.iterator();
                      while (bindings.hasNext()) {
                        if (this.isRelatedToPlatform(bindings.next())) {
                          // there is still a binding between this chan and this platform => cant remove
                          chanStillUsed = true;
                          break;
                        }
                      }
                    }

                    if (!chanStillUsed && this.modelObjMapper.getObject(binding.hub.path())) {
                      if (this.modelObjMapper.getObject(binding.hub.path())) {
                        cmds.push(this.createCommand(RemoveInstance, binding.hub));
                      }

                      if (binding.hub.started) {
                        cmds.push(this.createCommand(StopInstance, binding.hub));
                      }
                    }
                  }

                  if (this.isRelatedToPlatform(binding)) {
                    cmds.push(this.createCommand(RemoveBinding, binding));
                    cmds.push(this.createCommand(UpdateInstance, binding.hub));
                  }
                }
                break;
            }
            break;

          case 'started':
            if (trace.traceType.name() === 'SET' && isInstance(modelElement)) {
              if (this.isRelatedToPlatform(modelElement)) {
                if (modelElement.metaClassName() === 'org.kevoree.ContainerNode' && modelElement.name === this.node.getName()) {
                  if (trace.content === 'true') {
                    // start this node platform
                    cmds.push(this.createCommand(StartInstance, modelElement));
                  } else {
                    // stop this node platform
                    cmds.push(this.createCommand(HaraKiri, modelElement));
                  }
                } else {
                  if (trace.content === 'true') {
                    cmds.push(this.createCommand(StartInstance, modelElement));
                    if (!modelElement.host) {
                      if (modelElement.dictionary) {
                        const updateDicCmds = this.createUpdateDictionaryCommands(modelElement.dictionary);
                        if (updateDicCmds.length > 0) {
                          cmds = cmds.concat(updateDicCmds);
                          cmds.push(this.createCommand(UpdateInstance, modelElement));
                        }
                      }

                      const elemFragDics = modelElement.fragmentDictionary.iterator();
                      while (elemFragDics.hasNext()) {
                        const fDic = elemFragDics.next();
                        if (fDic.name === this.node.getName()) {
                          const updateFDicCmds = this.createUpdateDictionaryCommands(fDic);
                          if (updateFDicCmds.length > 0) {
                            cmds = cmds.concat(updateFDicCmds);
                            cmds.push(this.createCommand(UpdateInstance, modelElement));
                          }
                        }
                      }
                    }
                  } else {
                    if (modelElement.host && modelElement.host.name === this.node.getName()) {
                      // modelElement is an hosted node (so it does not have an instance in this platform)
                      cmds.push(this.createCommand(StopInstance, modelElement));

                    } else {
                      instance = this.modelObjMapper.getObject(modelElement.path());
                      if (instance && instance.isStarted()) {
                        cmds.push(this.createCommand(StopInstance, modelElement));
                      }
                    }
                  }
                }
              }
            }
            break;

          case 'value':
            if (trace.traceType.name() === 'SET' &&
              modelElement.metaClassName() === 'org.kevoree.Value' &&
              modelElement.eContainer().metaClassName() === 'org.kevoree.Dictionary') {
              if (this.isRelatedToPlatform(modelElement)) {
                instance = modelElement.eContainer().eContainer();
                if (instance.started && !instance.host) {
                  const updateDicAttrs = this.createUpdateDictionaryCommands(modelElement.eContainer());
                  if (updateDicAttrs.length > 0) {
                    cmds = cmds.concat(updateDicAttrs);
                    cmds.push(this.createCommand(UpdateInstance, modelElement.eContainer().eContainer()));
                  }
                }
              }
            }
            break;

          case 'typeDefinition':
            switch (trace.traceType.name()) {
              default:
                break;
              case 'ADD':
                currentModel = this.node.getKevoreeCore().getCurrentModel();
                currentModelElement = currentModel.findByPath(trace.srcPath);
                if (currentModelElement) {
                  targetModelElement = this.targetModel.findByPath(trace.srcPath);
                  if (this.isRelatedToPlatform(currentModelElement)) {
                    if (currentModelElement.path() === this.node.getPath()) {
                      // this adaptation means: to change this node platform TypeDefinition
                      // TODO this should be checked and handled in the core.. not here
                    } else {
                      meta = modelElement.select('deployUnits[]/filters[name=platform,value=js]');
                      if (meta.size() > 0) {
                        du = meta.get(0).eContainer();
                        if (!this.modelObjMapper.getObject(du.path())) {
                          cmds.push(this.createCommand(AddDeployUnit, du));
                        }

                        instance = this.modelObjMapper.getObject(currentModelElement.path());
                        if (instance) {
                          // instance found in the node map
                          if (instance.started) {
                            // stop instance
                            cmds.push(this.createCommand(StopInstance, currentModelElement));
                          }

                          if (currentModelElement.metaClassName() === 'org.kevoree.Channel') {
                            // remove old bindings
                            currentModelElement.bindings.array.forEach((b) => {
                              cmds.push(this.createCommand(RemoveBinding, b));
                            });
                            // add new bindings
                            targetModelElement.bindings.array.forEach((b) => {
                              cmds.push(this.createCommand(AddBinding, b));
                            });

                          } else if (currentModelElement.metaClassName() === 'org.kevoree.ComponentInstance') {
                            // remove old input port bindings
                            currentModelElement.provided.array.forEach((input) => {
                              input.bindings.array.forEach((b) => {
                                cmds.push(this.createCommand(RemoveBinding, b));
                              });
                            });
                            // remove old outout port bindings
                            currentModelElement.required.array.forEach((output) => {
                              output.bindings.array.forEach((b) => {
                                cmds.push(this.createCommand(RemoveBinding, b));
                              });
                            });

                            // add new input port bindings
                            targetModelElement.provided.array.forEach((input) => {
                              input.bindings.array.forEach((b) => {
                                cmds.push(this.createCommand(AddBinding, b));
                              });
                            });
                            // add new outout port bindings
                            targetModelElement.required.array.forEach((output) => {
                              output.bindings.array.forEach((b) => {
                                cmds.push(this.createCommand(AddBinding, b));
                              });
                            });
                          }

                          // TODO upgradeInstance ?

                          //reinject dictionary
                          this.createUpdateDictionaryCommands(targetModelElement.dictionary);

                          //restart
                          cmds.push(this.createCommand(StartInstance, targetModelElement));
                        } else {
                          // TODO hmm => what to do then ?
                        }
                      } else {
                        const error = new Error('no DeployUnit found for \'' + modelElement.name + ': ' + modelElement.typeDefinition.name + '/' + modelElement.typeDefinition.version + '\' that matches the \'js\' platform');
                        error.className = this.toString();
                        throw error;
                      }
                    }
                  }
                }
                break;
            }

            break;
        }
      }
    }

    return cmds;
  },

  /**
   * know if an modelElement is related to the current plarform node
   * @param element
   * @returns {boolean}
   */
  isRelatedToPlatform(element) {
    if (element) {
      if (element.metaClassName() === 'org.kevoree.ComponentInstance') {
        // if parent is this node platform: it's ok
        return (element.eContainer().name === this.node.getName());

      } else if (element.metaClassName() === 'org.kevoree.Channel') {
        // if this channel has bindings with components hosted in this node platform: it's ok
        const bindings = element.bindings.iterator();
        while (bindings.hasNext()) {
          const binding = bindings.next();
          if (binding.port && binding.port.eContainer()) {
            if (this.isRelatedToPlatform(binding.port.eContainer())) {
              return true;
            }
          }
        }

      } else if (element.metaClassName() === 'org.kevoree.Group') {
        return element.subNodes.array.some((node) => {
          return this.isRelatedToPlatform(node);
        });

      } else if (element.metaClassName() === 'org.kevoree.ContainerNode') {
        return ((element.name === this.node.getName()) || (element.host && element.host.name === this.node.getName()));

      } else if (element.metaClassName() === 'org.kevoree.MBinding') {
        if (element.port && element.port.eContainer()) {
          if (this.isRelatedToPlatform(element.port.eContainer())) {
            return true;
          }
        }
        if (element.hub) {
          return this.isRelatedToPlatform(element.hub);
        }

      } else if (element.metaClassName() === 'org.kevoree.Value') {
        if (element.eContainer().metaClassName() === 'org.kevoree.FragmentDictionary') {
          return (element.eContainer().name === this.node.getName());
        } else {
          return this.isRelatedToPlatform(element.eContainer().eContainer());
        }

      } else if (element.metaClassName() === 'org.kevoree.Port') {
        return this.isRelatedToPlatform(element.eContainer());
      }
    }
    return false;
  },

  /**
   *
   * @param Cmd
   * @param element
   * @returns {Object}
   */
  createCommand(Cmd, element) {
    return new Cmd(this.node, this.modelObjMapper, this.targetModel, element);
  },

  /**
   *
   * @param kDic
   * @returns {Array}
   */
  createUpdateDictionaryCommands(kDic) {
    const cmds = [];
    let dictionary = null;

    let entityInstance;
    if (kDic.eContainer().path() === this.node.getPath()) {
      entityInstance = this.node;
    } else {
      entityInstance = this.modelObjMapper.getObject(kDic.eContainer().path());
    }
    if (entityInstance) {
      dictionary = entityInstance.getDictionary();
    }
    const values = kDic.values.iterator();
    while (values.hasNext()) {
      const val = values.next();
      if (dictionary) {
        const oldVal = dictionary.getValue(val.name);
        if (oldVal !== val.value) {
          cmds.push(this.createCommand(UpdateDictionary, val));
        }
      } else {
        cmds.push(this.createCommand(UpdateDictionary, val));
      }
    }

    return cmds;
  },

  /**
   * @param elem Instance | TypeDefinition | MBinding
   * @returns true if the given element has a virtual TypeDefinition
   */
  isVirtual(elem) {
    if (isInstance(elem)) {
      return this.isVirtual(elem.typeDefinition);
    } else if (isTypeDefinition(elem)) {
      const virtual = elem.findMetaDataByID('virtual');
      return virtual !== null;
    } else if (elem.metaClassName() === 'org.kevoree.MBinding') {
      if (elem.hub) {
        if (this.isVirtual(elem.hub.typeDefinition)) {
          return true;
        }
      }
      if (elem.port) {
        return this.isVirtual(elem.port.eContainer());
      }

    }
    return false;
  },

  /**
   * Sorts primitives array according to COMMAND_RANK
   * @param list
   * @returns {*}
   */
  sortCommands(list) {
    list.sort((a, b) => {
      if (COMMAND_RANK[a.toString()] > COMMAND_RANK[b.toString()]) {
        return 1;
      } else if (COMMAND_RANK[a.toString()] < COMMAND_RANK[b.toString()]) {
        return -1;
      } else {
        return 0;
      }
    });

    return list;
  },

  setLogger(logger) {
    this.log = logger;
  }
};

module.exports = AdaptationEngine;
