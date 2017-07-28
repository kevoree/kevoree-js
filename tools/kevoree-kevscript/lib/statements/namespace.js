'use strict';

module.exports = function (model, expressions, stmt, opts) {
	opts.warnings.push({
		message: '"namespace" statement is deprecated',
		pos: stmt.pos
	});
};
