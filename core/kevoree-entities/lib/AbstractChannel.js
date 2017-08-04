const KevoreeEntity = require('./KevoreeEntity');

/**
 * AbstractChannel entity
 *
 * @class
 */
const AbstractChannel = KevoreeEntity.extend({
  toString: 'AbstractChannel',

  /**
   * @constructs
   */
  construct() {
    this.inputs = {};
    this.pendings = [];
  },

  __start__(done) {
    this._super(() => {
      this.pendings.forEach((msg) => {
        this.internalSend(msg.outputPath, msg.content, msg.callback);
      });
      this.pendings.length = 0;
      done();
    });
  },

  /**
   * @param {String} outputPath
   * @param {String} msg
   * @param {Function} callback
   */
  internalSend(outputPath, msg, callback) {
    const paths = [];
    const debugPaths = [];
    const model = this.getKevoreeCore().getCurrentModel();
    if (model) {
      Object.keys(this.inputs).forEach((inputPath) => {
        const port = model.findByPath(inputPath);
        if (port) {
          const comp = port.eContainer();
          if (comp && comp.started) {
            // do not send message to stopped component
            paths.push(inputPath);
            debugPaths.push(comp.eContainer().name + '.' + comp.name + '.' + port.name);
          }
        }
      });
    }

    if (this.started) {
      this.log.debug('-> ' + truncate(msg) + ' -> [' + debugPaths.join(', ') + ']');
      this.onSend(outputPath, paths, msg + '', callback);
    } else {
      this.log.debug('-> ' + truncate(msg) + ' -> [' + debugPaths.join(', ') + '] (queued)');
      this.pendings.push({
        outputPath: outputPath,
        content: msg,
        callback: callback
      });
    }
  },

  /**
   * Method to override in channels implementation to provide a way
   * to dispatch messages to the different connected input ports
   *
   * @param {String} fromPortPath
   * @param {Array} destPortPaths Array
   * @param {String} msg
   * @param {Function} callback
   *
   * @abstract
   */
  onSend() {},

  /**
   * Dispatch messages to all bound ports
   *
   * @param msg
   * @param {Function} [callback]
   */
  localDispatch(msg, callback) {
    // if no callback given, then prevent exception to be thrown
    callback = callback || function noop() {};

    this.getLocalInputPorts().forEach((input) => {
      input.call(msg, callback);
    });
  },

  /**
   * Returns this channel output port paths
   * @returns {Array}
   */
  getOutputs() {
    const outputs = [];

    const chan = this.getModelEntity();
    if (chan) {
      chan.bindings.array.forEach((binding) => {
        if (binding.port && binding.port.getRefInParent() === 'required') {
          if (binding.port.eContainer().eContainer().name === this.getNodeName()) {
            if (outputs.indexOf(binding.port.path()) === -1) {
              outputs.push(binding.port.path());
            }
          }
        }
      });
    }

    return outputs;
  },

  /**
   * Returns this channel input port paths
   * @returns {Array}
   */
  getInputs() {
    const inputs = [];

    const chan = this.getModelEntity();
    if (chan) {
      chan.bindings.array.forEach((binding) => {
        if (binding.port && binding.port.getRefInParent() === 'provided') {
          if (inputs.indexOf(binding.port.path()) === -1) {
            inputs.push(binding.port.path());
          }
        }
      });
    }

    return inputs;
  },

  /**
   * Returns an array of Input (every input connected to the channel)
   * @returns {Array} of Input
   */
  getInputPorts() {
    return Object.keys(this.inputs)
      .map((key) => this.inputs[key]);
  },

  /**
   * Returns an array of local Input (running on this node)
   * @returns {Array} of local Input
   */
  getLocalInputPorts() {
    return this.getInputPorts()
      .filter((input) => {
        return !input.isRemote;
      });
  },

  /**
   * Returns an array of remote Input (not running on this node)
   * @returns {Array} of remote Input
   */
  getRemoteInputPorts() {
    return this.getInputPorts()
      .filter((input) => input.isRemote);
  },

  /**
   *
   * @param port
   */
  addInputPort(port) {
    this.inputs[port.path] = port;
  },

  /**
   *
   * @param port
   */
  removeInputPort(port) {
    delete this.inputs[port.path];
  }
});

function truncate(msg) {
  if (msg && msg.length > 15) {
    msg = msg.substr(0, 15) + '...';
  }
  return msg;
}

module.exports = AbstractChannel;
