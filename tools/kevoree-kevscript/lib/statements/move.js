var KevScriptError = require('../KevScriptError');

module.exports = function (model, expressions, stmt, opts) {
	var nameList = expressions[stmt.children[0].type](model, expressions, stmt.children[0], opts);
	var targetNodes = expressions[stmt.children[1].type](model, expressions, stmt.children[1], opts);

	var nodes = [];
	if (targetNodes.length === 1) {
		nodes = model.select('/nodes[' + targetNodes[0] + ']').array;

		if (nodes.length === 0) {
			if (targetNodes[0] === '*') {
				throw new KevScriptError('Unable to find any node instance". Move failed', stmt.children[1].pos);
			} else {
				throw new KevScriptError('Unable to find any node instance named "' + targetNodes[0] + '". Move failed', stmt.children[1].pos);
			}
		}
	} else {
		throw new KevScriptError('Move target path is invalid (' + targetNodes.join('.') + ' should refer to node instances)', stmt.children[1].pos);
	}

	nameList.forEach(function (instancePath, i) {
		var instancesToMove = [];

		if (instancePath.length === 1) {
			// the only valid case when .length === 1 is => moving a node to a subNode
			// eg. move node0 node1
			if (instancePath[0] === '*') {
				throw new KevScriptError('Wildcard "*" cannot be used for nodes. Move failed', stmt.children[0].children[i].children[0].pos);
			} else {
				instancesToMove = [].concat(model.findNodesByID(instancePath[0]));

				if (instancesToMove.length === 0) {
					throw new KevScriptError('Unable to find any node instance named "' + instancePath[0] + '". Move failed', stmt.children[0].children[i].children[0].pos);
				}
			}
		} else if (instancePath.length === 2) {
			// move components from node to node
			// eg. move node0.ticker node1
			var hosts = model.select('/nodes[' + instancePath[0] + ']').array;

			if (hosts.length === 0) {
				if (instancePath[0] === '*') {
					throw new KevScriptError('Unable to find any node instance that hosts "' + instancePath[1] + '". Move failed', stmt.children[0].children[i].children[0].pos);
				} else {
					throw new KevScriptError('Unable to find any node instance named "' + instancePath[0] + '" that hosts "' + instancePath[1] + '". Move failed', stmt.children[0].children[i].children[0].pos);
				}
			}

			hosts.forEach(function (node) {
				var comps = node.select('components[' + instancePath[1] + ']').array;

				if (comps.length === 0) {
					if (instancePath[1] === '*') {
						throw new KevScriptError('Unable to find any component in host "' + node.name + '". Move failed', stmt.children[0].children[i].children[1].pos);
					} else {
						throw new KevScriptError('Unable to find any component named "' + instancePath[1] + '" in host "' + node.name + '". Move failed', stmt.children[0].children[i].children[1].pos);
					}
				}

				instancesToMove = instancesToMove.concat(comps);
			});
		} else {
			throw new KevScriptError('"' + instancePath + '" is not a valid move path for an instance', stmt.children[0].children[i].pos);
		}

		instancesToMove.forEach(function (instance) {
			if (instance.metaClassName() === 'org.kevoree.ComponentInstance') {
				opts.identifiers.splice(opts.identifiers.indexOf(instance.eContainer().name + '.' + instance.name), 1);
				nodes.forEach(function (node) {
					if (opts.identifiers.indexOf(node.name + '.' + instance.name) === -1) {
						node.addComponents(instance);
					} else {
						throw new KevScriptError('There is already a component named "' + instance.name + '" in "' + node.name + '". Move failed', stmt.children[0].children[i].children[1].pos);
					}
				});
			} else {
				opts.identifiers.splice(opts.identifiers.indexOf(instance.host.name + '.' + instance.name), 1);
				nodes.forEach(function (node) {
					if (opts.identifiers.indexOf(node.name + '.' + instance.name) === -1) {
						throw new KevScriptError('There is already a subNode named "' + instance.name + '" in "' + node.name + '". Move failed', stmt.children[0].children[i].children[1].pos);
					} else {
						node.addHosts(instance);
						instance.host = node;
					}
				});
			}
		});
	});
};
