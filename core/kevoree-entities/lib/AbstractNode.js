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
     */
    startSubNode: function (node) {},

    /**
     * Called the host node has to stop an hosted subNode
     * @param node the hosted subNode
     */
    stopSubNode: function (node) {}
});