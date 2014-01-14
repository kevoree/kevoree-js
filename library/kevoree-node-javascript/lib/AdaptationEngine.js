var Class               = require('pseudoclass'),
  ModelAddTrace       = require('kevoree-library').org.kevoree.modeling.api.trace.ModelAddTrace,
  ModelSetTrace       = require('kevoree-library').org.kevoree.modeling.api.trace.ModelSetTrace,
  ModelRemoveTrace    = require('kevoree-library').org.kevoree.modeling.api.trace.ModelRemoveTrace,
  ModelRemoveAllTrace = require('kevoree-library').org.kevoree.modeling.api.trace.ModelRemoveAllTrace,
  ModelAddAllTrace    = require('kevoree-library').org.kevoree.modeling.api.trace.ModelAddAllTrace,
  Kotlin              = require('kevoree-kotlin'),
  ModelObjectMapper   = require('./ModelObjectMapper'),
  KevoreeLogger       = require('kevoree-commons').KevoreeLogger,
  JSNodeCompare       = require('./JSNodeCompare');

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
    this.jsNodeCompare = new JSNodeCompare(node.getName());
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
    
    this.jsNodeCompare.plan(this.node.getKevoreeCore().getCurrentModel(), targetModel, diffSeq);
    
    // generated compare traces list
    for (var i=0; i < diffSeq.traces.size(); i++) {
      this.processTrace(diffSeq.traces.get(i), targetModel, cmdList);
    }

    return this.sortCommands(cmdList);
  },

  /**
   * 
   * @param trace
   * @param model
   * @param cmdList
   */
  processTrace: function (trace, model, cmdList) {
    // ADD - TRACES HANDLING
    if (Kotlin.isType(trace, ModelAddTrace)) {
      if (INSTANCE_TRACE.indexOf(trace.typeName) != -1) {
        // Add instance
        cmdList.push(new AddInstance(this.node, this.modelObjMapper, model, model.findByPath(trace.previousPath)));

      } else if (DEPLOY_UNIT.indexOf(trace.typeName) != -1) {
        // Add deploy unit
        cmdList.push(new AddDeployUnit(this.node, this.modelObjMapper, model, model.findByPath(trace.previousPath)));

      } else if (trace.refName == 'mBindings') {
        // Add binding
        var binding = model.findByPath(trace.previousPath);
        if (binding && binding.hub && !this.modelObjMapper.getObject(binding.hub.path())) {
            // this binding relies on a hub that hasn't been instantiated yet
            cmdList.push(new AddInstance(this.node, this.modelObjMapper, model, model.findByPath(binding.hub.path())));
        }
        cmdList.push(new AddBinding(this.node, this.modelObjMapper, model, binding));
      }

      // SET - TRACES HANDLING
    } else if (Kotlin.isType(trace, ModelSetTrace)) {
      if (trace.refName && trace.refName == "started") {
        var AdaptationPrimitive = (trace.content == 'true') ? StartInstance : StopInstance;
        cmdList.push(new AdaptationPrimitive(this.node, this.modelObjMapper, model, model.findByPath(trace.srcPath)));

      } else if (trace.refName && trace.refName == 'value') {
        cmdList.push(new UpdateDictionary(this.node, this.modelObjMapper, model, model.findByPath(trace.srcPath)));
      }

      // REMOVE - TRACES HANDLING
    } else if (Kotlin.isType(trace, ModelRemoveTrace)) {
      if (INSTANCE_TRACE.indexOf(trace.typeName) != -1) {
        // Remove instance
        cmdList.push(new RemoveInstance(this.node, this.modelObjMapper, model, this.node.getKevoreeCore().getCurrentModel().findByPath(trace.previousPath || trace.objPath)));

      } else if (DEPLOY_UNIT.indexOf(trace.typeName) != -1) {
        // Remove deploy unit
        cmdList.push(new RemoveDeployUnit(this.node, this.modelObjMapper, model, this.node.getKevoreeCore().getCurrentModel().findByPath(trace.previousPath || trace.objPath)));

      } else if (trace.refName == 'mBindings') {
        // Remove binding
        cmdList.push(new RemoveBinding(this.node, this.modelObjMapper, model, this.node.getKevoreeCore().getCurrentModel().findByPath(trace.previousPath || trace.objPath)));
      }

    } else if (Kotlin.isType(trace, ModelAddAllTrace)) {
      // TODO
    } else if (Kotlin.isType(trace, ModelRemoveAllTrace)) {
      // TODO
    }
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