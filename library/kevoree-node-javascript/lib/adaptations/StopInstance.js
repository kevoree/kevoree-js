var AdaptationPrimitive = require('./AdaptationPrimitive'),
    StartInstance       = require('./StartInstance');

module.exports = AdaptationPrimitive.extend({
  toString: 'StopInstance',

  execute: function (_super, callback) {
    _super.call(this, callback);

    var kInstance = this.adaptModel.findByPath(this.trace.srcPath);

    var instance = this.mapper.getObject(kInstance.path());
    if (instance != undefined && instance != null) {
      instance.stop();
      this.log.debug(this.toString(), 'job done on '+instance.getName()+'@'+this.node.getName());
    }
    return callback();
  },

  undo: function (_super, callback) {
    _super.call(this, callback);

    var cmd = new StartInstance(this.node, this.mapper, this.adaptModel, this.trace);
    cmd.execute(callback);

    return;
  }
});