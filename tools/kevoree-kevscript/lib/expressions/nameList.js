module.exports = function (model, expressions, expr, opts) {
	return expr.children.map(function (expr) {
		return expressions[expr.type](model, expressions, expr, opts);
	});
};
