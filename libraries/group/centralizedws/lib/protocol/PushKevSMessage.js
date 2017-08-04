

const TYPE = 'kevs';

function PushKevSMessage(kevs) {
  this.kevs = kevs;
}

PushKevSMessage.prototype = {
  getKevScript() {
    return this.kevs;
  },

  getType() {
    return TYPE;
  },

  toRaw() {
    return TYPE + '/' + this.kevs;
  }
};

module.exports = PushKevSMessage;
module.exports.TYPE = TYPE;
