'use strict';

const AdaptationPrimitive = require('kevoree-entities/lib/AdaptationPrimitive');
const timesUp = require('times-up');
const StartInstance = require('./StartInstance');

const StopInstance = AdaptationPrimitive.extend({
  toString: 'StopInstance',

  /**
   * [description]
   * @return {Promise} [description]
   */
  execute: function() {
    return new Promise((resolve, reject) => {
      if (this.modelElement.host && this.modelElement.host.name === this.node.getName()) {
        // this element is a subNode to this.node
        this.node.stopSubNode(this.modelElement, timesUp(this.node.getName() + '.stopSubNode(...)', 30000, (err) => {
          if (!err) {
            this.log.debug(this.node.getName() + ' stopped ' + this.modelElement.name);
            // TODO ? add eventEmitter hook for subNode too ?
            resolve();
          } else {
            reject(err);
          }
        }));
        return;

      } else {
        let instance;
        if (this.modelElement.name === this.node.getName()) {
          instance = this.node;
        } else {
          instance = this.mapper.getObject(this.modelElement.path());
        }
        if (instance) {
          if (instance.isStarted()) {
            instance.__stop__(timesUp('stop(...)', 30000, (err) => {
              if (err) {
                this.log.error('Unable to stop ' + instance.getPath());
                reject(err);
              } else {
                this.log.debug(instance.getPath());
                this.node.kCore.emitter.emit('instanceStopped', instance);
                resolve();
              }
            }));
          } else {
            resolve();
          }
        } else {
          reject(new Error(this.toString() + ' error: unable to find instance ' + this.modelElement.name));
        }
      }
    });
  },

  undo: function() {
    const cmd = new StartInstance(this.node, this.mapper, this.adaptModel, this.modelElement);
    return cmd.execute();
  }
});

module.exports = StopInstance;
