

const TYPE = 'registered';

function RegisteredMessage() {}

RegisteredMessage.prototype = {
  getType() {
    return TYPE;
  },

  toRaw() {
    return TYPE;
  }
};

module.exports = RegisteredMessage;
module.exports.TYPE = TYPE;
