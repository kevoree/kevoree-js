'use strict';

var Protocol = require('./../Protocol');

function PushKevSMessage(kevs) {
  this.kevs = kevs;
}

PushKevSMessage.prototype = {
  getKevScript: function () {
      return this.kevs;
  },

  getType: function () {
      return Protocol.KEVS_TYPE;
  },

  toRaw: function () {
      return Protocol.KEVS + Protocol.SEP + this.kevs;
  }
};

module.exports = PushKevSMessage;
