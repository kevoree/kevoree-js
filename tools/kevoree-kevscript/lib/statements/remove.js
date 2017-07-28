var KevScriptError = require('../KevScriptError');

function removeNode(model, node) {
	// remove groups fragment dictionary related to this node
	model.groups.array.forEach(function (group) {
		var dic = group.findFragmentDictionaryByID(node.name);
		if (dic) {
			group.removeFragmentDictionary(dic);
		}
	});

	// remove channels fragment dictionary related to this node
	model.hubs.array.forEach(function (hub) {
		var dic = hub.findFragmentDictionaryByID(node.name);
		if (dic) {
			hub.removeFragmentDictionary(dic);
		}
	});

	// remove bindings related to this node
	node.components.array.forEach(function (comp) {
		comp.provided.array.concat(comp.required.array).forEach(function (port) {
			port.bindings.array.forEach(function (binding) {
				binding.hub.removeBindings(binding);
				model.removeMBindings(binding);
			});
		});
	});

	// delete links with groups
	node.groups.array.forEach(function (group) {
		group.removeSubNodes(node);
	});

	// remove node itself
	if (node.host) {
		node.host.removeHosts(node);
	}
	model.removeNodes(node);
}

function removeGroup(model, group) {
	// remove link between this group and nodes
	group.subNodes.array.forEach(function (node) {
		node.removeGroups(group);
	});
	// remove group
	model.removeGroups(group);
}

function removeChannel(model, chan) {
	model.mBindings.array.forEach(function (binding) {
		if (binding.hub.name === chan.name) {
			if (binding.port) {
				binding.port.removeBindings(binding);
			}
			if (binding.hub) {
				binding.hub.removeBindings(binding);
			}
			model.removeMBindings(binding);
		}
	});
	model.removeHubs(chan);
}

function removeComponent(model, comp) {
	comp.provided.array.concat(comp.required.array).forEach(function (port) {
		port.bindings.array.forEach(function (binding) {
			if (binding.port) {
				binding.port.removeBindings(binding);
			}
			if (binding.hub) {
				binding.hub.removeBindings(binding);
			}
			model.removeMBindings(binding);
		});
	});
	comp.eContainer().removeComponents(comp);
}

function removeFromNode(model, path, node) {
	if (path === '*') {
		// remove all from all nodes
		node.components.array.forEach(function (comp) {
			removeComponent(model, comp);
		});
		node.hosts.array.forEach(function (node) {
			removeNode(model, node);
		});
	} else {
		// remove a specific instance from all nodes
		var comp = node.findComponentsByID(path);
		if (comp) {
			removeComponent(model, comp);
		}
		var subNode = node.findHostsByID(path);
		if (subNode) {
			removeNode(model, subNode);
		}
	}
}

module.exports = function (model, expressions, stmt, opts) {
	var nameList = expressions[stmt.children[0].type](model, expressions, stmt.children[0], opts);
	nameList.forEach(function (instancePath, i) {
		if (instancePath.length === 1) {
			var instances = model.select('/nodes[' + instancePath[0] + ']').array
				.concat(model.select('/groups[' + instancePath[0] + ']').array)
				.concat(model.select('/hubs[' + instancePath[0] + ']').array)
				.concat(model.select('/mBindings[' + instancePath[0] + ']').array);

			if (instancePath[0] !== '*' && instances.length === 0) {
				throw new KevScriptError('Unable to find any instance named "' + instancePath[0] + '". Remove failed', stmt.children[0].children[i].children[0].pos);
			}

			instances.forEach(function (instance) {
				if (instance.name) {
					// remove identifier from the list
					opts.identifiers.splice(opts.identifiers.indexOf(instance.name), 1);
				}
				if (instance.metaClassName() === 'org.kevoree.ContainerNode') {
					removeNode(model, instance);
				} else if (instance.metaClassName() === 'org.kevoree.Group') {
					removeGroup(model, instance);
				} else if (instance.metaClassName() === 'org.kevoree.Channel') {
					removeChannel(model, instance);
				} else {
					instance.delete();
				}
			});

		} else if (instancePath.length === 2) {
			// path to a component/subNode
			var nodes = model.select('/nodes[' + instancePath[0] + ']').array;
			if (nodes.length === 0) {
				if (instancePath[0] === '*') {
					throw new KevScriptError('Unable to find any node instance that host "' + instancePath[1] + '". Remove failed', stmt.children[0].children[i].pos);
				} else {
					throw new KevScriptError('Unable to find any node instance named "' + instancePath[0] + '" that host "' + instancePath[1] + '". Remove failed', stmt.children[0].children[i].pos);
				}
			}

			nodes.forEach(function (node) {
				opts.identifiers.splice(opts.identifiers.indexOf(node.name + '.' + instancePath[1]), 1);
				removeFromNode(model, instancePath[1], node);
			});

		} else {
			throw new KevScriptError('Instance path for "remove" statements must be "name" or "hostName.childName". Instance path "' + stmt.children[0].pos + '" is not valid', stmt.children[0].children[0].pos);
		}
	});
};
