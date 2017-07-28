'use strict';

var TYPE = 'pull';

function PullMessage() {}

PullMessage.prototype = {
  getType: function () {
      return TYPE;
  },

  toRaw: function () {
      return TYPE;
  }
};

module.exports = PullMessage;
module.exports.TYPE = TYPE;
