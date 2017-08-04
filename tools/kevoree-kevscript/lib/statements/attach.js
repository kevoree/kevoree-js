const kevoree = require('kevoree-library');
const KevScriptError = require('../KevScriptError');

function processFragmentDictionary(node) {
	const factory = new kevoree.factory.DefaultKevoreeFactory();
	node.groups.array.forEach((group) => {
		let fDic = group.findFragmentDictionaryByID(node.name);
		if (!fDic) {
			fDic = factory.createFragmentDictionary().withGenerated_KMF_ID('0.0');
			fDic.name = node.name;
			group.addFragmentDictionary(fDic);
		}
		const dicType = group.typeDefinition.dictionaryType;
		if (dicType) {
			dicType.attributes.array.forEach((attr) => {
				if (attr.fragmentDependant && attr.defaultValue) {
					const param = factory.createValue();
					param.name = attr.name;
					param.value = attr.defaultValue;
					fDic.addValues(param);
				}
			});
		}
	});

	node.components.array.forEach((comp) => {
		comp.provided.array.concat(comp.required.array).forEach((port) => {
			port.bindings.array.forEach((binding) => {
				if (binding.hub) {
					let fDic = binding.hub.findFragmentDictionaryByID(node.name);
					if (!fDic) {
						fDic = factory.createFragmentDictionary().withGenerated_KMF_ID('0.0');
						fDic.name = node.name;
						binding.hub.addFragmentDictionary(fDic);
					}
					const dicType = binding.hub.typeDefinition.dictionaryType;
					if (dicType) {
						dicType.attributes.array.forEach((attr) => {
							if (attr.fragmentDependant && attr.defaultValue) {
								let entry = factory.createValue();
								entry.name = attr.name;
								entry = attr.defaultValue;
								fDic.addValues(entry);
							}
						});
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
			throw new KevScriptError('Unable to find group instance "' + targetGroups[0] + '". Attach failed', stmt.children[1].children[0].pos);
		}
	} else {
		throw new KevScriptError('Attach target path is invalid (' + targetGroups + ')', stmt.children[1].pos);
	}

	nameList.forEach((nodeName, i) => {
		if (nodeName.length === 1) {
			const nodes = model.select('/nodes[' + nodeName + ']').array;
			if (nodeName !== '*' && nodes.length === 0) {
				throw new KevScriptError('Unable to attach node instance "' + nodeName + '". Instance does not exist', stmt.children[0].children[i].pos);
			}

			// attach nodes to groups
			nodes.forEach((node) => {
				groups.forEach((group) => {
					node.addGroups(group);
					group.addSubNodes(node);
				});
				processFragmentDictionary(node);
			});
		} else {
			throw new KevScriptError('"' + nodeName + '" is not a valid attach path for a node', stmt.children[1].pos);
		}
	});
};
