var kevoree = require('kevoree-library').org.kevoree;
var genDictionary = require('./genDictionary');

/**
 * Generates group
 * @param deployUnit
 * @param obj
 * @param pkg
 */
module.exports = function (deployUnit, obj, pkg) {
    var factory = new kevoree.factory.DefaultKevoreeFactory();

    // create a new group type
    var groupType = factory.createGroupType();
    groupType.name = obj.toString();
    groupType.version = deployUnit.version;

    // add super type if not AbstractGroup
    var superType = obj.constructor.prototype.superPrototype.toString();
    if (superType !== 'AbstractGroup') {
        // FIXME once registry.kevoree.org is done
    }

    // add deployUnit
    groupType.deployUnit = deployUnit;

    // add dictionary
    genDictionary(groupType, obj);

    pkg.addTypeDefinitions(groupType);

    return groupType;
};