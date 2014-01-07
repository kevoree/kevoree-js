var Class               = require('pseudoclass'),
  ModelAddTrace       = require('kevoree-library').org.kevoree.modeling.api.trace.ModelAddTrace,
  ModelSetTrace       = require('kevoree-library').org.kevoree.modeling.api.trace.ModelSetTrace,
  ModelRemoveTrace    = require('kevoree-library').org.kevoree.modeling.api.trace.ModelRemoveTrace,
  ModelRemoveAllTrace = require('kevoree-library').org.kevoree.modeling.api.trace.ModelRemoveAllTrace,
  ModelAddAllTrace    = require('kevoree-library').org.kevoree.modeling.api.trace.ModelAddAllTrace,
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
    'org.kevoree.Group',
    'org.kevoree.Node',
    'org.kevoree.ComponentInstance',
    'org.kevoree.Channel'
  ],
  DEPLOY_UNIT     = [
    'org.kevoree.DeployUnit'
  ],
  COMMAND_RANK = {
    "StopInstance":     0,
    "RemoveBinding":    1,
    "RemoveInstance":   2,
    "RemoveTypeDef":    3,
    "RemoveDeployUnit": 4,
    "AddDeployUnit":    5,
    "AddTypeDef":       6,
    "AddInstance":      7,
    "AddBinding":       8,
    "UpdateDictionary": 9,
    "StartInstance":    10,
    "Noop":             42
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
  },

  /**
   * Process traces to find the right adaptation primitive command
   * Returns a command to execute in order to do the adaptation logic
   * @param traces
   * @param model
   * @returns {Array}
   */
  processTraces: function (traces, model) {
    var cmdList = [];
    for (var i=0; i < traces.size(); i++) {
      cmdList.push(this.processTrace(traces.get(i), model));
    }

    return this.sortCommands(cmdList);
  },

  /**
   *
   * @param trace
   * @returns {AddInstance, RemoveInstance, AddDeployUnit, RemoveDeployUnit, AddBinding, RemoveBinding,
   *  AdaptationPrimitive, Noop, UpdateDictionary}
   */
  processTrace: function (trace, model) {
    // ADD - TRACES HANDLING
    if (Kotlin.isType(trace, ModelAddTrace)) {
      if (INSTANCE_TRACE.indexOf(trace.typeName) != -1) {
        // Add instance
        return new AddInstance(this.node, this.modelObjMapper, model, trace);

      } else if (DEPLOY_UNIT.indexOf(trace.typeName) != -1) {
        // Add deploy unit
        return new AddDeployUnit(this.node, this.modelObjMapper, model, trace);

      } else if (trace.refName == 'mBindings') {
        // Add binding
        return new AddBinding(this.node, this.modelObjMapper, model, trace);
      }

      // SET - TRACES HANDLING
    } else if (Kotlin.isType(trace, ModelSetTrace)) {
      if (trace.refName && trace.refName == "started") {
        var AdaptationPrimitive = (trace.content == 'true') ? StartInstance : StopInstance;
        return new AdaptationPrimitive(this.node, this.modelObjMapper, model, trace);

      } else if (trace.refName && trace.refName == 'value') {
        return new UpdateDictionary(this.node, this.modelObjMapper, model, trace);
      }

      // REMOVE - TRACES HANDLING
    } else if (Kotlin.isType(trace, ModelRemoveTrace)) {
      if (INSTANCE_TRACE.indexOf(trace.typeName) != -1) {
        // Remove instance
        return new RemoveInstance(this.node, this.modelObjMapper, model, trace);

      } else if (DEPLOY_UNIT.indexOf(trace.typeName) != -1) {
        // Remove deploy unit
        return new RemoveDeployUnit(this.node, this.modelObjMapper, model, trace);

      } else if (trace.refName == 'mBindings') {
        // Remove binding
        return new RemoveBinding(this.node, this.modelObjMapper, model, trace);
      }

    } else if (Kotlin.isType(trace, ModelAddAllTrace)) {
      // TODO
    } else if (Kotlin.isType(trace, ModelRemoveAllTrace)) {
      // TODO
    }

    // Unhandled trace command
    return new Noop(this.node, this.modelObjMapper, model, trace);
  },

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