var AdaptationPrimitive = require('kevoree-entities').AdaptationPrimitive;

/**
 * Noop Adaptation command
 *
 * @type {Noop} extends AdaptationPrimitive
 */
module.exports = AdaptationPrimitive.extend({
    toString: 'Noop',

    /**
     *
     * @param _super AdaptationPrimitive parent
     * @param callback function: if this function first parameter != null it means that there is an error
     */
    execute: function (_super, callback) {
        _super.call(this, callback);
        callback.call(this, null);
    },

    undo: function (_super, callback) {
        _super.call(this, callback);
        // TODO
        callback.call(this, null);
    }
});