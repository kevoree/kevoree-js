var AdaptationPrimitive = require('./AdaptationPrimitive'),
    StartInstance       = require('./StartInstance');

module.exports = AdaptationPrimitive.extend({
    toString: 'StopInstance',

    execute: function (_super, callback) {
        _super.call(this, callback);

        var instance = this.mapper.getObject(this.modelElement.path());
        if (instance) {
            instance.stop();
            this.log.debug(this.toString(), 'job done on '+instance.getName()+'@'+this.node.getName());
        }
        return callback();
    },

    undo: function (_super, callback) {
        _super.call(this, callback);

        var cmd = new StartInstance(this.node, this.mapper, this.adaptModel, this.modelElement);
        cmd.execute(callback);

        return;
    }
});