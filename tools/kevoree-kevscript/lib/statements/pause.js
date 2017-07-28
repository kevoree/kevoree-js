module.exports = function (model, expressions, stmt, opts) {
	opts.warnings.push({
		message: '"pause" statement is deprecated',
		pos: stmt.pos
	});
};
