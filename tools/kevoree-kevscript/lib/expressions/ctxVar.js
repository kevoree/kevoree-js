const KevScriptError = require('../KevScriptError');
const shortid = require('../shortid');

module.exports = function ctxVar(model, expressions, expr, opts) {
	let value;
	const ctxVarKey = expressions[expr.children[0].type](model, expressions, expr.children[0]);
	if (opts.ignoreCtxVars) {
		// we should ignore undefined ctxVars
		if (opts.ctxVars[ctxVarKey]) {
			// take the value if there is one
			value = opts.ctxVars[ctxVarKey];
		} else {
			// if there is no value => generate one to bypass error
			value = 'ignore_' + shortid(3);
			opts.ctxVars[ctxVarKey] = value;
		}
	} else {
		if (opts.ctxVars[ctxVarKey]) {
			value = opts.ctxVars[ctxVarKey];
		} else {
			throw new KevScriptError('Missing value for context variable %' + ctxVarKey + '%', expr.pos);
		}
	}

	return value;
};
