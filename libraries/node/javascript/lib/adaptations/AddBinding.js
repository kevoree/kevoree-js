

const AdaptationPrimitive = require('kevoree-entities/lib/AdaptationPrimitive');
const RemoveBinding = require('./RemoveBinding');
const Input = require('kevoree-entities/lib/Input');

module.exports = AdaptationPrimitive.extend({
  toString: 'AddBinding',

  /**
   * [description]
   * @return {Promise} [description]
   */
  execute: function () {
    const chanInstance = this.mapper.getObject(this.modelElement.hub.path());
    const compInstance = this.mapper.getObject(this.modelElement.port.eContainer().path());

    if (chanInstance) {
      if (compInstance) {
        // if compInstance is found then it means that the port is on this node
        if (this.modelElement.port.getRefInParent() === 'provided') {
          // binding related port is an 'in' port type
          const input = compInstance.inputs[this.modelElement.port.path()];
          chanInstance.addInputPort(input);
          this.log.debug(input.path + ' <-> ' + chanInstance.path);
        } else {
          // binding related port is an 'out' port type
          const output = compInstance.outputs[this.modelElement.port.path()];
          output.addChannel(chanInstance);
          this.log.debug(output.path + ' <-> ' + chanInstance.path);
        }

        return Promise.resolve();

      } else {
        if (this.modelElement.port.getRefInParent() === 'provided') {
          // only add input port
          chanInstance.addInputPort(new Input(this.modelElement.port.eContainer(), this.modelElement.port, true));
          this.log.debug('create remote input: ' + this.modelElement.port.path());
          this.log.debug(this.modelElement.port.path() + ' <-> ' + chanInstance.path);
        }
        return Promise.resolve();
      }
    } else {
      return Promise.reject(new Error(this.toString() + ' error: unable to find channel ' + this.modelElement.hub.name + ' instance on platform.'));
    }
  },

  /**
   * [description]
   * @return {Promise} [description]
   */
  undo: function () {
    const cmd = new RemoveBinding(this.node, this.mapper, this.adaptModel, this.modelElement);
    return cmd.execute();
  }
});
