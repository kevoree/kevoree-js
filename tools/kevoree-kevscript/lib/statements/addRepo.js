module.exports = (model, expressions, stmt, opts) => {
	return Promise.resolve().then(() => {
		opts.warnings.push({
			message: '"repo" statement is deprecated',
			pos: stmt.pos
		});
	});
};
