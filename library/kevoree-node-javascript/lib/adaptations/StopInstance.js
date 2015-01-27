var AdaptationPrimitive = require('kevoree-entities').AdaptationPrimitive;
var timesUp = require('times-up');

var StopInstance = AdaptationPrimitive.extend({
    toString: 'StopInstance',

    execute: function (callback) {
        this._super(callback);

        if (this.modelElement.host && this.modelElement.host.name === this.node.getName()) {
            // this element is a subNode to this.node
            this.node.stopSubNode(this.modelElement, timesUp(this.node.getName() + '.stopSubNode(...)', 30000, function (err) {
                if (!err) {
                    this.log.debug(this.toString(), this.node.getName()+' stopped '+this.modelElement.name);
                }
                callback(err);
            }.bind(this)));
            return;

        } else {
            var instance;
            if (this.modelElement.name === this.node.getName()) {
                instance = this.node;
            } else {
                instance = this.mapper.getObject(this.modelElement.path());
            }
            if (instance && instance.isStarted()) {
                instance.__stop__(timesUp(instance.getPath() + ' stop(...)', 30000, function (err) {
                    if (!err) {
                        this.log.debug(this.toString(), instance.getName());
                    }
                    callback(err);
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