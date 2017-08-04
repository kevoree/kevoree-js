

const TYPE = 'push';

function PushMessage(model) {
  this.model = model;
}

PushMessage.prototype = {
  getModel() {
    return this.model;
  },

  getType() {
    return TYPE;
  },

  toRaw() {
    return TYPE + '/' + this.model;
  }
};

module.exports = PushMessage;
module.exports.TYPE = TYPE;
