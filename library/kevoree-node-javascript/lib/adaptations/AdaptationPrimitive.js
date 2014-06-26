var Class   = require('pseudoclass'),
    Kotlin = require('kevoree-kotlin'),
    kevoree = require('kevoree-library').org.kevoree,
    KevoreeLogger = require('kevoree-commons').KevoreeLogger;

/**
 * Abstract AdaptationPrimitive command
 *
 * @param node JavascriptNode context
 * @param mapper ModelObjectMapper that handles mapping betweend model objects and 'real-life' object
 * @type {AdaptationPrimitive}
 */
module.exports = Class({
    toString: 'AdaptationPrimitive',

    /**
     * Construct an AdaptationPrimitive object
     *
     * @param node KevoreeNode platform
     * @param mapper ModelObjectMapper
     * @param model model to deploy (that triggers adaptations)
     * @param modelElement model element linked with this primitive
     */
    construct: function (node, mapper, model, modelElement) {
        this.node = node;
        this.mapper = mapper;
        this.adaptModel = model;
        this.modelElement = modelElement;
        this.log = this.node.getKevoreeCore().getLogger();
    },

    /**
     * Executes adaptation primitive logics
     * @param callback Function(err, [args]) if 'err' is defined => something went wrong
     */
    execute: function (callback) {
        if (callback == undefined || callback == null || typeof(callback) != 'function') {
            throw new Error("Execute method need a callback function as last parameter");
        }
    },

    /**
     * Undo the process done by execute()
     */
    undo: function (callback) {
        if (callback == undefined || callback == null || typeof(callback) != 'function') {
            throw new Error("Undo method need a callback function as last parameter");
        }
    }
});