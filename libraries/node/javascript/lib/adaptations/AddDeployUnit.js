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
   * [description]
   * @return {Promise} [description]
   */
  execute: function () {
    if (!this.mapper.hasObject(this.modelElement.path())) {
      const resolver = this.node.getKevoreeCore().getResolver();
      return resolver.resolve(this.modelElement)
        .then((Type) => {
          this.log.debug(
            'namespace=' + ModelHelper.getNamespace(this.modelElement.eContainer()) +
            ',hash=' + this.modelElement.hashcode +
            ',name=' + this.modelElement.name +
            ',version=' + this.modelElement.version);
          this.mapper.addEntry(this.modelElement.path(), Type);
        });
    } else {
      // this deploy unit is already installed, move on
      return Promise.resolve();
    }
  },

  undo: function() {
    const cmd = new RemoveDeployUnit(this.node, this.mapper, this.adaptModel, this.modelElement);
    return cmd.execute();
  }
});
