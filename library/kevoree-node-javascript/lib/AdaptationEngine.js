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

        // reset processedTrace map
        this.alreadyProcessedTraces = {};

        return this.sortCommands(cmdList);
    },

    /**
     * Fill up cmdList array parameter with the proper AdaptationPrimitive according to the trace parameter
     * @param trace
     * @param model
     * @param cmdList
     */
    processTrace: function (trace, model, cmdList) {
        var addProcessedTrace = function (path, cmd) {
            this.alreadyProcessedTraces[path] = this.alreadyProcessedTraces[path] || {};
            this.alreadyProcessedTraces[path][cmd.toString()] = true;
        }.bind(this);

        var traceAlreadyProcessed = function (path, cmd) {
            return this.alreadyProcessedTraces[path] && this.alreadyProcessedTraces[path][cmd];
        }.bind(this);

        // ADD - TRACES HANDLING
        if (Kotlin.isType(trace, ModelAddTrace)) {
            if (INSTANCE_TRACE.indexOf(trace.refName) != -1) {
                // Add instance
                var cmd = new AddInstance(this.node, this.modelObjMapper, model, model.findByPath(trace.previousPath));
                cmdList.push(cmd);
                addProcessedTrace(trace.previousPath, cmd);

            } else if (trace.refName === 'deployUnits') {
                // Add deploy unit
                var cmd = new AddDeployUnit(this.node, this.modelObjMapper, model, model.findByPath(trace.previousPath));
                cmdList.push(cmd);
                addProcessedTrace(trace.previousPath, cmd);

            } else if (trace.refName === 'mBindings') {
                // Add binding
                var binding = model.findByPath(trace.previousPath);
                if (binding && binding.hub && !this.modelObjMapper.getObject(binding.hub.path())) {
                    var hub = model.findByPath(binding.hub.path());
                    // this binding relies on a hub that hasn't been instantiated yet
                    if (!traceAlreadyProcessed(hub.path(), AddInstance.prototype.toString())) {
                        var cmd = new AddInstance(this.node, this.modelObjMapper, model, hub);
                        cmdList.push(cmd);
                        addProcessedTrace(hub.path(), cmd);
                    }

                    // also check if the instance has been started or not
                    if (!traceAlreadyProcessed(hub.path(), StartInstance.prototype.toString())) {
                        var cmd = new StartInstance(this.node, this.modelObjMapper, model, hub);
                        cmdList.push(cmd);
                        addProcessedTrace(hub.path(), cmd);
                    }
                }
                var cmd = new AddBinding(this.node, this.modelObjMapper, model, binding);
                cmdList.push(cmd);
                addProcessedTrace(binding.path(), cmd);

            } else if (trace.refName === 'subNodes') {
                var node = model.findByPath(trace.previousPath);
                if (node.name === this.node.getName()) {
                    // this subNodes add-trace is related to this platform node
                    var group = model.findByPath(trace.srcPath);
                    if (group && !this.modelObjMapper.getObject(group.path())) {
                        // there is no group instance created on this platform yet
                        // lets check if there is already a primitive added for that or not
                        if (!traceAlreadyProcessed(group.path(), AddInstance.prototype.toString())) {
                            var cmd = new AddInstance(this.node, this.modelObjMapper, model, group);
                            cmdList.push(cmd);
                            addProcessedTrace(group.path(), cmd);
                        }
                        // also check if the instance has been started or not
                        if (!traceAlreadyProcessed(group.path(), StartInstance.prototype.toString())) {
                            var cmd = new StartInstance(this.node, this.modelObjMapper, model, group);
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
                var cmd = new AdaptationPrimitive(this.node, this.modelObjMapper, model, model.findByPath(trace.srcPath));
                cmdList.push(cmd);
                addProcessedTrace(trace.srcPath, cmd);

            } else if (trace.refName && trace.refName === 'value') {
                var cmd = new UpdateDictionary(this.node, this.modelObjMapper, model, model.findByPath(trace.srcPath));
                cmdList.push(cmd);
                addProcessedTrace(trace.srcPath, cmd);
            }

            // REMOVE - TRACES HANDLING
        } else if (Kotlin.isType(trace, ModelRemoveTrace)) {
            var tracePath = trace.previousPath || trace.objPath;
            var elem = this.node.getKevoreeCore().getCurrentModel().findByPath(tracePath);

            if (INSTANCE_TRACE.indexOf(trace.refName) != -1) {
                // Remove instance
                // first of all, check if instance is stopped
                if (elem.started) {
                    // instance is in "started" state, but maybe we've already added a StopInstance primitive for it
                    if (!traceAlreadyProcessed(tracePath, StopInstance.prototype.toString())) {
                        // instance is started and there is no "StopInstance" primitive for it yet: add it
                        var stopCmd = new StopInstance(this.node, this.modelObjMapper, model, elem);
                        cmdList.push(stopCmd);
                        addProcessedTrace(tracePath, stopCmd);
                    }
                }
                // add RemoveInstance primitive
                var cmd = new RemoveInstance(this.node, this.modelObjMapper, model, elem);
                cmdList.push(cmd);
                addProcessedTrace(tracePath, cmd);

            } else if (DEPLOY_UNIT.indexOf(trace.typeName) != -1) {
                // Remove deploy unit
                var cmd = new RemoveDeployUnit(this.node, this.modelObjMapper, model, elem);
                cmdList.push(cmd);
                addProcessedTrace(tracePath, cmd);

            } else if (trace.refName === 'mBindings') {
                // Remove binding
                var cmd = new RemoveBinding(this.node, this.modelObjMapper, model, elem);
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