'use strict';

var semver = require('semver');

function findChanNodeGroupByName(model, name) {
	function findByName(elem) {
		var elems = (model[elem])
			? model[elem].iterator()
			: null;
		if (elems !== null) {
			while (elems.hasNext()) {
				var entity = elems.next();
				if (entity.name === name) {
					return entity;
				}
			}
		}
		return null;
	}

	return findByName('nodes') || findByName('groups') || findByName('hubs') || null;
}

function findComponent(model, nodeName, compName) {
	var node = model.findNodesByID(nodeName);
	if (node) {
		return node.findComponentsByID(compName);
	} else {
		return null;
	}
}

/**
 * Returns the platforms related to that TypeDefinition
 * @param tdef
 * @returns {Array}
 */
function getPlatforms(tdef) {
	var platforms = [];

	if (tdef) {
		tdef.deployUnits.array.forEach(function(du) {
			var platform = du.findFiltersByID('platform');
			if (platform && platforms.indexOf(platform.value) === -1) {
				platforms.push(platform.value);
			}
		});
	}

	return platforms;
}

/**
 * Returns whether or not the given "tdef" is compatible with the given "node"
 * if the tdef has a platform compatible with the node type
 * @param tdef
 * @param node
 * @returns {Boolean}
 */
function isCompatible(tdef, node) {
	if (tdef && node) {
		if (tdef.select('metaData[name=virtual]').array.length > 0) {
			// tdef is virtual, so it is compatible
			return true;

		} else {
			var nodePlatforms = getPlatforms(node.typeDefinition);

			for (var i = 0; i < nodePlatforms.length; i++) {
				if (tdef.select('deployUnits[name=*]/filters[name=platform,value=' + nodePlatforms[i] + ']').array.length > 0) {
					return true;
				}
			}
		}
	}
	return false;
}

/**
 * Returns the FQN of the given TypeDefinition
 * @param tdef
 * @returns {String}
 */
function getFQN(tdef) {
	var hasPreRelease = tdef.deployUnits.array.some(function (du) {
		return semver.prerelease(du.version) !== null;
	});

	var duTag = hasPreRelease ? '/LATEST' : '';

	var fqn = tdef.name + '/' + tdef.version + duTag;

	function walk(pkg) {
		if (pkg.eContainer()) {
			fqn = pkg.name + '.' + fqn;
			walk(pkg.eContainer());
		}
	}

	walk(tdef.eContainer());

	return fqn;
}

module.exports = {
	findEntityByName: findChanNodeGroupByName,
	findComponentByName: findComponent,
  getPlatforms: getPlatforms,
  isCompatible: isCompatible,
	getFQN: getFQN
};
