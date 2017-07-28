module.exports = function typeDef(model, expressions, expr, opts) {
	var fqn = expressions[expr.children[0].type](model, expressions, expr.children[0], opts);

	var version;
	if (expr.children[1]) {
		version = expressions[expr.children[1].type](model, expressions, expr.children[1], opts);
		fqn.version = version;
	}

	return fqn;
};
