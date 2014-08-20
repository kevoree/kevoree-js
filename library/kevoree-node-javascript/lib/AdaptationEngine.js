var Class               = require('pseudoclass'),
    kevoree             = require('kevoree-library').org.kevoree,
    Kotlin              = require('kevoree-kotlin'),
    ModelObjectMapper   = require('./ModelObjectMapper'),
    KevoreeLogger       = require('kevoree-commons').KevoreeLogger;

// Adaptation Primitives
var AddInstance         = require('./adaptations/AddInstance'),
    AddBinding          = require('./adaptations/AddBinding'),
    AddDeployUnit       = require('./adaptations/AddDeployUnit'),
    RemoveBinding       = require('./adaptations/RemoveBinding'),
    RemoveDeployUnit    = require('./adaptations/RemoveDeployUnit'),
    RemoveInstance      = require('./adaptations/RemoveInstance'),
    StartInstance       = require('./adaptations/StartInstance'),
    StopInstance        = require('./adaptations/StopInstance'),
    UpdateInstance      = require('./adaptations/UpdateInstance'),
    UpdateDictionary    = require('./adaptations/UpdateDictionary'),
    DestroyInstance     = require('./adaptations/DestroyInstance');


// CONSTANTS
var COMMAND_RANK = {
    // highest priority
    StopInstance:     0,
    DestroyInstance:  1,
    RemoveBinding:    2,
    RemoveInstance:   3,
    RemoveTypeDef:    4,
    RemoveDeployUnit: 5,
    AddDeployUnit:    6,
    AddTypeDef:       7,
    AddInstance:      9,
    AddBinding:       10,
    UpdateDictionary: 11,
    UpdateInstance:   12,
    StartInstance:    13
    // lowest priority
};

/**
 * AdaptationEngine knows each AdaptationPrimitive command available
 * for JavascriptNode.
 * Plus, it handles model - object mapping
 *
 * @type {AdaptationEngine}
 */
