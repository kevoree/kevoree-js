// Created by leiko on 02/10/14 15:39
var Class = require('pseudoclass');
var Protocol = require('./../Protocol');

var PushMessage = Class({
    toString: 'PushMessage',

    construct: function (model) {
        this.model = model;
    },

    getModel: function () {
        return this.model;
    },

    getType: function () {
        return Protocol.PUSH_TYPE;
    },

    toRaw: function () {
        return Protocol.PUSH + Protocol.SEP + this.model;
    }
});

module.exports = PushMessage;