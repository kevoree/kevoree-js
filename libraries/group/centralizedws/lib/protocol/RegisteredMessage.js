'use strict';

const TYPE = 'registered';

function RegisteredMessage() {}

RegisteredMessage.prototype = {
  getType: function () {
    return TYPE;
  },

  toRaw: function () {
    return TYPE;
  }
};

module.exports = RegisteredMessage;
module.exports.TYPE = TYPE;
