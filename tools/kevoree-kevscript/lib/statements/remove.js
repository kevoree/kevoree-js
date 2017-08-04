const KevScriptError = require('../KevScriptError');

function removeNode(model, node) {
	// remove groups fragment dictionary related to this node
	model.groups.array.forEach((group) => {
		const dic = group.findFragmentDictionaryByID(node.name);
		if (dic) {
			group.removeFragmentDictionary(dic);
		}
	});

	// remove channels fragment dictionary related to this node
	model.hubs.array.forEach((hub) => {
		const dic = hub.findFragmentDictionaryByID(node.name);
		if (dic) {
			hub.removeFragmentDictionary(dic);
		}
	});

	// remove bindings related to this node
	node.components.array.forEach((comp) => {
		comp.provided.array.concat(comp.required.array).forEach((port) => {
			port.bindings.array.forEach((binding) => {
				binding.hub.removeBindings(binding);
				model.removeMBindings(binding);
			});
		});
	});

	// delete links with groups
	node.groups.array.forEach((group) => {
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
	group.subNodes.array.forEach((node) => {
		node.removeGroups(group);
	});
	// remove group
	model.removeGroups(group);
}

function removeChannel(model, chan) {
	model.mBindings.array.forEach((binding) => {
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
	comp.provided.array.concat(comp.required.array).forEach((port) => {
		port.bindings.array.forEach((binding) => {
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
		node.components.array.forEach((comp) => {
			removeComponent(model, comp);
		});
		node.hosts.array.forEach((node) => {
			removeNode(model, node);
		});
	} else {
		// remove a specific instance from all nodes
		const comp = node.findComponentsByID(path);
		if (comp) {
			removeComponent(model, comp);
		}
		const subNode = node.findHostsByID(path);
		if (subNode) {
			removeNode(model, subNode);
		}
	}
}

module.exports = (model, expressions, stmt, opts) => {
	const nameList = expressions[stmt.children[0].type](model, expressions, stmt.children[0], opts);
	nameList.forEach((instancePath, i) => {
		if (instancePath.length === 1) {
			const instances = model.select('/nodes[' + instancePath[0] + ']').array
				.concat(model.select('/groups[' + instancePath[0] + ']').array)
				.concat(model.select('/hubs[' + instancePath[0] + ']').array)
				.concat(model.select('/mBindings[' + instancePath[0] + ']').array);

			if (instancePath[0] !== '*' && instances.length === 0) {
				throw new KevScriptError('Unable to find any instance named "' + instancePath[0] + '". Remove failed', stmt.children[0].children[i].children[0].pos);
			}

			instances.forEach((instance) => {
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
			const nodes = model.select('/nodes[' + instancePath[0] + ']').array;
			if (nodes.length === 0) {
				if (instancePath[0] === '*') {
					throw new KevScriptError('Unable to find any node instance that host "' + instancePath[1] + '". Remove failed', stmt.children[0].children[i].pos);
				} else {
					throw new KevScriptError('Unable to find any node instance named "' + instancePath[0] + '" that host "' + instancePath[1] + '". Remove failed', stmt.children[0].children[i].pos);
				}
			}

			nodes.forEach((node) => {
				opts.identifiers.splice(opts.identifiers.indexOf(node.name + '.' + instancePath[1]), 1);
				removeFromNode(model, instancePath[1], node);
			});

		} else {
			throw new KevScriptError('Instance path for "remove" statements must be "name" or "hostName.childName". Instance path "' + stmt.children[0].pos + '" is not valid', stmt.children[0].children[0].pos);
		}
	});
};
