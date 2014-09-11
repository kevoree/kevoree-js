var kevoree = require('kevoree-library').org.kevoree;
var genDictionary = require('./genDictionary');

/**
 * Generates group
 * @param deployUnit
 * @param obj
 */
module.exports = function (deployUnit, obj) {
    var factory = new kevoree.factory.DefaultKevoreeFactory();

    // create a new group type
    var groupType = factory.createGroupType();
    groupType.name = obj.toString();
    groupType.version = deployUnit.version;

    // add dictionary
    genDictionary(groupType, obj);

    return groupType;
};