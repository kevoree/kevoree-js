/**
 * Created by leiko on 01/08/14.
 */
var AdaptationPrimitive = require('kevoree-entities').AdaptationPrimitive;
var timeout = require('../timeout-handler');

/**
 * Created by leiko on 07/05/14.
 */
module.exports = AdaptationPrimitive.extend({
    toString: 'DestroyInstance',

    execute: function (callback) {
        this._super(callback);

        if (this.modelElement.name !== this.node.getName()) {
            var instance = this.mapper.getObject(this.modelElement.path());

            if (instance !== undefined && instance !== null) {
                if (!instance.isStarted()) {
                    this.log.debug(this.toString(), instance.getName());
                    instance.destroy(timeout(instance.getPath() + ' destroy(...)', callback));
                    return;
                }
            } else {
                callback(new Error(this.toString()+" error: unable to destroy instance "+this.modelElement.name));
                return;
            }
        }

        this.log.warn(this.toString(), 'Nothing performed...shouldnt see that');
        callback();
    },

    undo: function (callback) {
        this._super(callback);
        callback();
    }
});