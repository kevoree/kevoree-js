var kevoree = require('kevoree-library').org.kevoree;
var genDictionary = require('./genDictionary');

/**
 * Generates channel
 * @param deployUnit
 * @param obj
 * @param model
 */
module.exports = function (deployUnit, obj, model) {
    var factory = new kevoree.impl.DefaultKevoreeFactory();

    // create a new group type
    var chanType = factory.createChannelType();
    chanType.name = obj.toString();

    // add super type if not AbstractGroup
    var superType = obj.constructor.prototype.superPrototype.toString();
    if (superType != 'AbstractChannel') {
        // TODO
    }

    // set deployUnit
    chanType.deployUnit = deployUnit;

    // add dictionary
    genDictionary(chanType, obj);

    model.addTypeDefinitions(chanType);

    return chanType;
}