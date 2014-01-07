var AdaptationPrimitive = require('./AdaptationPrimitive'),
  RemoveDeployUnit    = require('./RemoveDeployUnit');

/**
 * AddDeployUnit Adaptation command
 *
 * @type {AddDeployUnit} extends AdaptationPrimitive
 */
module.exports = AdaptationPrimitive.extend({
  toString: 'AddDeployUnit',

  /**
   *
   * @param _super AdaptationPrimitive parent
   * @param callback function: if this function first parameter != null it means that there is an error
   */
  execute: function (_super, callback) {
    _super.call(this, callback);

    var deployUnit = this.adaptModel.findByPath(this.trace.previousPath);

    if (!this.mapper.hasObject(deployUnit.path())) {
      var bootstrapper = this.node.getKevoreeCore().getBootstrapper();

      bootstrapper.bootstrap(deployUnit, false, function (err) {
        if (err) return callback(err);

        // bootstrap success: add deployUnit path & packageName into mapper
        this.mapper.addEntry(deployUnit.path(), deployUnit.name);
        this.log.debug(this.toString(), 'job done for '+deployUnit.name+'@'+this.node.getName());
        return callback();
      }.bind(this));

    } else {
      // this deploy unit is already installed, move on
      return callback();
    }
  },

  undo: function (_super, callback) {
    _super.call(this, callback);

    var cmd = new RemoveDeployUnit(this.node, this.mapper, this.adaptModel, this.trace);
    cmd.execute(callback);

    return;
  }
});