'use strict';

var Class = require('pseudoclass'),
  Dictionary = require('./Dictionary');

/**
 * Abstract class: KevoreeEntity
 * <br/>
 * You are not supposed to instantiate this class manually. It makes no sense
 * <br/>
 * You should create your own Kevoree entity that extend one of the defined abstraction type:
 * <ul>
 *     <li>AbstractNode</li>
 *     <li>AbstractGroup</li>
 *     <li>AbstractChannel</li>
 *     <li>AbstractComponent</li>
 * </ul>
 * All this sub-classes extend KevoreeEntity in order to have the same basic prototype
 *
 * @class
 */
var KevoreeEntity = Class({
  toString: 'KevoreeEntity',

  /**
   * @constructs
   */
  construct: function (core, modelElement, nodeName) {
    this.kCore = core;
    this.nodeName = nodeName;
    this.name = modelElement.name;
    this.path = modelElement.path();
    this.started = false;
    this.dictionary = new Dictionary(this);
    this.log = this.kCore.getLoggerFactory().create(modelElement.typeDefinition.name, modelElement.name);
  },

  /**
   * Called when an entity has to start
   * @param done
   */
  start: function (done) {
    done();
  },

  /**
   * Called when an entity has to stop
   * @param done
   */
  stop: function (done) {
    done();
  },

  /**
   * Called when a attribute has been changed (this method is called after all attribute-specific update() method)
   * @param done
   */
  update: function (done) {
    done();
  },

  __start__: function (done) {
    this.started = true;
    this.start(done);
  },

  __stop__: function (done) {
    this.started = false;
    this.stop(done);
  },

  __update__: function (done) {
    this.update(done);
  },

  __destruct__: function () {
    this.kCore.getLoggerFactory().delete(this.log);
  },

  /**
   *
   * @returns {Object}
   */
  getKevoreeCore: function () {
    return this.kCore;
  },

  getDictionary: function () {
    return this.dictionary;
  },

  getName: function () {
    return this.name;
  },

  getNodeName: function () {
    return this.nodeName;
  },

  getPath: function () {
    return this.path;
  },

  /**
   * Tries to retrieve this Kevoree entity from deployModel first.
   * If deployModel is null (meaning that we are in a deployed-state and not in a deploying-state)
   * it tries to retrieve this Kevoree entity from currentModel.
   * @returns {*}
   */
  getModelEntity: function () {
    var model = this.kCore.getDeployModel();
    if (!model) {
      model = this.kCore.getCurrentModel();
    }
    return model.findByPath(this.path);
  },

  getNetworkInfos: function (nodeName) {
    var model = this.kCore.getDeployModel();
    if (!model) {
      this.kCore.getCurrentModel();
    }
    var node = model.findNodesByID(nodeName);
    if (node) {
      return node.networkInformation.iterator();
    } else {
      return null;
    }
  },

  isStarted: function () {
    return this.started;
  },

  /**
   * Executes script with current model context. If callback parameter is set,
   * it means something went wrong and the parameter is the error object.
   * NB: scripts submitted while in "deploying" state are queued and executed after.
   * @param script KevScript string
   * @param [callback] function (err)
   */
  submitScript: function (script, callback) {
    this.getKevoreeCore().submitScript(script, callback);
  }
});

KevoreeEntity.DIC = 'dic_';
module.exports = KevoreeEntity;
