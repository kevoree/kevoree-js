var Class               = require('pseudoclass'),
    kevoree             = require('kevoree-library').org.kevoree,
    ModelAddTrace       = kevoree.modeling.api.trace.ModelAddTrace,
    ModelSetTrace       = kevoree.modeling.api.trace.ModelSetTrace,
    ModelRemoveTrace    = kevoree.modeling.api.trace.ModelRemoveTrace,
    ModelRemoveAllTrace = kevoree.modeling.api.trace.ModelRemoveAllTrace,
    ModelAddAllTrace    = kevoree.modeling.api.trace.ModelAddAllTrace,
    Kotlin              = require('kevoree-kotlin'),
    ModelObjectMapper   = require('./ModelObjectMapper'),
    KevoreeLogger       = require('kevoree-commons').KevoreeLogger;

// Adaptation Primitives
var AddInstance         = require('./adaptations/AddInstance'),
    AddBinding          = require('./adaptations/AddBinding'),
    AddDeployUnit       = require('./adaptations/AddDeployUnit'),
    Noop                = require('./adaptations/Noop'),
    RemoveBinding       = require('./adaptations/RemoveBinding'),
    RemoveDeployUnit    = require('./adaptations/RemoveDeployUnit'),
    RemoveInstance      = require('./adaptations/RemoveInstance'),
    StartInstance       = require('./adaptations/StartInstance'),
    StopInstance        = require('./adaptations/StopInstance'),
    UpdateDictionary    = require('./adaptations/UpdateDictionary');


