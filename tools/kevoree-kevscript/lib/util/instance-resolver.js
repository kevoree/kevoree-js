var KevScriptError = require('../KevScriptError');

/**
 * instanceResolver - returns a list of instances based on the given expr and
 * model
 *
 * @param {Object} model       context model
 * @param {Array}  expressions list of expressions
 * @param {Object} expr        expression to process
 * @param {Object} opts        context options
 *
 * @returns {Array} an array of instances
 */
function instanceResolver(model, expressions, expr, opts) {
	var instancesFound;

	if (expr.type === 'instancePath') {
		if (expr.children.length === 2) {
			// component or subNode
			var nodeName = expressions[expr.children[0].type](model, expressions, expr.children[0], opts);
			var childName = expressions[expr.children[1].type](model, expressions, expr.children[1], opts);
			// retrieve parent nodes (using select() in case '*' is used)
			var parentNodes = model.select('/nodes[' + nodeName + ']').array;
			if (parentNodes.length === 0) {
				throw new KevScriptError('Unable to find any node instance named "' + nodeName + '"', expr.children[0].pos);
			}
			// for each parent node: try to find related comps/subNodes and add them
			return parentNodes.reduce(function (instances, parentNode) {
				var comps = parentNode.select('components[' + childName + ']').array;
				var hosts = parentNode.select('hosts[' + childName + ']').array;
				var merge = comps.concat(hosts);
				// if child name is not '*' we authorize empty set of instances
				// otherwise we throw an exception
				if (childName !== '*' && merge.length === 0) {
					throw new KevScriptError('Unable to find any instance named "' + childName + '" in host "' + parentNode.name + '"', expr.children[1].pos);
				}
				return instances.concat(merge);
			}, []);

		} else {
			// group, channel or node
			var instanceName = expressions[expr.children[0].type](model, expressions, expr.children[0], opts);
			instancesFound = model.select('/groups[' + instanceName + ']').array
				.concat(model.select('/hubs[' + instanceName + ']').array)
				.concat(model.select('/nodes[' + instanceName + ']').array);

			if (instanceName !== '*' && instancesFound.length === 0) {
				throw new KevScriptError('Unable to find any instance named "' + instanceName + '"', expr.children[0].pos);
			}

			return instancesFound;
		}
	} else if (expr.type === 'nameList') {
		return expr.children.reduce(function (curr, next) {
			return curr.concat(instanceResolver(model, expressions, next, opts));
		}, []);
	} else if (expr.type === 'string') {
		var strExpr = expressions[expr.type](model, expressions, expr, opts);
		instancesFound = model.select('/nodes[' + instanceName + ']').array
			.concat(model.select('/groups[' + instanceName + ']').array)
			.concat(model.select('/hubs[' + instanceName + ']').array);

		if (strExpr !== '*' && instancesFound.length === 0) {
			throw new KevScriptError('No group/channel/node found named "' + strExpr + '"', expr.pos);
		}

		return instancesFound;
	} else {
		throw new Error('instanceResolver() should not process anything but instancePath & nameList');
	}
}

module.exports = instanceResolver;
