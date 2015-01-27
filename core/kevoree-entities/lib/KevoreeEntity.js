var Class       = require('pseudoclass'),
    Dictionary  = require('./Dictionary'),
    KevScript   = require('kevoree-kevscript');

/**
 * Abstract class: KevoreeEntity
 * <br/>
 * You are not supposed to instantiate this class manually. It makes no sense
 * <br/>
 * You should create your own Kevoree entity that extend one of the defined abstraction type:
 * <ul>
 *     <li>AbstractNode</li>
 *     <li>AbstractGroup</li>
 *     <li>AbstractChannel</li>
 *     <li>AbstractComponent</li>
 * </ul>
 * All this sub-classes extend KevoreeEntity in order to have the same basic prototype
 *
 * @class
 */
var KevoreeEntity = Class({
    toString: 'KevoreeEntity',

    /**
     * @constructs
     */
    construct: function () {
        this.kCore = null;
        this.dictionary = new Dictionary(this);
        this.name = null;
        this.path = null;
        this.nodeName = null;
        this.started = false;
        this.queue = [];
    },

    /**
     * Called when an entity has to start
     * @param done
     */
    start: function (done) {
        done();
    },

    /**
     * Called when an entity has to stop
     * @param done
     */
    stop: function (done) {
        done();
    },

    /**
     * Called when a attribute has been changed (this method is called after all attribute-specific update() method)
     * @param done
     */
    update: function (done) {
        done();
    },

    __start__: function (done) {
        this.log = this.kCore.getLogger();
        this.started = true;
        this.start(done);
    },

    __stop__: function (done) {
        this.started = false;
        this.stop(done);
    },

    __update__: function (done) {
        this.update(done);
    },

    setKevoreeCore: function (kCore) {
        this.kCore = kCore;
    },

    /**
     *
     * @returns {Object}
     */
    getKevoreeCore: function () {
        return this.kCore;
    },

    getDictionary: function () {
        return this.dictionary;
    },

    getName: function () {
        return this.name;
    },

    getNodeName: function () {
        return this.nodeName;
    },

    setName: function (name) {
        this.name = name;
    },

    setPath: function (path) {
        this.path = path;
    },

    getPath: function () {
        return this.path;
    },

    setNodeName: function (name) {
        this.nodeName = name;
    },

    /**
     * Tries to retrieve this Kevoree entity from deployModel first.
     * If deployModel is null (meaning that we are in a deployed-state and not in a deploying-state)
     * it tries to retrieve this Kevoree entity from currentModel.
     * @returns {*}
     */
    getModelEntity: function () {
        var model = this.kCore.getDeployModel();
        if (!model) {
            model = this.kCore.getCurrentModel();
        }
        return model.findByPath(this.path);
    },

    getNetworkInfos: function (nodeName) {
        var model = this.kCore.getDeployModel();
        if (!model) {
            this.kCore.getCurrentModel();
        }
        var node = model.findNodesByID(nodeName);
        if (node) {
            return node.networkInformation.iterator();
        } else {
            return null;
        }
    },

    isStarted: function () {
        return this.started;
    },

    /**
     * Executes script with current model context. If callback parameter is set,
     * it means something went wrong and the parameter is the error object.
     * NB: scripts submitted while in "deploying" state are queued and executed after.
     * @param script KevScript string
     * @param [callback] function (err)
     */
    submitScript: function (script, callback) {
        callback = callback || function () {};

        if (this.kCore.getDeployModel() === null) {
            // not in "deploying state"
            var kevs = new KevScript({
                resolvers: { npm: this.kCore.getBootstrapper().resolver } // refactor according to #26
            });
            kevs.parse(script, this.kCore.getCurrentModel(), function (err, model) {
                if (err) {
                    var e = new Error('KevScript submission failed ('+err.message+')');
                    callback(e);
                    return;
                }

                var deployHandler, errHandler, adaptHandler;
                deployHandler = function () {
                    this.kCore.off('error', errHandler);
                    this.kCore.off('adaptationError', adaptHandler);
                    callback();
                }.bind(this);
                errHandler = function (err) {
                    this.kCore.off('deployed', deployHandler);
                    this.kCore.off('adaptationError', adaptHandler);
                    var e = new Error('KevScript submission failed ('+err.message+')');
                    callback(e);
                }.bind(this);
                adaptHandler = function (err) {
                    this.kCore.off('error', errHandler);
                    this.kCore.off('deployed', deployHandler);
                    var e = new Error('KevScript submission failed ('+err.message+')');
                    callback(e);
                }.bind(this);

                this.kCore.once('deployed', deployHandler);
                this.kCore.once('error', errHandler);
                this.kCore.once('adaptationError', adaptHandler);

                this.kCore.deploy(model);
            }.bind(this));
        } else {
            // in "deploying state" => need to queue request to process it afterwards
            this.queue.push({script: script, callback: callback});
            this.log.debug(this.toString(), 'Script added to queue..');
            //callback(new Error('KevScript submission failed (unable to submit script when a model is currently deployed)'));
        }
    },

    /**
     * Called when a model has been successfully deployed
     */
    onModelDeployed: function () {
        if (this.queue.length > 0) {
            // create a KevScript engine
            var kevs = new KevScript();

            // retrieve first queued script
            var item = this.queue[0];
            // remove first queued script from the queue
            this.queue.splice(0, 1);
            // execute first queued script
            kevs.parse(item.script, this.kCore.getCurrentModel(), function (err, model) {
                if (err) {
                    // queued script submission failed
                    var e = new Error('KevScript submission failed ('+err.message+')');
                    item.callback(e);

                } else {
                    // queued script submission succeed
                    var deployHandler, errHandler, adaptHandler;
                    deployHandler = function () {
                        this.kCore.off('error', errHandler);
                        this.kCore.off('adaptationError', adaptHandler);
                        item.callback();
                    }.bind(this);
                    errHandler = function (err) {
                        this.kCore.off('deployed', deployHandler);
                        this.kCore.off('adaptationError', adaptHandler);
                        var e = new Error('KevScript submission failed ('+err.message+')');
                        item.callback(e);
                    }.bind(this);
                    adaptHandler = function (err) {
                        this.kCore.off('error', errHandler);
                        this.kCore.off('deployed', deployHandler);
                        var e = new Error('KevScript submission failed ('+err.message+')');
                        item.callback(e);
                    }.bind(this);

                    this.kCore.once('deployed', deployHandler);
                    this.kCore.once('error', errHandler);
                    this.kCore.once('adaptationError', adaptHandler);

                    this.kCore.deploy(model);
                }
            }.bind(this));
        }
    }
});

KevoreeEntity.DIC = 'dic_';
module.exports = KevoreeEntity;