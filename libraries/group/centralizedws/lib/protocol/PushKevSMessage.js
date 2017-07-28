'use strict';

var TYPE = 'kevs';

function PushKevSMessage(kevs) {
  this.kevs = kevs;
}

PushKevSMessage.prototype = {
  getKevScript: function () {
      return this.kevs;
  },

  getType: function () {
      return TYPE;
  },

  toRaw: function () {
      return TYPE + '/' + this.kevs;
  }
};

module.exports = PushKevSMessage;
module.exports.TYPE = TYPE;