var AdaptationEngine = Class({
    toString: 'AdaptationEngine',

    construct: function (node) {
        this.log = new KevoreeLogger(this.toString());

        this.node = node;
        this.modelObjMapper = new ModelObjectMapper();
        var factory = new kevoree.factory.DefaultKevoreeFactory();
        this.compare = factory.createModelCompare();
        this.alreadyProcessedTraces = {};
        this.targetModel = null;
    },

    /**
     * Process traces to find the right adaptation primitive command
     * Returns a command to execute in order to do the adaptation logic
     * @param diffSeq
     * @param targetModel
     * @returns {Array}
     */
    processTraces: function (diffSeq, targetModel) {
        this.targetModel = targetModel;
        var cmdList = [];
        // reset traces map
        this.alreadyProcessedTraces = {};

        // know if a trace has already been added to cmdList for {path <-> AdaptationPrimitive}
        var traceAlreadyProcessed = function (cmd) {
            return this.alreadyProcessedTraces[cmd.modelElement.path()] && this.alreadyProcessedTraces[cmd.modelElement.path()][cmd.toString()];
        }.bind(this);

        // add a trace to the processed trace map
        var addProcessedTrace = function (cmd) {
            this.alreadyProcessedTraces[cmd.modelElement.path()] = this.alreadyProcessedTraces[cmd.modelElement.path()] || {};
            this.alreadyProcessedTraces[cmd.modelElement.path()][cmd.toString()] = cmd;
        }.bind(this);

        // fill adaptation primitives list
        var traces = diffSeq.traces.iterator();
        var cmds;
        while (traces.hasNext()) {
            var trace = traces.next();
            cmds = this.processTrace(trace, targetModel.findByPath(trace.previousPath || trace.srcPath));
            for (var i=0; i < cmds.length; i++) {
                if (!traceAlreadyProcessed(cmds[i])) {
                    cmdList.push(cmds[i]);
                    addProcessedTrace(cmds[i]);
                }
            }
        }

        // clean primitives:
        //  - don't call UpdateInstance when StopInstance will be executed
        for (var path in this.alreadyProcessedTraces) {
            if (this.alreadyProcessedTraces[path][UpdateInstance.prototype.toString()]) {
                for (var type in this.alreadyProcessedTraces[path]) {
                    if (type === StopInstance.prototype.toString() || type === StartInstance.prototype.toString()) {
                        var index = cmdList.indexOf(this.alreadyProcessedTraces[path][UpdateInstance.prototype.toString()]);
                        if (index > -1) {
                            cmdList.splice(index, 1);
                        }
                    }
                }
            }
        }

        // return sorted command list (sort by COMMAND_RANK in order to process adaptations properly)
//        cmds = this.sortCommands(cmdList);
//        for (var j=0; j < cmds.length; j++) {
//            console.log('CMD >>><<< ', cmds[j].toString(), cmds[j].modelElement.path());
//        }
        return this.sortCommands(cmdList);
    },

    /**
     * Creates an array of AdaptationPrimitive according to the trace
     * @param trace
     * @param modelElement
     */
    processTrace: function (trace, modelElement) {
        var cmds = [], currentModel, instance;

        switch (trace.refName) {
            case 'groups':
            case 'hosts':
            case 'components':
                switch (trace.traceType.name()) {
                    case 'ADD':
                        if (this.isRelatedToPlatform(modelElement)) {
                            if (!this.modelObjMapper.getObject(modelElement.typeDefinition.deployUnit.path())) {
                                cmds.push(this.createCommand(AddDeployUnit, modelElement.typeDefinition.deployUnit));
                            }

                            if (!this.modelObjMapper.getObject(modelElement.path())) {
                                cmds.push(this.createCommand(AddInstance, modelElement));
                            }
                        }
                        break;

                    case 'REMOVE':
                        currentModel = this.node.getKevoreeCore().getCurrentModel(); // old model
                        var instFromCurrModel = currentModel.findByPath(trace.objPath); // instance from current model
                        var instFromTargModel = this.targetModel.findByPath(trace.objPath); // instance in target model
                        if ((instFromTargModel && !this.isRelatedToPlatform(instFromTargModel)) || !instFromTargModel) {
                            // instance is no longer related to platform or present in new model: stop & remove
                            if (this.modelObjMapper.getObject(instFromCurrModel.path())) {
                                if (instFromCurrModel.started) {
                                    cmds.push(this.createCommand(StopInstance, instFromCurrModel));
                                }
                                if (this.modelObjMapper.getObject(trace.objPath)) {
                                    cmds.push(this.createCommand(RemoveInstance, instFromCurrModel));
                                    cmds.push(this.createCommand(DestroyInstance, instFromCurrModel));
                                }
                            }
                        }

                        break;
                }
                break;

            case 'deployUnits':
                switch (trace.traceType.name()) {
                    case 'ADD':
                        if (this.isRelatedToPlatform(modelElement)) {
                            cmds.push(this.createCommand(AddDeployUnit, modelElement));
                        }
                        break;

                    case 'REMOVE':
                        currentModel = this.node.getKevoreeCore().getCurrentModel();
                        var du = currentModel.findByPath(trace.objPath);
                        if (du) {
                            cmds.push(this.createCommand(RemoveDeployUnit, du));
                        }
                        break;
                }
                break;

            case 'bindings':
                switch (trace.traceType.name()) {
                    case 'ADD':
                        if (this.isRelatedToPlatform(modelElement)) {
                            cmds.push(this.createCommand(AddBinding, modelElement));

                            if (modelElement.hub && this.isRelatedToPlatform(modelElement.hub)) {
                                if (!this.modelObjMapper.getObject(modelElement.hub.path())) {
                                    if (!this.modelObjMapper.getObject(modelElement.hub.typeDefinition.deployUnit.path())) {
                                        cmds.push(this.createCommand(AddDeployUnit, modelElement.hub.typeDefinition.deployUnit));
                                    }

                                    if (modelElement.hub.dictionary) {
                                        var dicVals = modelElement.hub.dictionary.values.iterator();
                                        while (dicVals.hasNext()) {
                                            var val = dicVals.next();
                                            cmds.push(this.createCommand(UpdateDictionary, val));
                                        }
                                    }

                                    var fragDics = modelElement.hub.fragmentDictionary.iterator();
                                    while (fragDics.hasNext()) {
                                        var fragDic = fragDics.next();
                                        var fragDicVals = fragDic.values.iterator();
                                        while (fragDicVals.hasNext()) {
                                            var fragDicVal = fragDicVals.next();
                                            cmds.push(this.createCommand(UpdateDictionary, fragDicVal));
                                        }
                                    }

                                    cmds.push(this.createCommand(AddInstance, modelElement.hub));
                                    if (modelElement.hub.started) {
                                        cmds.push(this.createCommand(StartInstance, modelElement.hub));
                                    }
                                }
                            }
                        }
                        break;

                    case 'REMOVE':
                        currentModel = this.node.getKevoreeCore().getCurrentModel(); // old model
                        var binding = currentModel.findByPath(trace.objPath); // binding before removal trace
                        if (binding) {
                            var newChan = this.targetModel.findByPath(binding.hub.path());
                            var chanStillUsed = false;
                            if (newChan) {
                                var bindings = newChan.bindings.iterator();
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
                                    cmds.push(this.createCommand(DestroyInstance, binding.hub));
                                }

                                if (binding.hub.started) {
                                    cmds.push(this.createCommand(StopInstance, binding.hub));
                                }
                            }
                        }

                        if (this.isRelatedToPlatform(binding)) {
                            cmds.push(this.createCommand(RemoveBinding, binding));
                        }
                        break;
                }
                break;

            case 'started':
                if (trace.traceType.name() === 'SET' && Kotlin.isType(modelElement, kevoree.Instance)) {
                    if (this.isRelatedToPlatform(modelElement)) {
                        if (Kotlin.isType(modelElement, kevoree.ContainerNode) && modelElement.name === this.node.getName()) {
                            // do not start/stop this platform: this is the core's job
                        } else {
                            if (trace.content === 'true') {
                                cmds.push(this.createCommand(StartInstance, modelElement));
                                if (!modelElement.host) {
                                    if (modelElement.dictionary) {
                                        if (modelElement.dictionary.values.size() > 0) {
                                            cmds.push(this.createCommand(UpdateInstance, modelElement));
                                        }

                                        var values = modelElement.dictionary.values.iterator();
                                        while (values.hasNext()) {
                                            cmds.push(this.createCommand(UpdateDictionary, values.next()));
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
                if (trace.traceType.name() === 'SET' && Kotlin.isType(modelElement, kevoree.DictionaryValue)) {
                    if (this.isRelatedToPlatform(modelElement)) {
                        instance = modelElement.eContainer().eContainer();
                        if (instance.started && !instance.host) {
                            cmds.push(this.createCommand(UpdateDictionary, modelElement));
                            cmds.push(this.createCommand(UpdateInstance, modelElement.eContainer().eContainer()));
                        }
                    }
                }
                break;
        }

        return cmds;
    },

    /**
     * know if an modelElement is related to the current plarform node
     * @param element
     * @returns {boolean}
     */
    isRelatedToPlatform: function (element) {
        if (Kotlin.isType(element, kevoree.ComponentInstance)) {
            // if parent is this node platform: it's ok
            return (element.eContainer().name === this.node.getName());

        } else if (Kotlin.isType(element, kevoree.Channel)) {
            // if this channel has bindings with components hosted in this node platform: it's ok
            var bindings = element.bindings.iterator();
            while (bindings.hasNext()) {
                var binding = bindings.next();
                if (binding.port && binding.port.eContainer()) {
                    if (this.isRelatedToPlatform(binding.port.eContainer())) {
                        return true;
                    }
                }
            }

        } else if (Kotlin.isType(element, kevoree.Group)) {
            var subNodes = element.subNodes.iterator();
            while (subNodes.hasNext()) {
                if (this.isRelatedToPlatform(subNodes.next())) {
                    return true;
                }
            }

        } else if (Kotlin.isType(element, kevoree.ContainerNode)) {
            return ((element.name === this.node.getName()) || (element.host && element.host.name === this.node.getName()));

        } else if (Kotlin.isType(element, kevoree.MBinding)) {
            if (element.port && element.port.eContainer()) {
                return this.isRelatedToPlatform(element.port.eContainer());
            }

        } else if (Kotlin.isType(element, kevoree.DictionaryValue)) {
            return this.isRelatedToPlatform(element.eContainer().eContainer());

        } else if (Kotlin.isType(element, kevoree.Port)) {
            return this.isRelatedToPlatform(element.eContainer());
        }

        return false;
    },

    createCommand: function (Cmd, element) {
        return new Cmd(this.node, this.modelObjMapper, this.targetModel, element);
    },

    /**
     * Sorts primitives array according to COMMAND_RANK
     * @param list
     * @returns {*}
     */
    sortCommands: function (list) {
        list.sort(function (a, b) {
            if (COMMAND_RANK[a.toString()] > COMMAND_RANK[b.toString()]) return 1;
            else if (COMMAND_RANK[a.toString()] < COMMAND_RANK[b.toString()]) return -1;
            else return 0;
        });

        return list;
    },

    setLogger: function (logger) {
        this.log = logger;
    }
});

module.exports = AdaptationEngine;