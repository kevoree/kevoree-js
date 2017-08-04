module.exports = function nameList(model, expressions, expr, opts) {
	return expr.children.map((expr) => {
		return expressions[expr.type](model, expressions, expr, opts);
	});
};
