module.exports = function versionLines(model, expressions, expr, opts) {
	const versions = {};
	expr.children.forEach((child) => {
		const version = expressions[child.type](model, expressions, child, opts);
		versions[version.key] = version.value;
	});
	return versions;
};
