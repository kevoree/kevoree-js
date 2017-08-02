'use strict';

const TYPE = 'push';

function PushMessage(model) {
  this.model = model;
}

PushMessage.prototype = {
  getModel: function () {
    return this.model;
  },

  getType: function () {
    return TYPE;
  },

  toRaw: function () {
    return TYPE + '/' + this.model;
  }
};

module.exports = PushMessage;
module.exports.TYPE = TYPE;
