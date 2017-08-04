

const AdaptationPrimitive = require('kevoree-entities/lib/AdaptationPrimitive');
const timesUp = require('times-up');
const AddInstance = require('./AddInstance');

/**
 * RemoveInstance Adaptation command
 *
 * @type {RemoveInstance} extends AdaptationPrimitive
 */
module.exports = AdaptationPrimitive.extend({
  toString: 'RemoveInstance',

  /**
   * [description]
   * @return {Promise} [description]
   */
  execute: function () {
    return new Promise((resolve, reject) => {
      if (this.modelElement.host && this.modelElement.host.name === this.node.getName()) {
        // this element is a subNode to this.node
        this.node.removeSubNode(this.modelElement, timesUp(this.node.getName() + '.removeSubNode(...)', 30000, (err) => {
          if (!err) {
            this.log.debug(this.node.getName() + ' removed ' + this.modelElement.name);
            // TODO ? add eventEmitter hook for subNode too ?
          }
          reject(err);
        }));
        return;

      } else {
        const instance = this.mapper.getObject(this.modelElement.path());
        if (instance) {
          if (this.modelElement.getRefInParent() === 'components') {
            // check if there is binding to remove in current channels
            this.node.kCore.currentModel.mBindings.array.forEach((binding) => {
              if (binding.port && binding.port.eContainer() && binding.port.eContainer().path() === instance.path) {
                const chan = this.mapper.getObject(binding.hub.path());
                const port = this.mapper.getObject(binding.port.path());
                if (chan && port && binding.port.getRefInParent() === 'provided') {
                  // unload old binding in channel instance
                  chan.removeInternalInputPort(port);
                }
              }
            });
          }
          instance.__destruct__();
          this.mapper.removeEntry(this.modelElement.path());
          this.log.debug(instance.getName() + ' ' + this.modelElement.typeDefinition.path());
          this.node.kCore.emitter.emit('instanceRemoved', instance);
          resolve();
          return;
        }
      }
      resolve();
    });
  },

  undo: function () {
    const cmd = new AddInstance(this.node, this.mapper, this.adaptModel, this.modelElement);
    return cmd.execute();
  }
});
