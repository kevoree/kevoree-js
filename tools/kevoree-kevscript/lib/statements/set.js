var kevoree = require('kevoree-library');
var KevScriptError = require('../KevScriptError');
var instanceResolver = require('../util/instance-resolver');

function validateValue(instance, attr, pos, val) {
	if (!attr.optional) {
		if (val.length === 0) {
			throw new KevScriptError('Non-optional attribute "' + attr.name + '" in "' + instance.path() + '" must have a value', pos);
		}
	}

	switch (attr.datatype.toString()) {
		case 'BOOLEAN':
			if (!(val === 'true' || val === 'false')) {
				throw new KevScriptError('Attribute "' + attr.name + '" in "' + instance.path() + '" must have a value of "true" or "false"', pos);
			}
			break;

		case 'INT':
		case 'LONG':
		case 'SHORT':
		case 'DOUBLE':
		case 'FLOAT':
			var res = parseInt(val, 10);
			if (isNaN(res)) {
				throw new KevScriptError('Attribute "' + attr.name + '" in "' + instance.path() + '" cannot be converted to a "' + attr.datatype.toString().toLowerCase() + '"', pos);
			}
			break;
	}
}

module.exports = function (model, expressions, stmt, opts) {
	var setLeftPart = stmt.children[0];
	var paramValPart, targetNodes;
	if (stmt.children.length === 3) {
		// frag dep
		// (CtxVar | GenCtxVar | RealString)
		paramValPart = stmt.children[2];
		// because the 'set' is like: set instance.param/node = ''
		// and 'node' could be '*' which resolves to a list of target nodes
		targetNodes = instanceResolver(model, expressions, stmt.children[1], opts);
	} else {
		// (CtxVar | GenCtxVar | RealString)
		paramValPart = stmt.children[1];
	}

	var leftPart = expressions[setLeftPart.type](model, expressions, setLeftPart, opts);
	if (setLeftPart.children.length < 2) {
		throw new KevScriptError('"' + leftPart.join('') + '" is not a valid path to a parameter. Set failed', setLeftPart.pos);
	}

	// separate the instances part of the path from the param name
	var paramPart = setLeftPart.children.splice(-1)[0];
	var instancesPath = expressions[setLeftPart.type](model, expressions, setLeftPart, opts);
	var instances = instanceResolver(model, expressions, setLeftPart, opts);
	// if unable to match any instances...cannot set!
	if (instances.length === 0) {
		throw new KevScriptError('Unable to find any instances that matches "' + instancesPath.join('.') + '". Set failed', setLeftPart.pos);
	}

	var paramName = expressions[paramPart.type](model, expressions, paramPart, opts);
	if (paramName === '*') {
		throw new KevScriptError('You must not use wildcard (*) for parameter name. Set failed', setLeftPart.pos);
	}
	var paramVal = expressions[paramValPart.type](model, expressions, paramValPart, opts);

	var factory = new kevoree.factory.DefaultKevoreeFactory();

	if (targetNodes) {
		// the 'set' is for fragmented dictionary
		targetNodes.forEach(function (node) {
			instances.forEach(function (instance) {
				var fDics = instance.select('fragmentDictionary[' + node.name + ']').array;
				if (fDics.length === 0) {
					throw new KevScriptError('Unable to find any fragment dictionary named "' + node.name + '" in instance "' + instance.name + '". Set failed', paramPart.pos);
				} else {
					if (instance.typeDefinition.dictionaryType) {
						var att = instance.typeDefinition.dictionaryType.findAttributesByID(paramName);
						if (att) {
							if (att.fragmentDependant) {
								fDics.forEach(function (dictionary) {
									var dVal = dictionary.findValuesByID(paramName);
									if (!dVal) {
										dVal = factory.createValue();
										dVal.name = paramName;
										dictionary.addValues(dVal);
									}
									validateValue(instance, att, paramValPart.pos, paramVal);
									dVal.value = paramVal;
								});
							} else {
								throw new KevScriptError('Type "' + instance.typeDefinition.name + '" has a param "' + paramName + '" but it is not fragment dependent. Set failed', paramPart.pos);
							}
						} else {
							throw new KevScriptError('Type "' + instance.typeDefinition.name + '" does not have any "' + paramName + '" parameter in its dictionary. Set failed', paramPart.pos);
						}
					} else {
						throw new KevScriptError('Type "' + instance.typeDefinition.name + '" does not have any fragment dictionary to set. Set failed', paramPart.pos);
					}
				}
			});
		});
	} else {
		// the 'set' is for dictionary
		instances.forEach(function (instance) {
			if (instance.typeDefinition.dictionaryType) {
				var att = instance.typeDefinition.dictionaryType.findAttributesByID(paramName);
				if (att) {
					if (att.fragmentDependant) {
						throw new KevScriptError('Type "' + instance.typeDefinition.name + '" has a param "' + paramName + '" but it is fragment dependent. Set failed', paramPart.pos);
					} else {
						var dVal = instance.dictionary.findValuesByID(paramName);
						if (!dVal) {
							dVal = factory.createValue();
							dVal.name = paramName;
							instance.dictionary.addValues(dVal);
						}
						validateValue(instance, att, paramValPart.pos, paramVal);
						dVal.value = paramVal;
					}
				} else {
					throw new KevScriptError('Type "' + instance.typeDefinition.name + '" does not have any "' + paramName + '" parameter in its dictionary. Set failed', paramPart.pos);
				}
			} else {
				throw new KevScriptError('Type "' + instance.typeDefinition.name + '" does not have any dictionary to set. Set failed', setLeftPart.pos);
			}
		});
	}
};
