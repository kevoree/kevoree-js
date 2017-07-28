'use strict';

const AdaptationPrimitive = require('kevoree-entities/lib/AdaptationPrimitive');
const timesUp = require('times-up');

/**
 * Created by leiko on 07/05/14.
 */
module.exports = AdaptationPrimitive.extend({
  toString: 'UpdateInstance',

  execute: function(callback) {
    let instance;
    if (this.modelElement.name === this.node.getName()) {
      instance = this.node;
    } else {
      instance = this.mapper.getObject(this.modelElement.path());
    }

    if (instance) {
      if (instance.isStarted()) {
        instance.__update__(timesUp('update(...)', 30000, (err) => {
          if (err) {
            this.log.error('Unable to update ' + instance.getPath());
          } else {
            this.log.debug(instance.getPath());
            this.node.kCore.emitter.emit('instanceUpdated', instance);
          }
          callback(err);
        }));
      }
    } else {
      callback(new Error(this.toString() + ' error: unable to update instance ' + this.modelElement.name));
    }
  },

  undo: function(callback) {
    callback();
  }
});
