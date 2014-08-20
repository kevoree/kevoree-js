var AbstractNode        = require('kevoree-entities').AbstractNode,
    KevoreeLogger       = require('kevoree-commons').KevoreeLogger,
    AdaptationEngine    = require('./AdaptationEngine'),
    kevoree             = require('kevoree-library').org.kevoree,
    async               = require('async');
//    spawn               = require('child_process').spawn,
//    KevoreeRuntime      = require('kevoree-nodejs-runtime'),
//    fs                  = require('fs'),
//    os                  = require('os'),
//    path                = require('path');

var JavascriptNode = AbstractNode.extend({
    toString: 'JavascriptNode',

    dic_logLevel: {
        defaultValue: 'DEBUG',
        optional: false,
        update: function (value) {
            switch (value.toLowerCase().trim()) {
                case 'all':
                    this.log.setLevel(KevoreeLogger.ALL);
                    break;

                default:
                case 'debug':
                    this.log.setLevel(KevoreeLogger.DEBUG);
                    break;

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
    },

    dic_logFilter: {
        optional: true,
        update: function (value) {
            this.log.setFilter(value);
        }
    },

    construct: function () {
        this.adaptationEngine = new AdaptationEngine(this);
    },

    start: function (done) {
        this._super(function () {
            this.adaptationEngine.setLogger(this.log);
            var logLevel = this.dictionary.getValue('logLevel') || this.dic_logLevel.defaultValue;
            switch (logLevel.toLowerCase().trim()) {
                case 'all':
                    this.log.setLevel(KevoreeLogger.ALL);
                    break;

                default:
                case 'debug':
                    this.log.setLevel(KevoreeLogger.DEBUG);
                    break;

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

            done();
        }.bind(this));
    },

    stop: function (done) {
        this._super(function () {
            this.log.warn(this.toString(), 'stop(): not implemented');
            done();
        }.bind(this));
    },

    destroy: function (done) {
        this._super(function () {
            this.log.warn(this.toString(), 'destroy(): not implemented');
            done();
        }.bind(this));
    },

    /**
     * Called when the host node has to start an hosted subNode
     * @param node the hosted subNode
     * @param done
     */
    startSubNode: function (node, done) {
        this._super(node, function () {
            this.log.warn(this.toString(), 'startSubNode(): not implemented yet');
            done();
        }.bind(this));

//        var modelPath = path.resolve(os.tmpdir(), 'kevoree_tmp.json');
//        var factory = new kevoree.factory.DefaultKevoreeFactory();
//        var serializer = factory.createJSONSerializer();
//        fs.writeFile(modelPath, serializer.serialize(this.getKevoreeCore().getDeployModel()), function (err) {
//            if (err) {
//                throw err;
//            }
//
//            var runtimePath = path.resolve(__dirname, '..', 'node_modules', 'kevoree-nodejs-runtime', 'cli.js');
//            var child = spawn(process.execPath+' '+runtimePath, ['-n', node.name, '-m', modelPath], {stdio: 'inherit'});
//
////            child.stdout.on('data', function (data) {
////                process.stdout.write(node.name+'\t'+data);
////            });
////            child.stderr.on('data', function (data) {
////                process.stderr.write(node.name+'\t'+data);
////            });
//            child.on('close', function (code) {
//                this.log.info(this.toString(), 'Child '+node.name+' exited with code '+code);
//            }.bind(this));
//        }.bind(this));
    },

    /**
     * Called when the host node has to stop an hosted subNode
     * @param node the hosted subNode
     * @param done
     */
    stopSubNode: function (node, done) {
        this._super(node, function () {
            this.log.warn(this.toString(), 'stopSubNode(): not implemented yet');
            done();
        }.bind(this));
    },

    /**
     * Called when the host node has to destroy an hosted subNode instance
     * @param node the hosted subNode
     * @param done
     */
    destroySubNode: function (node, done) {
        this._super(node, function () {
            this.log.warn(this.toString(), 'destroySubNode(): not implemented yet');
            done();
        }.bind(this));
    },

    /**
     * Called when the host node has to remove an hosted subNode instance
     * @param node the hosted subNode
     * @param done
     */
    removeSubNode: function (node, done) {
        this._super(node, function () {
            this.log.warn(this.toString(), 'removeSubNode(): not implemented yet');
            done();
        }.bind(this));
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