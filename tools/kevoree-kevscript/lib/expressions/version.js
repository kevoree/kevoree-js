module.exports = function version(model, expressions, expr, opts) {
	const tdefVers = expressions[expr.children[0].type](model, expressions, expr.children[0], opts);
	let duVers = 'RELEASE';

	if (expr.children.length === 2) {
		duVers = expressions[expr.children[1].type](model, expressions, expr.children[1], opts);
	}

	return {
		tdef: tdefVers,
		du: duVers
	};
};
