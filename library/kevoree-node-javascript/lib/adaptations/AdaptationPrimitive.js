var Class   = require('pseudoclass'),
  Kotlin = require('kevoree-kotlin'),
  kevoree = require('kevoree-library').org.kevoree,
  KevoreeLogger = require('kevoree-commons').KevoreeLogger;

/**
 * Abstract AdaptationPrimitive command
 *
 * @param node JavascriptNode context
 * @param mapper ModelObjectMapper that handles mapping betweend model objects and 'real-life' object
 * @type {AdaptationPrimitive}
 */
module.exports = Class({
  toString: 'AdaptationPrimitive',

  /**
   * Construct an AdaptationPrimitive object
   *
   * @param node KevoreeNode platform
   * @param mapper ModelObjectMapper
   * @param model model to deploy (that triggers adaptations)
   * @param modelElement model element linked with this primitive
   */
  construct: function (node, mapper, model, modelElement) {
    this.node = node;
    this.mapper = mapper;
    this.adaptModel = model;
    this.modelElement = modelElement;
    this.log = this.node.getKevoreeCore().getLogger();
  },

  /**
   * Executes adaptation primitive logics
   * @param callback Function(err, [args]) if 'err' is defined => something went wrong
   */
  execute: function (callback) {
    if (callback == undefined || callback == null || typeof(callback) != 'function') {
      console.error("Execute method need a callback function as last parameter");
      return;
    }
  },

  /**
   * Undo the process done by execute()
   */
  undo: function (callback) {
    if (callback == undefined || callback == null || typeof(callback) != 'function') {
      console.error("Undo method need a callback function as last parameter");
      return;
    }
  },

  isRelatedToPlatform: function (kInstance) {
    if (Kotlin.isType(kInstance.typeDefinition, kevoree.impl.ComponentTypeImpl)) {
      // if parent is this node platform: it's ok
      return (kInstance.eContainer().name == this.node.getName());

    } else if (Kotlin.isType(kInstance.typeDefinition, kevoree.impl.ChannelTypeImpl)) {
      // if this channel has bindings with components hosted in this node platform: it's ok
      var bindings = kInstance.bindings;
      for (var i=0; i < bindings.size(); i++) {
        if (bindings.get(i).port.eContainer().eContainer().name == this.node.getName()) return true;
      }

    } else if (Kotlin.isType(kInstance.typeDefinition, kevoree.impl.GroupTypeImpl)) {
      var subNodes = kInstance.subNodes;
      for (var i=0; i < subNodes.size(); i++) {
        if (subNodes.get(i).name == this.node.name) return true;
      }

    } else if (Kotlin.isType(kInstance.typeDefinition, kevoree.impl.NodeTypeImpl)) {
      // TODO take subnodes in account
      return false;

    }

    return false;
  }
});