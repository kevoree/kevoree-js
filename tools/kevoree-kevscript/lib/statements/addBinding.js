'use strict';

var kevoree = require('kevoree-library');
var KevScriptError = require('../KevScriptError');

function hasBinding(model, chan, port) {
	return model.mBindings.array.some(function (binding) {
		if (binding.hub && binding.port) {
			return binding.hub.name === chan.name && binding.port.path() === port.path();
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
				throw new KevScriptError('Unable to find chan instance "' + channels[0] + '". Bind failed', stmt.children[1].children[0].pos);
			}
		}
	} else {
		throw new KevScriptError('Bind target path is invalid (' + channels.join('.') + ')', stmt.children[1].pos);
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
				throw new KevScriptError('Unable to find node instance "' + bindings[0] + '". Bind failed', stmt.children[0].children[0].pos);
			}
		}
	} else {
		throw new KevScriptError('"' + bindings.value + '" is not a valid bind path for a port', stmt.children[0].pos);
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
				throw new KevScriptError('Unable to find component instance "' + bindings[1] + '" in node "' + bindings[0] + '". Bind failed', stmt.children[0].children[1].pos);
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
					throw new KevScriptError('Component "' + comp.name + '" in node "' + comp.eContainer().name + '" has no port named "' + bindings[2] + '". Bind failed', stmt.children[0].children[2].pos);
				}
			}
		}
	});

	var factory = new kevoree.factory.DefaultKevoreeFactory();
	chans.forEach(function (chan) {
		ports.forEach(function (port) {
			if (!hasBinding(model, chan, port)) {
				var binding = factory.createMBinding();
				binding.hub = chan;
				binding.port = port;
				chan.addBindings(binding);
				port.addBindings(binding);
				model.addMBindings(binding);
			}
		});
	});
};
