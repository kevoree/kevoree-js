// Created by leiko on 02/10/14 15:39
var Class = require('pseudoclass');
var Protocol = require('./../Protocol');

var PullMessage = Class({
    toString: 'PullMessage',

    getType: function () {
        return Protocol.PULL_TYPE;
    },

    toRaw: function () {
        return Protocol.PULL;
    }
});

module.exports = PullMessage;