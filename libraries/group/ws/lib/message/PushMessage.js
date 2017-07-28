'use strict';

var Protocol = require('./../Protocol');

function PushMessage(model) {
    this.model = model;
}

PushMessage.prototype = {
  getModel: function () {
      return this.model;
  },

  getType: function () {
      return Protocol.PUSH_TYPE;
  },

  toRaw: function () {
      return Protocol.PUSH + Protocol.SEP + this.model;
  }
};

module.exports = PushMessage;
