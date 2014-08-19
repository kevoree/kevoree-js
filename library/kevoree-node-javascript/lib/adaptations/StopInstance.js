var AdaptationPrimitive = require('kevoree-entities').AdaptationPrimitive;
var timeout = require('../timeout-handler');

var StopInstance = AdaptationPrimitive.extend({
    toString: 'StopInstance',

    execute: function (callback) {
        this._super(callback);

        if (this.modelElement.host && this.modelElement.host.name === this.node.getName()) {
            // this element is a subNode to this.node
            this.log.debug(this.toString(), this.node.getName()+' has to stop '+this.modelElement.name);
            this.node.stopSubNode(this.modelElement, timeout(this.node.getName() + '.stopSubNode(...)', callback));
            return;

        } else {
            var instance;
            if (this.modelElement.name === this.node.getName()) {
                instance = this.node;
            } else {
                instance = this.mapper.getObject(this.modelElement.path());
            }
            if (instance && instance.isStarted()) {
                instance.stop(timeout(instance.getPath() + ' stop(...)', function (err) {
                    if (err) {
                        callback(err);
                    } else {
                        this.log.debug(this.toString(), instance.getName());
                        callback();
                    }
                }.bind(this)));
                return;
            }
        }

        this.log.warn(this.toString(), 'Nothing performed...shouldnt see that');
        callback();
    },

    undo: function (callback) {
        this._super(callback);

        var StartInstance = require('./StartInstance');
        var cmd = new StartInstance(this.node, this.mapper, this.adaptModel, this.modelElement);
        cmd.execute(callback);
    }
});

module.exports = StopInstance;