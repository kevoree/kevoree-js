var Class       = require('pseudoclass'),
    Dictionary  = require('./Dictionary'),
    KevScript   = require('kevoree-kevscript');

/**
 * Abstract class: KevoreeEntity
 * You are not supposed to instantiate this class manually. It makes no sense
 * You should create your own Kevoree entity that extend one of the defined abstraction type:
 * <ul>
 *     <li>AbstractNode</li>
 *     <li>AbstractGroup</li>
 *     <li>AbstractChannel</li>
 *     <li>AbstractComponent</li>
 * </ul>
 * All this sub-classes extend KevoreeEntity in order to have the same basic prototype
 * Each KevoreeEntity can declare a KevoreeDictionary by adding new properties to their class:
 * dic_myAttr: {
 *   optional: true,
 *   defaultValue: 'foo',
 *   fragmentDependant: false,
 *   update: function (oldValue) {
 *     // do something when attribute is updated
 *   }
 * }
 * KevoreeDictionary API follows those guidelines:
 * <ul>
 *   <li>"optional" attribute is <b>optional</b>, <b>boolean</b> (default: true)</li>
 *   <li>"defaultValue" attribute is <b>optional</b>, <b>string|boolean</b></li>
 *   <li>"fragmentDependant" attribute is <b>optional</b>, <b>boolean</b> (default: false)</li>
 *   <li>"update" attribute is <b>optional</b>, <b>function</b>(oldAttributeValue)</li>
 * </ul>
 *
 * Once your entity is started, you will be able to retrieve your attribute value by calling dic_myAttr.value
 *
 * @type {KevoreeEntity}
 */
var KevoreeEntity = Class({
    toString: 'KevoreeEntity',

    construct: function () {
        this.kCore = null;
        this.dictionary = new Dictionary(this);
        this.name = null;
        this.path = null;
        this.nodeName = null;
        this.started = false;
    },

    /**
     * Called when an entity has to start
     * @param done
     */
    start: function (done) {
        this.log = this.kCore.getLogger();
        this.started = true;
        done();
    },

    /**
     * Called when an entity has to stop
     * @param done
     */
    stop: function (done) {
        this.started = false;
        done();
    },

    /**
     * Called when a attribute has been changed (this method is called after all attribute-specific update() method)
     * @param done
     */
    update: function (done) {
        done();
    },

    /**
     * Called before entity is removed from node host
     * @param done
     */
    destroy: function (done) {
        done();
    },

    setKevoreeCore: function (kCore) {
        this.kCore = kCore;
    },

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
        return node.networkInformation.iterator();
    },

    isStarted: function () {
        return this.started;
    },

    /**
     * Executes script with current model context. If callback parameter is set,
     * it means something went wrong and the parameter is the error object.
     * NB: you cannot use this method while in "deploying" state.
     * @param script KevScript string
     * @param [callback] function (err)
     */
    submitScript: function (script, callback) {
        callback = callback || function () {};

        if (this.kCore.getDeployModel() === null) {
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
            callback(new Error('KevScript submission failed (unable to submit script when a model is currently deployed)'));
        }
    }
});

KevoreeEntity.DIC = 'dic_';
module.exports = KevoreeEntity;