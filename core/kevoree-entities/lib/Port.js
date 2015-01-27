var Class = require('pseudoclass');

/**
 * Port
 * You are not supposed to create Port object (unless you are an AdaptationPrimitive)
 *
 * @class
 */
var Port = Class({
    toString: 'Port',

    /**
     *
     * @param name
     * @param path
     *
     * @constructs
     */
    construct: function (name, path) {
        this.name                = name;
        this.path                = path;
        this.component           = null;
        this.channel             = null;
        this.inputPortMethodName = null;
    },

    processSend: function (msg, callback) {
        this.channel.internalSend(this.path, msg, callback);
    },

    setInputPortMethodName: function (name) {
        this.inputPortMethodName = name;
    },

    getInputPortMethodName: function () {
        return this.inputPortMethodName;
    },

    getName: function () {
        return this.name;
    },

    getPath: function () {
        return this.path;
    },

    setComponent: function (comp) {
        this.component = comp;
    },

    getComponent: function () {
        return this.component;
    },

    setChannel: function (chan) {
        this.channel = chan;
    }
});

module.exports = Port;