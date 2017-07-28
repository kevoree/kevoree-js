module.exports = function (model, expressions, stmt, opts) {
	return Promise.resolve().then(function () {
		opts.warnings.push({
			message: '"repo" statement is deprecated',
			pos: stmt.pos
		});
	});
};
