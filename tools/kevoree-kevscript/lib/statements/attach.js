var kevoree = require('kevoree-library');
var KevScriptError = require('../KevScriptError');

function processFragmentDictionary(node) {
	var factory = new kevoree.factory.DefaultKevoreeFactory();
	node.groups.array.forEach(function (group) {
		var fDic = group.findFragmentDictionaryByID(node.name);
		if (!fDic) {
			fDic = factory.createFragmentDictionary().withGenerated_KMF_ID('0.0');
			fDic.name = node.name;
			group.addFragmentDictionary(fDic);
		}
		var dicType = group.typeDefinition.dictionaryType;
		if (dicType) {
			dicType.attributes.array.forEach(function (attr) {
				if (attr.fragmentDependant && attr.defaultValue) {
					var param = factory.createValue();
					param.name = attr.name;
					param.value = attr.defaultValue;
					fDic.addValues(param);
				}
			});
		}
	});

	node.components.array.forEach(function (comp) {
		comp.provided.array.concat(comp.required.array).forEach(function (port) {
			port.bindings.array.forEach(function (binding) {
				if (binding.hub) {
					var fDic = binding.hub.findFragmentDictionaryByID(node.name);
					if (!fDic) {
						fDic = factory.createFragmentDictionary().withGenerated_KMF_ID('0.0');
						fDic.name = node.name;
						binding.hub.addFragmentDictionary(fDic);
					}
					var dicType = binding.hub.typeDefinition.dictionaryType;
					if (dicType) {
						dicType.attributes.array.forEach(function (attr) {
							if (attr.fragmentDependant && attr.defaultValue) {
								var entry = factory.createValue();
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

module.exports = function (model, expressions, stmt, opts) {
	var nameList = expressions[stmt.children[0].type](model, expressions, stmt.children[0], opts);
	var targetGroups = expressions[stmt.children[1].type](model, expressions, stmt.children[1], opts);

	var groups = [];
	if (targetGroups.length === 1) {
		groups = model.select('/groups[' + targetGroups[0] + ']').array;
		if (targetGroups[0] !== '*' && groups.length === 0) {
			throw new KevScriptError('Unable to find group instance "' + targetGroups[0] + '". Attach failed', stmt.children[1].children[0].pos);
		}
	} else {
		throw new KevScriptError('Attach target path is invalid (' + targetGroups + ')', stmt.children[1].pos);
	}

	nameList.forEach(function (nodeName, i) {
		if (nodeName.length === 1) {
			var nodes = model.select('/nodes[' + nodeName + ']').array;
			if (nodeName !== '*' && nodes.length === 0) {
				throw new KevScriptError('Unable to attach node instance "' + nodeName + '". Instance does not exist', stmt.children[0].children[i].pos);
			}

			// attach nodes to groups
			nodes.forEach(function (node) {
				groups.forEach(function (group) {
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
