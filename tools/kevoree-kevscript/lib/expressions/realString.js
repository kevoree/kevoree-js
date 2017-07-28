module.exports = function (model, expressions, expr, opts) {
	var str = '';
	for (var i in expr.children) {
		if (typeof (expr.children[i]) === 'string') {
			str += expr.children[i];
		} else if (expr.children[i] instanceof Object) {
			str += expressions[expr.children[i].type](model, expressions, expr.children[i], opts);
		}
	}
	return str;
};
