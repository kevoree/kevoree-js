var Class         = require('pseudoclass'),
    kevoree       = require('kevoree-library').org.kevoree,
    KevoreeLogger = require('kevoree-commons').KevoreeLogger,
    async         = require('async'),
    EventEmitter  = require('events').EventEmitter;

var NAME_PATTERN = /^[\w-]+$/;

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

        this.factory = new kevoree.factory.DefaultKevoreeFactory();
        this.loader  = this.factory.createJSONLoader();
        this.compare = this.factory.createModelCompare();
        this.cloner  = this.factory.createModelCloner();

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
        this.log.debug(this.toString(), 'Destroying Kevoree platform "'+this.nodeInstance.getName()+'"...');
        if (this.nodeInstance !== null) {
            this.nodeInstance.destroy(function (err) {
                if (err) {
                    this.emitter.emit('error', err);
                } else {
                    this.emitter.emit('destroyed');
                }
            }.bind(this));
        } else {
            this.emitter.emit('error', new Error('Cannot destroy platform: node instance platform is undefined'));
        }
    },

    /**
     * Starts Kevoree Core
     * @param nodeName
     */
    start: function (nodeName) {
        if (!nodeName || nodeName.length === 0) nodeName = "node0";

        if (nodeName.match(NAME_PATTERN)) {
            this.nodeName = nodeName;
            this.currentModel = this.factory.createContainerRoot();

            var node = this.factory.createContainerNode();
            node.name = this.nodeName;
            node.started = false;
            this.currentModel.addNodes(node);

            // starting loop function
            this.intervalId = setInterval(function () {}, 1e8);

            this.log.info(this.toString(), "Platform node name: "+nodeName);

            this.emitter.emit('started');
        } else {
            this.emitter.emit('error', new Error('Platform node name must match this regex '+NAME_PATTERN.toString()));
        }
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
        if (this.intervalId !== undefined && this.intervalId !== null) {
            if (this.nodeInstance !== null) {
                this.nodeInstance.stop();
            }
            clearInterval(this.intervalId);

            this.currentModel   = null;
            this.deployModel    = null;
            this.models         = [];
            this.nodeName       = null;
            this.nodeInstance   = null;
            this.intervalId     = null;

            this.log.info(this.toString(), "Platform stopped: "+this.nodeName);
            this.emitter.emit('stopped');
        }
    },

    /**
     * Save model to hdd
     */
    saveModel: function () {
        // TODO
        this.log.warn(this.toString(), 'saveModel(): not implemented yet');
    },

    /**
     * Compare current with model
     * Get traces and call command (that can be redefined)
     *
     * @param model ContainerRoot model
     * @emit error
     * @emit deployed
     * @emit adaptationError
     * @emit rollbackError
     * @emit rollbackSucceed
     */
    deploy: function (model) {
        if (model && !model.findNodesByID(this.nodeName)) {
            this.emitter.emit('error', new Error('Deploy model failure: unable to find '+this.nodeName+' in given model'));

        } else {
            this.log.debug(this.toString(), 'Deploy process started...');
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
                            function executeCommand(cmd, iteratorCallback) {
                                // save the cmd to be processed in a stack using unshift
                                // in order to add the last processed cmd at the beginning of the array
                                // => cmdStack[0] = more recently executed cmd
                                cmdStack.unshift(cmd);

                                // execute cmd
                                cmd.execute(iteratorCallback);
                            }

                            // rollbackCommand: function that calls undo() on cmds in the stack
                            function rollbackCommand(cmd, iteratorCallback) {
                                try {
                                    cmd.undo(iteratorCallback);
                                } catch (err) {
                                    iteratorCallback(err);
                                }
                            }

                            // execute each command synchronously
                            async.eachSeries(adaptations, executeCommand, function (err) {
                                if (err) {
                                    err.message = "Something went wrong while processing adaptations.\n"+err.message;
                                    core.emitter.emit('adaptationError', err);
                                    core.log.info(core.toString(), 'Rollbacking to previous model...');

                                    // rollback process
                                    async.eachSeries(cmdStack, rollbackCommand, function (er) {
                                        if (er) {
                                            // something went wrong while rollbacking
                                            er.message = "Something went wrong while rollbacking. Process will exit.\n"+er.message;
                                            core.emitter.emit('rollbackError', er);
                                            // stop everything :/
                                            // TODO clean stop() => shouldnt process.exit()
                                            process.exit(1);
//                                            core.stop();
                                        } else {
                                            // rollback succeed
                                            core.emitter.emit('rollbackSucceed');
                                        }
                                    });

                                } else {
                                    // adaptations succeed : woot
                                    core.log.debug(core.toString(), "Model deployed successfully: "+adaptations.length+" adaptations");
                                    // save old model
                                    pushInArray(core.models, core.currentModel);
                                    // set new model to be the current deployed one
                                    core.currentModel = model; // do not give core.deployModel here because it is a readOnly model
                                    // reset deployModel
                                    core.deployModel = null;
                                    // all good :)
                                    core.emitter.emit('deployed', core.currentModel);
                                }
                            });
                        } catch (err) {
                            err.message = 'Something went wrong while deploying model.\n'+err.message;
                            core.emitter.emit('error', err);
                        }

                    } else {
                        core.emitter.emit('error', new Error("There is no instance to bootstrap on"));
                    }
                });
            } else {
                this.emitter.emit('error', new Error("Model is not defined or null. Deploy aborted."));
            }
        }
    },

    checkBootstrapNode: function (model, callback) {
        callback = callback || function () { console.warn('No callback defined for checkBootstrapNode(model, cb) in KevoreeCore'); };

        if (typeof (this.nodeInstance) === 'undefined' || this.nodeInstance === null) {
            this.log.debug(this.toString(), "Start '"+this.nodeName+"' bootstrapping...");
            this.bootstrapper.bootstrapNodeType(this.nodeName, model, function (err, AbstractNode) {
                if (err) {
                    err.message = "Unable to bootstrap '"+this.nodeName+"'! Start process aborted.";
                    callback(err);
                    return;
                }

                var node = model.findNodesByID(this.nodeName);

                this.nodeInstance = new AbstractNode();
                this.nodeInstance.setKevoreeCore(this);
                this.nodeInstance.setName(this.nodeName);
                this.nodeInstance.setPath(node.path());

                this.nodeInstance.start(function (err) {
                    if (err) {
                        callback(err);
                    } else {
                        this.log.info(this.toString(), this.nodeName+' : '+node.typeDefinition.name+'/'+node.typeDefinition.version+' successfully started');
                        callback();
                    }
                }.bind(this));
            }.bind(this));

        } else {
            callback();
        }
    },

    /**
     * Put core in readonly mode
     */
    lock: function() {
        // TODO
        this.log.warn(this.toString(), 'lock(): not implemented yet');
    },

    /**
     * Put core in read/write mode
     */
    unlock: function() {
        // TODO
        this.log.warn(this.toString(), 'unlock(): not implemented yet');
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
    },

    off: function (event, callback) {
        this.emitter.removeListener(event, callback);
    },

    once: function (event, callback) {
        this.emitter.once(event, callback);
    }
});

// utility function to ensure cached model list won't go over 10 models
var pushInArray = function pushInArray(array, model) {
    if (array.length === 10) {
        array.shift();
    }
    array.push(model);
};