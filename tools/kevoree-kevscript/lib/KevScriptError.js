const util = require('util');

function KevScriptError(message, pos) {
  Object.setPrototypeOf(this, KevScriptError.prototype);
  this.name = 'KevScriptError';
  this.message = message;
  this.pos = pos;
  if (typeof Error.captureStackTrace === 'function') {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = (new Error()).stack;
  }
}

util.inherits(KevScriptError, Error);

module.exports = KevScriptError;
