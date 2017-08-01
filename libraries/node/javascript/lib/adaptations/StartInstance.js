'use strict';

const AdaptationPrimitive = require('kevoree-entities/lib/AdaptationPrimitive');
const timesUp = require('times-up');
const StopInstance = require('./StopInstance');

const StartInstance = AdaptationPrimitive.extend({
  toString: 'StartInstance',

  /**
   * [description]
   * @return {Promise} [description]
   */
  execute: function() {
    return new Promise((resolve, reject) => {
      if (this.modelElement.host && this.modelElement.host.name === this.node.getName()) {
        // this element is a subNode to this.node
        this.node.startSubNode(this.modelElement, timesUp(this.node.getName() + '.startSubNode(...)', 30000, (err) => {
          if (!err) {
            this.log.debug(this.node.getName() + ' started ' + this.modelElement.name);
            // TODO ? add eventEmitter hook for subNode too ?
            resolve();
          } else {
            reject(err);
          }
        }));

      } else {
        let instance;
        if (this.modelElement.name === this.node.getName()) {
          instance = this.node;
        } else {
          instance = this.mapper.getObject(this.modelElement.path());
        }
        if (instance !== undefined && instance !== null) {
          // check dictionary value and give default values if none set
          const dicType = this.modelElement.typeDefinition.dictionaryType;
          if (dicType) {
            const attrs = dicType.attributes.iterator();
            while (attrs.hasNext()) {
              const attr = attrs.next();
              const val = instance.dictionary.getValue(attr.name);
              if (typeof(val) === 'undefined') {
                // there is no value set for this attribute
                // lets inflate dictionary with default values if any
                if (attr.optional) {
                  // the attribute is optional, we will only add the value if defaultValue is set
                  if (attr.defaultValue.length > 0) {
                    instance.dictionary.setEntry(attr.name, attr.defaultValue);
                  }
                } else {
                  // attribute is not optional, we have to have a value, then set defaultValue
                  instance.dictionary.setEntry(attr.name, attr.defaultValue);
                }
              }
            }
          }

          // check if instance is already started
          if (!instance.isStarted()) {
            instance.__start__(timesUp('start(...)', 30000, (err) => {
              if (err) {
                this.log.error('Unable to start ' + instance.getPath());
                reject(err);
              } else {
                this.log.debug(instance.getPath());
                this.node.kCore.emitter.emit('instanceStarted', instance);
                resolve();
              }
            }));
            return;
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
    const cmd = new StopInstance(this.node, this.mapper, this.adaptModel, this.modelElement);
    return cmd.execute();
  }
});

module.exports = StartInstance;
