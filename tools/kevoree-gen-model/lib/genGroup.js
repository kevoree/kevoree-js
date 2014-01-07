var AbstractGroup = require('kevoree-entities').AbstractGroup;
var kevoree = require('kevoree-library').org.kevoree;
var genDictionary = require('./genDictionary');

/**
 * Generates group
 * @param deployUnit
 * @param obj
 * @param model
 */
module.exports = function (deployUnit, obj, model) {
    var factory = new kevoree.impl.DefaultKevoreeFactory();

    // create a new group type
    var groupType = factory.createGroupType();
    groupType.name = obj.toString();

    // add super type if not AbstractGroup
    var superType = obj.constructor.prototype.superPrototype.toString();
    if (superType != 'AbstractGroup') {
        // TODO
    }

    // add deployUnit
    groupType.deployUnit = deployUnit;

    // add dictionary
    genDictionary(groupType, obj);

    model.addTypeDefinitions(groupType);

    return groupType;
}