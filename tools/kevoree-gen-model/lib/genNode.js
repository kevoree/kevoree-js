var kevoree = require('kevoree-library').org.kevoree;
var genDictionary = require('./genDictionary');

/**
 * Generates channel
 * @param deployUnit
 * @param obj
 */
module.exports = function (deployUnit, obj) {
    var factory = new kevoree.factory.DefaultKevoreeFactory();

    // create a new group type
    var nodeType = factory.createNodeType();
    nodeType.name = obj.toString();
    nodeType.version = deployUnit.version;

    // add dictionary
    genDictionary(nodeType, obj);

    return nodeType;
};