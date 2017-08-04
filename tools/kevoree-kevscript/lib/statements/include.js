module.exports = (model, expressions, stmt, opts) => {
	opts.warnings.push({
		message: '"include" statement is deprecated',
		pos: stmt.pos
	});
};
