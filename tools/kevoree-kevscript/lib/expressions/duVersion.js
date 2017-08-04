module.exports = function duVersion(model, expressions, expr, opts) {
	return expressions[expr.children[0].type](model, expressions, expr.children[0], opts);
};
