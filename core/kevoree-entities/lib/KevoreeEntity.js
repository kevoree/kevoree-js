var Class       = require('pseudoclass'),
    Dictionary  = require('./Dictionary');

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

    start: function () {
        this.log = this.kCore.getLogger();
        this.started = true;
    },

    stop: function () {
        this.started = false;
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

    getModelEntity: function () {
        return this.kCore.getDeployModel().findByPath(this.path);
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
    }
});

KevoreeEntity.DIC = 'dic_';
module.exports = KevoreeEntity;