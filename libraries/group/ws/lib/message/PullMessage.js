'use strict';

var Protocol = require('./../Protocol');

function PullMessage() {}

PullMessage.prototype = {
  getType: function () {
      return Protocol.PULL_TYPE;
  },

  toRaw: function () {
      return Protocol.PULL;
  }
};

module.exports = PullMessage;
