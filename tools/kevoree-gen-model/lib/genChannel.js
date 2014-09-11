var kevoree = require('kevoree-library').org.kevoree;
var genDictionary = require('./genDictionary');

/**
 * Generates channel
 * @param deployUnit
 * @param obj
 * @param pkg
 */
module.exports = function (deployUnit, obj, pkg) {
    var factory = new kevoree.factory.DefaultKevoreeFactory();

    // create a new group type
    var chanType = factory.createChannelType();
    chanType.name = obj.toString();
    chanType.version = deployUnit.version;

    // add super type if not AbstractGroup
    var superType = obj.constructor.prototype.superPrototype.toString();
    if (superType !== 'AbstractChannel') {
        // FIXME once registry.kevoree.org is done
    }

    // set deployUnit
    chanType.deployUnit = deployUnit;

    // add dictionary
    genDictionary(chanType, obj);

    pkg.addTypeDefinitions(chanType);

    return chanType;
};