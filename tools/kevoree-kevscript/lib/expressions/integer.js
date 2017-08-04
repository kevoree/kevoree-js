module.exports = function integer(model, expressions, expr) {
	return parseInt(expr.children.join(''), 10);
};
