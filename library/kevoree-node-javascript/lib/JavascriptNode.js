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

    start: function () {
        this._super();
        this.adaptationEngine.setLogger(this.getKevoreeCore().getLogger());
        var logLevel = this.dictionary.getValue('logLevel') || this.dic_logLevel.defaultValue;
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
    },

    /**
     * Called when the host node has to start an hosted subNode
     * @param node the hosted subNode
     */
    startSubNode: function (node) {
        this._super();
        this.log.warn(this.toString(), 'startSubNode(): not implemented yet');

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
     */
    stopSubNode: function (node) {
        this._super();
        this.log.warn(this.toString(), 'stopSubNode(): not implemented yet');
    },

    /**
     * Called when the host node has to remove an hosted subNode instance
     * @param node the hosted subNode
     */
    removeSubNode: function (node) {
        this._super();
        this.log.warn(this.toString(), 'removeSubNode(): not implemented yet');
    },

    stop: function () {
        this._super();
        // TODO improve that, this is not a "stop" this is a complete "destroy"
        // clone current model
        var factory = new kevoree.factory.DefaultKevoreeFactory();
        var cloner = factory.createModelCloner();
        var emptyNodeModel = cloner.clone(this.getKevoreeCore().getCurrentModel(), false);
        var node = emptyNodeModel.findNodesByID(this.getName());
        if (node) {
            // delete everything from cloned model that is related to this node
            node.delete();

            // re-add this "empty" node to the cloned model
            node = factory.createContainerNode();
            node.name = this.getName();

            // compare emptyNodeModel with currentModel in order to create primitives for this platform fragments stops
            var compare = factory.createModelCompare();
            var diffSeq = compare.diff(this.getKevoreeCore().getCurrentModel(), emptyNodeModel);
            var primitives = this.processTraces(diffSeq, emptyNodeModel);

            function execPrimitive(primitive, cb) {
                primitive.execute(cb);
            }

            async.eachSeries(primitives, execPrimitive, function (err) {
                if (err) {
                    // something went wrong while stopping node
                    this.log.error(this.toString(), 'Something went wrong while stopping '+this.getName());
                }
            }.bind(this));
        }
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