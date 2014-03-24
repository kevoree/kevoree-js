var AbstractNode        = require('kevoree-entities').AbstractNode,
    AdaptationEngine    = require('./lib/AdaptationEngine'),
    kevoree             = require('kevoree-library').org.kevoree;

var JavascriptNode = AbstractNode.extend({
    toString: 'JavascriptNode',

    construct: function () {
        this.adaptationEngine = new AdaptationEngine(this);
    },

    start: function (_super) {
        _super.call(this);
        this.adaptationEngine.setLogger(this.getKevoreeCore().getLogger());
    },

    stop: function (_super) {
        // TODO
    },

    /**
     * Process traces in order to do the adaptation logic on the current node
     * @param diffSeq diff traces generated by comparing current KevoreeCore model and given model
     * @param targetModel toDeploy model used by KevoreeCore to generate the trace
     * @returns {Array}
     */
    processTraces: function (diffSeq, targetModel) {
        return this.adaptationEngine.processTraces(diffSeq, targetModel);
    }
});

module.exports = JavascriptNode;