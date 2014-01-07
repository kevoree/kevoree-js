var AdaptationPrimitive = require('./AdaptationPrimitive'),
  AddDeployUnit       = require('./AddDeployUnit');

/**
 * RemoveDeployUnit Adaptation
 *
 * @type {RemoveDeployUnit} extend AdaptationPrimitive
 */
module.exports = AdaptationPrimitive.extend({
  toString: 'RemoveDeployUnit',

  execute: function (_super, callback) {
    _super.call(this, callback);

    var deployUnit  = this.node.getKevoreeCore().getCurrentModel().findByPath(this.trace.previousPath || this.trace.objPath);

    if (deployUnit) {
      var bootstrapper = this.node.getKevoreeCore().getBootstrapper();
      bootstrapper.uninstall(deployUnit, function (err) {
        if (err) return callback(err);

        this.mapper.removeEntry(deployUnit.path());
        this.log.debug(this.toString(), 'job done on '+deployUnit.name+'@'+this.node.getName());
        return callback();
      }.bind(this));
    }

    return callback();
  },

  undo: function (_super, callback) {
    _super.call(this, callback);

    var cmd = new AddDeployUnit(this.node, this.mapper, this.adaptModel, this.trace);
    cmd.execute(callback);

    return;
  }
});