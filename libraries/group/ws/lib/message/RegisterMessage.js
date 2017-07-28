'use strict';

var Protocol = require('./../Protocol');

function RegisterMessage(nodeName, model) {
    this.nodeName = nodeName;
    this.model = model;
}

RegisterMessage.prototype = {
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
};

module.exports = RegisterMessage;
