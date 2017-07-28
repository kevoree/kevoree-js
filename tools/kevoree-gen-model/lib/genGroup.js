'use strict';

var kevoree = require('kevoree-library').org.kevoree;
var genDictionary = require('./genDictionary');

/**
 * Generates group
 * @param deployUnit
 * @param obj
 */
module.exports = function (deployUnit, Class) {
    var factory = new kevoree.factory.DefaultKevoreeFactory();

    // create a new group type
    var groupType = factory.createGroupType();

    // add dictionary
    genDictionary(groupType, Class);

    return groupType;
};
