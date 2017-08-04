const KevoreeEntity = require('./KevoreeEntity');
const Input = require('./Input');
const Output = require('./Output');

/**
 * AbstractComponent entity
 *
 * @class
 */
const AbstractComponent = KevoreeEntity.extend({
  toString: 'AbstractComponent',

  /**
   * @constructs
   */
  construct() {
    this.inputs = {};
    this.outputs = {};
    const comp = this.getModelEntity();

    comp.provided.array.forEach((port) => {
      this.inputs[port.path()] = new Input(this, port);
    });
    comp.required.array.forEach((port) => {
      this.outputs[port.path()] = new Output(this, port);
    });
  },

  __start__(done) {
    this._super(() => {
      // once started, if there are any pending messages => send them
      Object.keys(this.inputs).forEach((path) => {
        this.inputs[path].processPendings();
      });
      done();
    });
  }
});

module.exports = AbstractComponent;
module.exports.IN_PORT = Input.PREFIX;
module.exports.OUT_PORT = Output.PREFIX;
