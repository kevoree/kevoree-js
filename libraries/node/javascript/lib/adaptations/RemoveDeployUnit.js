'use strict';

const AdaptationPrimitive = require('kevoree-entities/lib/AdaptationPrimitive');
const AddDeployUnit = require('./AddDeployUnit');

/**
 * RemoveDeployUnit Adaptation
 *
 * @type {RemoveDeployUnit} extend AdaptationPrimitive
 */
module.exports = AdaptationPrimitive.extend({
  toString: 'RemoveDeployUnit',

  /**
   * [description]
   * @return {Promise} [description]
   */
  execute: function() {
    if (this.modelElement) {
      const resolver = this.node.getKevoreeCore().getResolver();
      return resolver.uninstall(this.modelElement)
        .then(() => {
          this.log.debug(this.modelElement.path());
          this.mapper.removeEntry(this.modelElement.path());
        });
    } else {
      return Promise.resolve();
    }
  },

  undo: function() {
    const cmd = new AddDeployUnit(this.node, this.mapper, this.adaptModel, this.modelElement);
    return cmd.execute();
  }
});
