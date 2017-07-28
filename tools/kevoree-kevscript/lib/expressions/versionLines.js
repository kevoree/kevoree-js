module.exports = function (model, expressions, expr, opts) {
	var versions = {};
	expr.children.forEach(function (child) {
		var version = expressions[child.type](model, expressions, child, opts);
		versions[version.key] = version.value;
	});
	return versions;
};
