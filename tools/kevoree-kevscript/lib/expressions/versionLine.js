module.exports = function versionLine(model, expressions, expr, opts) {
	return {
		key: expressions[expr.children[0].type](model, expressions, expr.children[0], opts),
		value: expressions[expr.children[1].type](model, expressions, expr.children[1], opts)
	};
};
