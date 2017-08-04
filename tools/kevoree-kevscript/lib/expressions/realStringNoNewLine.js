module.exports = function realStringNoNewLine(model, expressions, expr) {
	return expr.children.join('');
};
