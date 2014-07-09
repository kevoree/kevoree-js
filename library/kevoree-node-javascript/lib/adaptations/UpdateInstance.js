var AdaptationPrimitive = require('kevoree-entities').AdaptationPrimitive;

/**
 * Created by leiko on 07/05/14.
 */
module.exports = AdaptationPrimitive.extend({
    toString: 'UpdateInstance',

    execute: function (callback) {
        this._super(callback);

        if (this.modelElement.name != this.node.getName()) {
            var instance = this.mapper.getObject(this.modelElement.path());

            if (instance !== undefined && instance !== null) {
                if (instance.isStarted()) {
                    this.log.debug(this.toString(), instance.getName());
                    instance.update();
                    return callback();
                }
            } else {
                return callback(new Error(this.toString()+" error: unable to update instance "+this.modelElement.name));
            }
        }

        return callback();
    },

    undo: function (callback) {
        this._super(callback);
        return callback();
    }
});