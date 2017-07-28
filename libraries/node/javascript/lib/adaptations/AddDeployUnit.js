'use strict';

const AdaptationPrimitive = require('kevoree-entities/lib/AdaptationPrimitive');
const RemoveDeployUnit = require('./RemoveDeployUnit');
const ModelHelper = require('../ModelHelper');

/**
 * AddDeployUnit Adaptation command
 *
 * @type {AddDeployUnit} extends AdaptationPrimitive
 */
module.exports = AdaptationPrimitive.extend({
  toString: 'AddDeployUnit',

  /**
   *
   * @param callback function: if this function first parameter != null it means that there is an error
   */
  execute: function (callback) {
    if (!this.mapper.hasObject(this.modelElement.path())) {
      const resolver = this.node.getKevoreeCore().getResolver();

      resolver.resolve(this.modelElement, false, (err, TypeDef) => {
        if (err) {
          callback(err);
        } else {
          // bootstrap success: add deployUnit path & packageName into mapper
          this.log.debug('namespace=' + ModelHelper.getNamespace(this.modelElement.eContainer()) + ',hash=' + this.modelElement.hashcode + ',name=' + this.modelElement.name + ',version=' + this.modelElement.version);
          this.mapper.addEntry(this.modelElement.path(), TypeDef);
          callback();
        }
      });
    } else {
      // this deploy unit is already installed, move on
      callback();
    }
  },

  undo: function(callback) {
    const cmd = new RemoveDeployUnit(this.node, this.mapper, this.adaptModel, this.modelElement);
    cmd.execute(callback);
  }
});
