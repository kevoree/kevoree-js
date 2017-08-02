'use strict';

const TYPE = 'register';

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
    return TYPE;
  },

  toRaw: function () {
    return TYPE + '/' + this.nodeName + '/' + this.model;
  }
};

module.exports = RegisterMessage;
module.exports.TYPE = TYPE;
