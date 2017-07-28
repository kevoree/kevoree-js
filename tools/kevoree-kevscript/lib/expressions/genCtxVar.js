var shortid = require('../shortid');

module.exports = function (model, expressions, expr, opts) {
	var value;
	var key = expressions[expr.children[0].type](model, expressions, expr.children[0], opts);
	if (opts.ctxVars[key]) {
		value = opts.ctxVars[key];
	} else {
		opts.ctxVars[key] = value = shortid();
	}
	return value;
};
