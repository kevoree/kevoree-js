'use strict';

const AdaptationPrimitive = require('kevoree-entities/lib/AdaptationPrimitive');
const AddBinding = require('./AddBinding');

module.exports = AdaptationPrimitive.extend({
  toString: 'RemoveBinding',

  /**
   * [description]
   * @return {Promise} [description]
   */
  execute: function () {
    const chanInstance = this.mapper.getObject(this.modelElement.hub.path());
    const compInstance = this.mapper.getObject(this.modelElement.port.eContainer().path());

    if (chanInstance) {
      const isRemote = this.modelElement.port.eContainer().eContainer().path() !== this.node.path;
      if (this.modelElement.port.getRefInParent() === 'provided') {
        // input port
        if (isRemote) {
          const remoteInput = chanInstance.inputs[this.modelElement.port.path()];
          if (remoteInput) {
            chanInstance.removeInputPort(remoteInput);
            this.log.debug(remoteInput.path + ' <-> ' + chanInstance.path);
          }
        } else {
          const localInput = compInstance.inputs[this.modelElement.port.path()];
          if (localInput) {
            chanInstance.removeInputPort(localInput);
            this.log.debug(localInput.path + ' <-> ' + chanInstance.path);
          }
        }

      } else {
        // output port
        if (!isRemote) {
          const localOutput = compInstance.outputs[this.modelElement.port.path()];
          if (localOutput) {
            this.log.debug(localOutput.path + ' <-> ' + chanInstance.path);
            localOutput.removeChannel(chanInstance);
          }
        }
      }
    }

    return Promise.resolve();
  },

  undo: function () {
    const cmd = new AddBinding(this.node, this.mapper, this.adaptModel, this.modelElement);
    return cmd.execute();
  },

  isInputPortType: function (kPort) {
    const kCompTD = kPort.eContainer().typeDefinition;
    const inputs = kCompTD.provided ? kCompTD.provided.iterator() : null;
    if (inputs) {
      while (inputs.hasNext()) {
        const input = inputs.next();
        if (input.name === kPort.name) {
          return true;
        }
      }
    }

    const outputs = kCompTD.required ? kCompTD.required.iterator() : null;
    if (outputs) {
      while (outputs.hasNext()) {
        const output = outputs.next();
        if (output.name === kPort.name) {
          return false;
        }
      }
    }

    return false;
  }
});
