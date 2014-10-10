var KevoreeEntity = require('./KevoreeEntity');

/**
 * AbstractNode entity
 *
 * @type {AbstractNode}
 */
var AbstractNode = KevoreeEntity.extend({
    toString: 'AbstractNode',

    /**
     * Compute a list of traces and return an ordered list of AdaptationPrimitive to execute in order to proceed
     * to the adaptation of the platform
     * @param {Object} diffSeq      Kotlin.List of diff traces generated by comparing current KevoreeCore model and given model
     * @param {Object} targetModel  Kevoree ContainerModel model object
     *                              that was used by KevoreeCore to generate the diffSeq traces against currentModel
     * @returns {Array}
     */
    processTraces: function (diffSeq, targetModel) {
        return [];
    },

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
     * Called when the host node has to remove an hosted subNode instance
     * @param node the hosted subNode
     * @param done
     */
    removeSubNode: function (node, done) {
        done();
    }
});

module.exports = AbstractNode;