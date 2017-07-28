var kevoree = require('kevoree-library');
var KevScriptError = require('../KevScriptError');

module.exports = function (model, expressions, stmt, opts) {
	var instancesPath = expressions[stmt.children[0].type](model, expressions, stmt.children[0], opts);
	var networkVal = expressions[stmt.children[1].type](model, expressions, stmt.children[1], opts);

	if (instancesPath.length === 3) {
		var nodes = [];
		if (instancesPath[0] === '*') {
			// all nodes
			nodes = model.nodes.array;
		} else {
			// specific node
			var node = model.findNodesByID(instancesPath[0]);
			if (node) {
				nodes.push(node);
			} else {
				throw new KevScriptError('Unable to find node instance "' + instancesPath[0] + '". Network failed', stmt.children[0].children[0].pos);
			}
		}

		var factory = new kevoree.factory.DefaultKevoreeFactory();
		var netTypes = [];
		if (instancesPath[1] === '*') {
			// all network types
			nodes.forEach(function (node) {
				netTypes = netTypes.concat(node.networkInformation.array);
			});
		} else {
			// specific network
			nodes.forEach(function (node) {
				var network = node.findNetworkInformationByID(instancesPath[1]);
				if (network) {
					netTypes.push(network);
				} else {
					network = factory.createNetworkInfo();
					network.name = instancesPath[1];
					node.addNetworkInformation(network);
					netTypes.push(network);
				}
			});
		}

		var netNames = [];
		if (instancesPath[2] === '*') {
			// all network names
			netTypes.forEach(function (net) {
				netNames = netNames.concat(net.values.array);
			});
		} else {
			// specific network name
			netTypes.forEach(function (net) {
				var val = net.findValuesByID(instancesPath[2]);
				if (val) {
					netNames.push(val);
				} else {
					val = factory.createValue();
					val.name = instancesPath[2];
					net.addValues(val);
					netNames.push(val);
				}
			});
		}

		netNames.forEach(function (net) {
			net.value = networkVal;
		});
	} else {
		throw new KevScriptError('"' + instancesPath[0] + '" is not a network path. Network path must look like "nodeName.netType.netName"', stmt.children[0].children[0].pos);
	}
};
