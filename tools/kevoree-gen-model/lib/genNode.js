'use strict';

var kevoree = require('kevoree-library').org.kevoree;
var genDictionary = require('./genDictionary');

/**
 * Generates channel
 * @param deployUnit
 * @param Class
 */
module.exports = function (deployUnit, Class) {
    var factory = new kevoree.factory.DefaultKevoreeFactory();

    // create a new group type
    var nodeType = factory.createNodeType();

    // add dictionary
    genDictionary(nodeType, Class);

    return nodeType;
};
