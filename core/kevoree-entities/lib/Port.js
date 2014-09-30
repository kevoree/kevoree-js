var Class = require('pseudoclass');

/**
 * You are not supposed to create Port object (unless you are an AdaptationPrimitive)
 * @type {Port}
 */
var Port = Class({
    toString: 'Port',

    construct: function (name, path) {
        this.name                = name;
        this.path                = path;
        this.component           = null;
        this.channel             = null;
        this.inputPortMethodName = null;
    },

    processSend: function (msg) {
        this.channel.internalSend(this.path, msg);
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