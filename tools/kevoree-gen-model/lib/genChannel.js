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
    var chanType = factory.createChannelType();
    chanType.name = obj.toString();
    chanType.version = deployUnit.version;

    // add dictionary
    genDictionary(chanType, obj);

    return chanType;
};