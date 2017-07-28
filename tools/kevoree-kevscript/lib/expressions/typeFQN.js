var KevScriptError = require('../KevScriptError');
var FQN = require('../util/fqn');

module.exports = function (model, expressions, expr) {
	var strings = expr.children
		.filter(function (expr) {
			return expr.type;
		})
		.map(function (expr) {
			return expressions[expr.type](model, expressions, expr);
		});


	var namespace, name;
	if (strings.length > 2) {
		throw new KevScriptError('Namespaces should no longer contain dots.', expr.pos);
	} else if (strings.length === 1) {
		// default namespace is 'kevoree'
		namespace = 'kevoree';
		name = strings[0];
	} else {
		namespace = strings[0];
		name = strings[1];
	}

	return new FQN(namespace, name);
};
