const KevScriptError = require('../KevScriptError');

module.exports = (model, expressions, stmt, opts) => {
	const nameList = expressions[stmt.children[0].type](model, expressions, stmt.children[0], opts);

	nameList.forEach((instancePath, i) => {
		let instances = [];
		if (instancePath.length === 1) {
			// node / chan / group
			instances = model.select('/nodes[' + instancePath[0] + ']').array
				.concat(model.select('/groups[' + instancePath[0] + ']').array)
				.concat(model.select('/hubs[' + instancePath[0] + ']').array);
		} else if (instancePath.length === 2) {
			// component & hosts
			instances = model.select('/nodes[' + instancePath[0] + ']/components[' + instancePath[1] + ']').array
				.concat(model.select('/nodes[' + instancePath[0] + ']/hosts[' + instancePath[1] + ']').array);

		} else {
			throw new KevScriptError('"' + instancePath.value + '" is not a valid path for an instance. Start failed', stmt.children[0].children[i].pos);
		}

		if (instancePath.indexOf('*') === -1 && instances.length === 0) {
			throw new KevScriptError('Unable to start "' + instancePath + '". Instance does not exist', stmt.children[0].pos);
		} else {
			instances.forEach((instance) => {
				instance.started = true;
			});
		}
	});
};
