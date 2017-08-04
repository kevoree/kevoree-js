

const TYPE = 'register';

function RegisterMessage(nodeName, model) {
  this.nodeName = nodeName;
  this.model = model;
}

RegisterMessage.prototype = {
  getNodeName() {
    return this.nodeName;
  },

  getModel() {
    return this.model;
  },

  getType() {
    return TYPE;
  },

  toRaw() {
    return TYPE + '/' + this.nodeName + '/' + this.model;
  }
};

module.exports = RegisterMessage;
module.exports.TYPE = TYPE;
