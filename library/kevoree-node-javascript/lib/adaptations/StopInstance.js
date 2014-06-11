var AdaptationPrimitive = require('./AdaptationPrimitive'),
    StartInstance       = require('./StartInstance');

module.exports = AdaptationPrimitive.extend({
    toString: 'StopInstance',

    execute: function (_super, callback) {
        _super.call(this, callback);

        if (this.modelElement.host && this.modelElement.host.name === this.node.getName()) {
            // this element is a subNode to this.node
            this.log.debug(this.toString(), this.node.getName()+' has to stop '+this.modelElement.name);
            this.node.stopSubNode(this.modelElement);

        } else {
            var instance = this.mapper.getObject(this.modelElement.path());
            if (instance) {
                this.log.debug(this.toString(), instance.getName());
                instance.stop();
            }
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