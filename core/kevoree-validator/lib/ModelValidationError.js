'use strict';

var util = require('util');

function ModelValidationError(message, path) {
  Error.captureStackTrace(this, this.constructor);
  this.name = 'ModelValidationError';
  this.message = message;
	if (path) {
		this.path = path;
	}
}

util.inherits(ModelValidationError, Error);

module.exports = ModelValidationError;
