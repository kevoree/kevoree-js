var AbstractNode     = require('kevoree-entities').AbstractNode,
    KevoreeLogger    = require('kevoree-commons').KevoreeLogger,
    AdaptationEngine = require('./AdaptationEngine'),
    kevoree          = require('kevoree-library').org.kevoree;

var JavascriptNode = AbstractNode.extend({
    toString: 'JavascriptNode',

    dic_logLevel:   { defaultValue: 'INFO', optional: false },

    construct: function () {
        this.adaptationEngine = new AdaptationEngine(this);
    },

    start: function (done) {
        this.dictionary.on('logLevel', this.updateLogLevel);
        this.updateLogLevel();
        done();
    },

    /**
     * Called when the host node has to start an hosted subNode
     * @param node the hosted subNode
     * @param done
     */
    startSubNode: function (node, done) {
        this.log.warn(this.toString(), 'startSubNode(): not implemented yet');
        done();
    },

    /**
     * Called when the host node has to stop an hosted subNode
     * @param node the hosted subNode
     * @param done
     */
    stopSubNode: function (node, done) {
        this.log.warn(this.toString(), 'stopSubNode(): not implemented yet');
        done();
    },

    /**
     * Called when the host node has to destroy an hosted subNode instance
     * @param node the hosted subNode
     * @param done
     */
    destroySubNode: function (node, done) {
        this.log.warn(this.toString(), 'destroySubNode(): not implemented yet');
        done();
    },

    /**
     * Called when the host node has to remove an hosted subNode instance
     * @param node the hosted subNode
     * @param done
     */
    removeSubNode: function (node, done) {
        this.log.warn(this.toString(), 'removeSubNode(): not implemented yet');
        done();
    },

    /**
     * Process traces in order to do the adaptation logic on the current node
     * @param diffSeq diff traces generated by comparing current KevoreeCore model and given model
     * @param targetModel toDeploy model used by KevoreeCore to generate the trace
     * @returns {Array}
     */
    processTraces: function (diffSeq, targetModel) {
        return this.adaptationEngine.processTraces(diffSeq, targetModel);
    },

    updateLogLevel: function () {
        var logLevel = this.dictionary.getString('logLevel', this.dic_logLevel.defaultValue);
        switch (logLevel.toLowerCase().trim()) {
            case 'all':
                this.log.setLevel(KevoreeLogger.ALL);
                break;

            case 'debug':
                this.log.setLevel(KevoreeLogger.DEBUG);
                break;

            default:
            case 'info':
                this.log.setLevel(KevoreeLogger.INFO);
                break;

            case 'error':
                this.log.setLevel(KevoreeLogger.ERROR);
                break;

            case 'warn':
                this.log.setLevel(KevoreeLogger.WARN);
                break;
        }
    }
});

module.exports = JavascriptNode;