var AdaptationPrimitive = require('kevoree-entities').AdaptationPrimitive,
    timeout             = require('../timeout-handler');

/**
 * Created by leiko on 07/05/14.
 */
module.exports = AdaptationPrimitive.extend({
    toString: 'UpdateInstance',

    execute: function (callback) {
        this._super(callback);

        var instance = this.mapper.getObject(this.modelElement.path());

        if (instance !== undefined && instance !== null) {
            if (instance.isStarted()) {
                this.log.debug(this.toString(), instance.getName());
                instance.update(timeout(instance.getName() + '.update(...)', callback));
            }
        } else {
            callback(new Error(this.toString()+" error: unable to update instance "+this.modelElement.name));
        }
    },

    undo: function (callback) {
        this._super(callback);
        return callback();
    }
});