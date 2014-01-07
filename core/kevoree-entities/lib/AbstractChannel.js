var KevoreeEntity = require('./KevoreeEntity');

/**
 * AbstractChannel entity
 *
 * @type {AbstractChannel} extends KevoreeEntity
 */
module.exports = KevoreeEntity.extend({
  toString: 'AbstractChannel',

  construct: function () {
    this.inputs = {};
  },

  internalSend: function (outputPath, msg) {
    var paths = [];
    for (var inputPath in this.inputs) {
      paths.push(inputPath);
    }
    this.onSend(outputPath, paths, msg);
  },

  /**
   *
   * @param fromPortPath
   * @param destPortPaths Array
   * @param msg
   */
  onSend: function (fromPortPath, destPortPaths, msg) {},

  /**
   * Dispatch messages to all bound ports
   * @param msg
   */
  localDispatch: function (msg) {
    for (var path in this.inputs) {
      var port = this.inputs[path];
      var comp = port.getComponent();
      if (comp != null && port.getInputPortMethodName() != null && typeof comp[port.getInputPortMethodName()] === 'function') {
        // call component's input port function with 'msg' parameter
        comp[port.getInputPortMethodName()](msg);
      }
    }
  },

  addInternalInputPort: function (port) {
    this.inputs[port.getPath()] = port;
  },

  removeInternalInputPort: function (port) {
    delete this.inputs[port.getPath()];
  }
});