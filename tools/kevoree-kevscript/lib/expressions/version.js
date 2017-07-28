module.exports = function (model, expressions, expr, opts) {
	var tdefVers = expressions[expr.children[0].type](model, expressions, expr.children[0], opts);
	var duVers = 'RELEASE';

	if (expr.children.length === 2) {
		duVers = expressions[expr.children[1].type](model, expressions, expr.children[1], opts);
	}

	return {
		tdef: tdefVers,
		du: duVers
	};
};
