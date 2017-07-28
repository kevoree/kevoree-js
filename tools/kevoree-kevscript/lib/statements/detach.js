'use strict';

var KevScriptError = require('../KevScriptError');

function processFragmentDictionary(node) {
	node.groups.array.forEach(function (group) {
		var fDic = group.findFragmentDictionaryByID(node.name);
		if (fDic) {
			fDic.delete();
		}
	});

	node.components.array.forEach(function (comp) {
		comp.provided.array.concat(comp.required.array).forEach(function (port) {
			port.bindings.array.forEach(function (binding) {
				if (binding.hub) {
					var fDic = binding.hub.findFragmentDictionaryByID(node.name);
					if (fDic) {
						fDic.delete();
					}
				}
			});
		});
	});
}

module.exports = function (model, expressions, stmt, opts) {
	var nameList = expressions[stmt.children[0].type](model, expressions, stmt.children[0], opts);
	var targetGroups = expressions[stmt.children[1].type](model, expressions, stmt.children[1], opts);

	var groups = [];
	if (targetGroups.length === 1) {
		groups = model.select('/groups[' + targetGroups[0] + ']').array;
		if (targetGroups[0] !== '*' && groups.length === 0) {
			throw new KevScriptError('Unable to find group instance "' + targetGroups[0] + '". Detach failed', stmt.children[1].children[0].pos);
		}
	} else {
		throw new KevScriptError('Detach target path is invalid (' + targetGroups + ')', stmt.children[1].pos);
	}

	nameList.forEach(function (nodeName, i) {
		if (nodeName.length === 1) {
			var nodes = model.select('/nodes[' + nodeName + ']').array;
			if (nodeName !== '*' && nodes.length === 0) {
				throw new KevScriptError('Unable to detach node instance "' + nodeName + '". Instance does not exist', stmt.children[0].children[i].pos);
			}

			// detach nodes to groups
			nodes.forEach(function (node) {
				processFragmentDictionary(node);
				groups.forEach(function (group) {
					node.removeGroups(group);
					group.removeSubNodes(node);
				});
			});
		} else {
			throw new KevScriptError('"' + nodeName + '" is not a valid detach path for a node', stmt.children[1].pos);
		}
	});
};
