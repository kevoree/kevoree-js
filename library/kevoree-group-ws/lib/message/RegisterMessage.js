// Created by leiko on 02/10/14 15:39
var Class = require('pseudoclass');
var Protocol = require('./../Protocol');

var RegisterMessage = Class({
    toString: 'RegisterMessage',

    construct: function (nodeName, model) {
        this.nodeName = nodeName;
        this.model = model;
    },

    getNodeName: function () {
        return this.nodeName;
    },

    getModel: function () {
        return this.model;
    },

    getType: function () {
        return Protocol.REGISTER_TYPE;
    },

    toRaw: function () {
        return Protocol.REGISTER + Protocol.SEP + this.nodeName + Protocol.SEP + this.model;
    }
});

module.exports = RegisterMessage;