// CONSTANTS
var INSTANCE_TRACE  = [
        'groups',
        'nodes',
        'components',
        'hubs'
    ],
    DEPLOY_UNIT     = [
        'deployUnits'
    ],
    COMMAND_RANK = {
        // highest priority
        StopInstance:     0,
        RemoveBinding:    1,
        RemoveInstance:   2,
        RemoveTypeDef:    3,
        RemoveDeployUnit: 4,
        AddDeployUnit:    5,
        AddTypeDef:       6,
        AddInstance:      7,
        AddBinding:       8,
        UpdateDictionary: 9,
        StartInstance:    10,
        Noop:             42
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
        this.compare = new kevoree.compare.DefaultModelCompare();
        this.alreadyProcessedTraces = {};
        this.tracesDUs = {};
        this.platformDUs = [];
    },

    /**
     * Process traces to find the right adaptation primitive command
     * Returns a command to execute in order to do the adaptation logic
     * @param diffSeq
     * @param targetModel
     * @returns {Array}
     */
    processTraces: function (diffSeq, targetModel) {
        var cmdList = [];

        // fill adaptation primitives list
        var traces = diffSeq.traces.iterator();
        while (traces.hasNext()) {
            this.processTrace(traces.next(), targetModel, cmdList);
        }

        // filter DUs to keep only platform-related ones
        for (var duPath in this.tracesDUs) {
            if (this.platformDUs.indexOf(duPath) === -1) {
                var i = cmdList.indexOf(this.tracesDUs[duPath]);
                cmdList.splice(i, 1);
            }
        }

        // reset maps
        this.alreadyProcessedTraces = {};
        this.tracesDUs = {};
        // reset platform DUs array
        this.platformDUs.length = 0;

        return this.sortCommands(cmdList);
    },

    /**
     * Fill up cmdList array parameter with the proper AdaptationPrimitive according to the trace parameter
     * @param trace
     * @param model
     * @param cmdList
     */
    processTrace: function (trace, model, cmdList) {
        var cmd, modelElement;

        var addProcessedTrace = function (path, cmd) {
            this.alreadyProcessedTraces[path] = this.alreadyProcessedTraces[path] || {};
            this.alreadyProcessedTraces[path][cmd.toString()] = true;
        }.bind(this);

        var traceAlreadyProcessed = function (path, cmd) {
            return this.alreadyProcessedTraces[path] && this.alreadyProcessedTraces[path][cmd];
        }.bind(this);

        // ADD - TRACES HANDLING
        if (Kotlin.isType(trace, ModelAddTrace)) {
            if (INSTANCE_TRACE.indexOf(trace.refName) !== -1) {
                // Add instance
                if (!traceAlreadyProcessed(trace.previousPath, AddInstance.prototype.toString())) {
                    modelElement = model.findByPath(trace.previousPath);
                    cmd = new AddInstance(this.node, this.modelObjMapper, model, modelElement);
                    if (cmd.isRelatedToPlatform(modelElement)) {
                        this.platformDUs.push(modelElement.typeDefinition.deployUnit.path());
                    }
                    cmdList.push(cmd);
                    addProcessedTrace(trace.previousPath, cmd);
                }

            } else if (trace.refName === 'deployUnits') {
                // Add deploy unit
                modelElement = model.findByPath(trace.previousPath);
                cmd = new AddDeployUnit(this.node, this.modelObjMapper, model, modelElement);
                this.tracesDUs[modelElement.path()] = cmd;
                cmdList.push(cmd);
                addProcessedTrace(trace.previousPath, cmd);

            } else if (trace.refName === 'mBindings') {
                // Add binding
                modelElement = model.findByPath(trace.previousPath);
                if (modelElement && modelElement.hub && !this.modelObjMapper.getObject(modelElement.hub.path())) {
                    var hub = model.findByPath(modelElement.hub.path());
                    // this binding relies on a hub that hasn't been instantiated yet
                    if (!traceAlreadyProcessed(hub.path(), AddInstance.prototype.toString())) {
                        cmd = new AddInstance(this.node, this.modelObjMapper, model, hub);
                        cmdList.push(cmd);
                        addProcessedTrace(hub.path(), cmd);
                    }

                    // also check if the instance has been started or not
                    if (!traceAlreadyProcessed(hub.path(), StartInstance.prototype.toString())) {
                        cmd = new StartInstance(this.node, this.modelObjMapper, model, hub);
                        cmdList.push(cmd);
                        addProcessedTrace(hub.path(), cmd);
                    }
                }
                cmd = new AddBinding(this.node, this.modelObjMapper, model, modelElement);
                cmdList.push(cmd);
                addProcessedTrace(modelElement.path(), cmd);

            } else if (trace.refName === 'subNodes') {
                modelElement = model.findByPath(trace.previousPath);
                if (modelElement.name === this.node.getName()) {
                    // this subNodes add-trace is related to this platform node
                    var group = model.findByPath(trace.srcPath);
                    if (group && !this.modelObjMapper.getObject(group.path())) {
                        // there is no group instance created on this platform yet
                        // lets check if there is already a primitive added for that or not
                        if (!traceAlreadyProcessed(group.path(), AddInstance.prototype.toString())) {
                            cmd = new AddInstance(this.node, this.modelObjMapper, model, group);
                            cmdList.push(cmd);
                            addProcessedTrace(group.path(), cmd);
                        }
                        // also check if the instance has been started or not
                        if (!traceAlreadyProcessed(group.path(), StartInstance.prototype.toString())) {
                            cmd = new StartInstance(this.node, this.modelObjMapper, model, group);
                            cmdList.push(cmd);
                            addProcessedTrace(group.path(), cmd);
                        }
                    }
                }
            }

            // SET - TRACES HANDLING
        } else if (Kotlin.isType(trace, ModelSetTrace)) {
            if (trace.refName && trace.refName === "started") {
                var AdaptationPrimitive = (trace.content === 'true') ? StartInstance : StopInstance;
                cmd = new AdaptationPrimitive(this.node, this.modelObjMapper, model, model.findByPath(trace.srcPath));
                cmdList.push(cmd);
                addProcessedTrace(trace.srcPath, cmd);

            } else if (trace.refName && trace.refName === 'value') {
                modelElement = model.findByPath(trace.srcPath);
                if (Kotlin.isType(modelElement, kevoree.impl.DictionaryValueImpl)) {
                    if (!traceAlreadyProcessed(trace.srcPath, UpdateDictionary.prototype.toString())) {
                        cmd = new UpdateDictionary(this.node, this.modelObjMapper, model, modelElement);
                        cmdList.push(cmd);
                        addProcessedTrace(trace.srcPath, cmd);
                    }
                }
            }

            // REMOVE - TRACES HANDLING
        } else if (Kotlin.isType(trace, ModelRemoveTrace)) {
            var tracePath = trace.previousPath || trace.objPath;
            modelElement = this.node.getKevoreeCore().getCurrentModel().findByPath(tracePath);

            if (INSTANCE_TRACE.indexOf(trace.refName) != -1) {
                // Remove instance
                // first of all, check if instance is stopped
                if (modelElement.started) {
                    // instance is in "started" state, but maybe we've already added a StopInstance primitive for it
                    if (!traceAlreadyProcessed(tracePath, StopInstance.prototype.toString())) {
                        // instance is started and there is no "StopInstance" primitive for it yet: add it
                        var stopCmd = new StopInstance(this.node, this.modelObjMapper, model, modelElement);
                        cmdList.push(stopCmd);
                        addProcessedTrace(tracePath, stopCmd);
                    }
                }
                // add RemoveInstance primitive
                cmd = new RemoveInstance(this.node, this.modelObjMapper, model, modelElement);
                cmdList.push(cmd);
                addProcessedTrace(tracePath, cmd);

            } else if (DEPLOY_UNIT.indexOf(trace.typeName) != -1) {
                // Remove deploy unit
                cmd = new RemoveDeployUnit(this.node, this.modelObjMapper, model, modelElement);
                cmdList.push(cmd);
                addProcessedTrace(tracePath, cmd);

            } else if (trace.refName === 'mBindings') {
                // Remove binding
                cmd = new RemoveBinding(this.node, this.modelObjMapper, model, modelElement);
                cmdList.push(cmd);
                addProcessedTrace(tracePath, cmd);
            }
        }
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