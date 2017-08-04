

const TYPE = 'pull';

function PullMessage() {}

PullMessage.prototype = {
  getType() {
    return TYPE;
  },

  toRaw() {
    return TYPE;
  }
};

module.exports = PullMessage;
module.exports.TYPE = TYPE;
