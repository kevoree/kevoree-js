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

  execute: function(callback) {
    if (this.modelElement) {
      const resolver = this.node.getKevoreeCore().getResolver();
      resolver.uninstall(this.modelElement, (err) => {
        if (err) {
          return callback(err);
        }

        this.log.debug(this.modelElement.path());
        this.mapper.removeEntry(this.modelElement.path());
        callback();
      });
    } else {
      callback();
    }
  },

  undo: function(callback) {
    const cmd = new AddDeployUnit(this.node, this.mapper, this.adaptModel, this.modelElement);
    cmd.execute(callback);
  }
});
