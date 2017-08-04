module.exports = function versionDecl(model, expressions, expr, opts) {
	if (expr.children.length > 0) {
		return expressions[expr.children[0].type](model, expressions, expr.children[0], opts);
	} else {
		return {};
	}
};
