

const AdaptationPrimitive = require('kevoree-entities/lib/AdaptationPrimitive');
const timesUp = require('times-up');

/**
 * Created by leiko on 07/05/14.
 */
module.exports = AdaptationPrimitive.extend({
  toString: 'UpdateInstance',

  /**
   * [description]
   * @return {Promise} [description]
   */
  execute: function() {
    return new Promise((resolve, reject) => {
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
              reject(err);
            } else {
              this.log.debug(instance.getPath());
              this.node.kCore.emitter.emit('instanceUpdated', instance);
              resolve();
            }
          }));
        }
      } else {
        reject(new Error(this.toString() + ' error: unable to update instance ' + this.modelElement.name));
      }
    });
  },

  undo: function() {
    return Promise.resolve();
  }
});
