var KevoreeEntity = require('./KevoreeEntity');

/**
 * AbstractNode entity
 *
 * @type {AbstractNode} extends KevoreeEntity
 */
module.exports = KevoreeEntity.extend({
    toString: 'AbstractNode',

    /**
     * Called by StartInstance when a host node has to start an hosted subNode
     * @param node
     */
    onStartSubNode: function (node) {}
});