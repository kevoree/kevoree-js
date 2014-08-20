var KevoreeEntity = require('./KevoreeEntity');

/**
 * AbstractNode entity
 *
 * @type {AbstractNode} extends KevoreeEntity
 */
module.exports = KevoreeEntity.extend({
    toString: 'AbstractNode',

    /**
     * Called when the host node has to start an hosted subNode
     * @param node the hosted subNode
     * @param done
     */
    startSubNode: function (node, done) {
        done();
    },

    /**
     * Called when the host node has to stop an hosted subNode
     * @param node the hosted subNode
     * @param done
     */
    stopSubNode: function (node, done) {
        done();
    },

    /**
     * Called when the host node has to destroy an hosted subNode instance
     * @param node the hosted subNode
     * @param done
     */
    destroySubNode: function (node, done) {
        done();
    },

    /**
     * Called when the host node has to remove an hosted subNode instance
     * @param node the hosted subNode
     * @param done
     */
    removeSubNode: function (node, done) {
        done();
    }
});