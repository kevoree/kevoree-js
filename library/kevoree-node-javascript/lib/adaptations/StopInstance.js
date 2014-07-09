var AdaptationPrimitive = require('kevoree-entities').AdaptationPrimitive,
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
            var instance;
            if (this.modelElement.name === this.node.getName()) {
                instance = this.node;
            } else {
                instance = this.mapper.getObject(this.modelElement.path());
            }
            if (instance && instance.isStarted()) {
                this.log.debug(this.toString(), instance.getName());
                instance.stop();
            }
        }

        callback();
    },

    undo: function (_super, callback) {
        _super.call(this, callback);

        var cmd = new StartInstance(this.node, this.mapper, this.adaptModel, this.modelElement);
        cmd.execute(callback);
    }
});