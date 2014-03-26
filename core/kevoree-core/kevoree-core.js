var Class       = require('pseudoclass'),
    kLib          = require('kevoree-library'),
    KevoreeLogger = require('kevoree-commons').KevoreeLogger,
    async         = require('async'),
    EventEmitter  = require('events').EventEmitter;

/**
 * Kevoree Core
 *
 * @type {*}
 */
module.exports = Class({
    toString: 'KevoreeCore',

    /**
     * Core constructor
     */
    construct: function(modulesPath, logger) {
        this.log = (logger != undefined) ? logger : new KevoreeLogger(this.toString());

        this.factory = new kLib.org.kevoree.impl.DefaultKevoreeFactory();
        this.loader  = new kLib.org.kevoree.loader.JSONModelLoader();
        this.compare = new kLib.org.kevoree.compare.DefaultModelCompare();
        this.cloner  = new kLib.org.kevoree.cloner.DefaultModelCloner();

        this.currentModel   = null;
        this.deployModel    = null;
        this.models         = [];
        this.nodeName       = null;
        this.nodeInstance   = null;
        this.modulesPath    = modulesPath;
        this.bootstrapper   = null;
        this.intervalId     = null;
        this.uiCommand      = null;

        this.emitter = new EventEmitter();
    },

    /**
     * Destruct core instance
     */
    destruct: function() {
        this.log.debug('Destructing...');
    },

    /**
     * Starts Kevoree Core
     * @param nodeName
     */
    start: function (nodeName) {
        if (nodeName == undefined || nodeName.length == 0) nodeName = "node0";

        this.nodeName = nodeName;
        this.currentModel = this.factory.createContainerRoot();

        // starting loop function
        this.intervalId = setInterval(function () {}, 1e8);

        this.log.info(this.toString(), "Platform started: "+nodeName);

        this.emitter.emit('started');
    },

    setBootstrapper: function (bootstrapper) {
        this.bootstrapper = bootstrapper;
    },

    setUICommand: function (uiCmd) {
        this.uiCommand = uiCmd;
    },

    getBootstrapper: function () {
        return this.bootstrapper;
    },

    /**
     * Stops Kevoree Core
     */
    stop: function () {
        if (this.intervalId != undefined && this.intervalId != null) {
            if (this.nodeInstance != null) {
                this.nodeInstance.stop();
            }
            clearInterval(this.intervalId);
            this.intervalId = null;
            this.currentModel = null;

            this.log.info(this.toString(), "Platform stopped: "+this.nodeName);
            this.emitter.emit('stopped');
        }
    },

    /**
     * Save model to hdd
     */
    saveModel: function () {
        // TODO
    },

    /**
     * Compare current with model
     * Get traces and call command (that can be redefined)
     *
     * @param model
     */
    deploy: function (model) {
        if (model && !model.findNodesByID(this.nodeName)) {
            this.emitter.emit('error', new Error('Deploy model failure: unable to find '+this.nodeName+' in given model'));
            return;

        } else {
            this.log.info(this.toString(), 'Deploy process started...');
            if (model) {
                // check if there is an instance currently running
                // if not, it will try to run it
                var core = this;
                this.checkBootstrapNode(model, function (err) {
                    if (err) {
                        core.emitter.emit('error', err);
                        return;
                    }

                    if (core.nodeInstance) {
                        try {
                            // given model is defined and not null
                            core.deployModel = core.cloner.clone(model, true);
                            core.deployModel.setRecursiveReadOnly();
                            var diffSeq = core.compare.diff(core.currentModel, core.deployModel);
                            var adaptations = core.nodeInstance.processTraces(diffSeq, core.deployModel);

                            // list of adaptation commands retrieved
                            var cmdStack = [];

                            // executeCommand: function that save cmd to stack and executes it
                            var executeCommand = function executeCommand(cmd, iteratorCallback) {
                                // save the cmd to be processed in a stack using unshift
                                // in order to add the last processed cmd at the beginning of the array
                                // => cmdStack[0] = more recently executed cmd
                                cmdStack.unshift(cmd);

                                // execute cmd
                                cmd.execute(function (err) {
                                    if (err) {
                                        //core.log.error(cmd.toString(), err.message);
                                        return iteratorCallback(err);
                                    }

                                    // adaptation succeed
                                    iteratorCallback();
                                });
                            };

                            // rollbackCommand: function that calls undo() on cmds in the stack
                            var rollbackCommand = function rollbackCommand(cmd, iteratorCallback) {
                                cmd.undo(function (err) {
                                    if (err) return iteratorCallback(err);

                                    // undo succeed
                                    iteratorCallback();
                                });
                            };

                            // execute each command synchronously
                            async.eachSeries(adaptations, executeCommand, function (err) {
                                if (err) {
                                    // rollback process
                                    return async.eachSeries(cmdStack, rollbackCommand, function (er) {
                                        if (er) {
                                            // something went wrong while rollbacking
                                            er.message = "Something went wrong while rollbacking...\n"+er.message;
                                            return core.emitter.emit('error', er);
                                        }

                                        // something went wrong while processing adaptations
                                        // using Javascript magic to just change error message and keep stack
                                        err.message = "Something went wrong while processing adaptations.\n"+err.message+'\nRollbacking...';
                                        core.emitter.emit('error', err); // TODO create another error type (like adaptationError, in order to process rollback in runtimes instead of just shutting down kevoree core)
                                        // rollback succeed
                                        return core.emitter.emit('rollback');
                                    });
                                }

                                // adaptations succeed : woot
                                core.log.info(core.toString(), "Model deployed successfully.");
                                // save old model
                                pushInArray(core.models, core.currentModel);
                                // set new model to be the current deployed one
                                core.currentModel = model; // do not give core.deployModel here because it is a readOnly model
                                // reset deployModel
                                core.deployModel = null;
                                // all good :)
                                core.emitter.emit('deployed', core.currentModel);
                                return;
                            });
                        } catch (err) {
                            err.message = 'Something went wrong while deploying model.\n'+err.message;
                            core.emitter.emit('error', err);
                            return;
                        }

                    } else {
                        core.emitter.emit('error', new Error("There is no instance to bootstrap on"));
                        return;
                    }
                });
            } else {
                this.emitter.emit('error', new Error("Model is not defined or null. Deploy aborted."));
                return;
            }
        }
    },

    checkBootstrapNode: function (model, callback) {
        callback = callback || function () { console.warn('No callback defined for checkBootstrapNode(model, cb) in KevoreeCore'); };

        if (this.nodeInstance == undefined || this.nodeInstance == null) {
            this.log.info(this.toString(), "Start '"+this.nodeName+"' bootstrapping...");
            this.bootstrapper.bootstrapNodeType(this.nodeName, model, function (err, AbstractNode) {
                if (err) {
                    err.message = "Unable to bootstrap '"+this.nodeName+"'! Start process aborted.";
                    return callback(err);
                }

                var nodePath = model.findNodesByID(this.nodeName).path();

                this.nodeInstance = new AbstractNode();
                this.nodeInstance.setKevoreeCore(this);
                this.nodeInstance.setName(this.nodeName);
                this.nodeInstance.setPath(nodePath);

                // inflate dictionary with defaultValues
//        var kDictionary = model.findTypeDefinitionsByID(this.nodeInstance.toString()+'/'+this.nodeInstance.getVersion()).dictionaryType;
//
//        var defaultValues = kDictionary.defaultValues.iterator();
//        var dictionary = this.nodeInstance.getDictionary();
//
//        while (defaultValues.hasNext()) {
//          var defaultVal = defaultValues.next();
//          dictionary.setEntry(defaultVal.attribute.name, defaultVal.value);
//        }

                this.nodeInstance.start();

                this.log.info(this.toString(), "'"+this.nodeName+"' instance started successfully");

                return callback();
            }.bind(this));

        } else {
            return callback();
        }
    },

    /**
     * Put core in readonly mode
     */
    lock: function() {
        // TODO
    },

    /**
     * Put core in read/write mode
     */
    unlock: function() {
        // TODO
    },

    getCurrentModel: function () {
        return this.currentModel;
    },

    getPreviousModel: function () {
        var model = null;
        if (this.models.length > 0) model = this.models[this.models.length-1];
        return model;
    },

    getPreviousModels: function () {
        return this.models;
    },

    getModulesPath: function () {
        return this.modulesPath;
    },

    getDeployModel: function () {
        return this.deployModel;
    },

    getNodeName: function () {
        return this.nodeName;
    },

    getUICommand: function () {
        return this.uiCommand;
    },

    getLogger: function () {
        return this.log;
    },

    on: function (event, callback) {
        this.emitter.addListener(event, callback);
    }
});

// utility function to ensure cached model list won't go over 10 items
var pushInArray = function pushInArray(array, model) {
    if (array.length == 10) array.shift();
    array.push(model);
}

// utility function to know if a model is currently already in the array
var containsModel = function containsModel(array, model) {
    return (array.indexOf(model) > -1);
}