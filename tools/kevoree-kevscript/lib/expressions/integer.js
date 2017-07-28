module.exports = function (model, expressions, expr) {
	return parseInt(expr.children.join(''), 10);
};
