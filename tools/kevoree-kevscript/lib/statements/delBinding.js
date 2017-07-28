'use strict';

var KevScriptError = require('../KevScriptError');

function getBindings(model, chan, port) {
	return model.mBindings.array.filter(function (binding) {
		if (binding.hub && binding.port) {
			if (binding.hub.name === chan.name && binding.port.path() === port.path()) {
				return binding;
			}
		}
	});
}

module.exports = function (model, expressions, stmt, opts) {
	var bindings = expressions[stmt.children[0].type](model, expressions, stmt.children[0], opts);
	var channels = expressions[stmt.children[1].type](model, expressions, stmt.children[1], opts);

	var chans = [];
	if (channels.length === 1) {
		if (channels[0] === '*') {
			chans = model.hubs.array;
		} else {
			var chan = model.findHubsByID(channels[0]);
			if (chan) {
				chans.push(chan);
			} else {
				throw new KevScriptError('Unable to find chan instance "' + channels[0] + '". Unbind failed', stmt.children[1].children[0].pos);
			}
		}
	} else {
		throw new KevScriptError('Unbind target path is invalid (' + channels.join('.') + ')', stmt.children[1].pos);
	}

	var nodes = [];
	if (bindings.length === 3) {
		if (bindings[0] === '*') {
			// all nodes
			nodes = model.nodes.array;
		} else {
			// specific node
			var node = model.findNodesByID(bindings[0]);
			if (node) {
				nodes.push(node);
			} else {
				throw new KevScriptError('Unable to find node instance "' + bindings[0] + '". Unbind failed', stmt.children[0].children[0].pos);
			}
		}
	} else {
		throw new KevScriptError('"' + bindings.value + '" is not a valid unbind path for a port', stmt.children[0].pos);
	}

	var components = [];
	nodes.forEach(function (node) {
		if (bindings[1] === '*') {
			// all components
			components = components.concat(node.components.array);
		} else {
			var comp = node.findComponentsByID(bindings[1]);
			if (comp) {
				components.push(comp);
			} else {
				throw new KevScriptError('Unable to find component instance "' + bindings[1] + '" in node "' + bindings[0] + '". Unbind failed', stmt.children[0].children[1].pos);
			}
		}
	});

	var ports = [];
	components.forEach(function (comp) {
		if (bindings[2] === '*') {
			// all ports
			ports = ports.concat(comp.provided.array).concat(comp.required.array);
		} else {
			var port = comp.findProvidedByID(bindings[2]);
			if (port) {
				// add input
				ports.push(port);
			} else {
				port = comp.findRequiredByID(bindings[2]);
				if (port) {
					// add output
					ports.push(port);
				} else {
					throw new KevScriptError('Component "' + comp.name + '" in node "' + comp.eContainer().name + '" has no port named "' + bindings[2] + '". Unbind failed', stmt.children[0].children[2].pos);
				}
			}
		}
	});

	chans.forEach(function (chan) {
		ports.forEach(function (port) {
			getBindings(model, chan, port).forEach(function (binding) {
				if (binding.hub) {
					binding.hub.removeBindings(binding);
				}
				if (binding.port) {
					binding.port.removeBindings(binding);
				}
				model.removeMBindings(binding);
			});
		});
	});
};
