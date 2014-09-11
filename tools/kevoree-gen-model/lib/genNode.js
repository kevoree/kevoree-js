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
    var nodeType = factory.createNodeType();
    nodeType.name = obj.toString();
    nodeType.version = deployUnit.version;

    // add super type if not AbstractGroup
    var superType = obj.constructor.prototype.superPrototype.toString();
    if (superType !== 'AbstractNode') {
        // FIXME once registry.kevoree.org is done
    }

    // set deployUnit
    nodeType.deployUnit = deployUnit;

    // add dictionary
    genDictionary(nodeType, obj);

    pkg.addTypeDefinitions(nodeType);

    return nodeType;
};