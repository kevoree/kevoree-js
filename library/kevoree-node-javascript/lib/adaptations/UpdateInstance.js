var AdaptationPrimitive = require('kevoree-entities').AdaptationPrimitive,
    timesUp             = require('times-up');

/**
 * Created by leiko on 07/05/14.
 */
module.exports = AdaptationPrimitive.extend({
    toString: 'UpdateInstance',

    execute: function (callback) {
        this._super(callback);

        var instance;
        if (this.modelElement.name === this.node.getName()) {
            instance = this.node;
        } else {
            instance = this.mapper.getObject(this.modelElement.path());
        }

        if (instance) {
            if (instance.isStarted()) {
                instance.__update__(timesUp(instance.getPath() + ' update(...)', 30000, function (err) {
                    if (!err) {
                        this.log.debug(this.toString(), instance.getName());
                    }
                    callback(err);
                }.bind(this)));
            }
        } else {
            callback(new Error(this.toString()+" error: unable to update instance "+this.modelElement.name));
        }
    },

    undo: function (callback) {
        this._super(callback);
        callback();
    }
});