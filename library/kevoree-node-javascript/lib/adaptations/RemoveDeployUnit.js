var AdaptationPrimitive = require('kevoree-entities').AdaptationPrimitive;

/**
 * RemoveDeployUnit Adaptation
 *
 * @type {RemoveDeployUnit} extend AdaptationPrimitive
 */
module.exports = AdaptationPrimitive.extend({
    toString: 'RemoveDeployUnit',

    execute: function (callback) {
        this._super(callback);

        if (this.modelElement) {
            var bootstrapper = this.node.getKevoreeCore().getBootstrapper();
            return bootstrapper.uninstall(this.modelElement, function (err) {
                if (err) {
                    return callback(err);
                }

                this.log.debug(this.toString(), this.modelElement.path());
                this.mapper.removeEntry(this.modelElement.path());
                callback();
            }.bind(this));
        }

        return callback();
    },

    undo: function (callback) {
        this._super(callback);

        var AddDeployUnit = require('./AddDeployUnit');
        var cmd = new AddDeployUnit(this.node, this.mapper, this.adaptModel, this.modelElement);
        cmd.execute(callback);
    }
});