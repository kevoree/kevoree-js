

const KevScriptError = require('../KevScriptError');

function processFragmentDictionary(node) {
	node.groups.array.forEach((group) => {
		const fDic = group.findFragmentDictionaryByID(node.name);
		if (fDic) {
			fDic.delete();
		}
	});

	node.components.array.forEach((comp) => {
		comp.provided.array.concat(comp.required.array).forEach((port) => {
			port.bindings.array.forEach((binding) => {
				if (binding.hub) {
					const fDic = binding.hub.findFragmentDictionaryByID(node.name);
					if (fDic) {
						fDic.delete();
					}
				}
			});
		});
	});
}

module.exports = (model, expressions, stmt, opts) => {
	const nameList = expressions[stmt.children[0].type](model, expressions, stmt.children[0], opts);
	const targetGroups = expressions[stmt.children[1].type](model, expressions, stmt.children[1], opts);

	let groups = [];
	if (targetGroups.length === 1) {
		groups = model.select('/groups[' + targetGroups[0] + ']').array;
		if (targetGroups[0] !== '*' && groups.length === 0) {
			throw new KevScriptError('Unable to find group instance "' + targetGroups[0] + '". Detach failed', stmt.children[1].children[0].pos);
		}
	} else {
		throw new KevScriptError('Detach target path is invalid (' + targetGroups + ')', stmt.children[1].pos);
	}

	nameList.forEach((nodeName, i) => {
		if (nodeName.length === 1) {
			const nodes = model.select('/nodes[' + nodeName + ']').array;
			if (nodeName !== '*' && nodes.length === 0) {
				throw new KevScriptError('Unable to detach node instance "' + nodeName + '". Instance does not exist', stmt.children[0].children[i].pos);
			}

			// detach nodes to groups
			nodes.forEach((node) => {
				processFragmentDictionary(node);
				groups.forEach((group) => {
					node.removeGroups(group);
					group.removeSubNodes(node);
				});
			});
		} else {
			throw new KevScriptError('"' + nodeName + '" is not a valid detach path for a node', stmt.children[1].pos);
		}
	});
};
