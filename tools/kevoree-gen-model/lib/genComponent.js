'use strict';

var AbstractComponent = require('kevoree-entities').AbstractComponent;
var kevoree = require('kevoree-library').org.kevoree;
var genDictionary = require('./genDictionary');

function addInputPort(name, factory, compType) {
    var portRef = factory.createPortTypeRef();
    portRef.optional = true;
    portRef.noDependency = true;
    portRef.name = name;
    compType.addProvided(portRef);
}

function addOutputPort(name, factory, compType) {
    var portRef = factory.createPortTypeRef();
    portRef.optional = true;
    portRef.noDependency = true;
    portRef.name = name;
    compType.addRequired(portRef);
}

/**
 * Generates component
 * @param deployUnit
 * @param Class
 */
module.exports = function genComponent(deployUnit, Class) {
    var factory = new kevoree.factory.DefaultKevoreeFactory();

    // create a new component type
    var compType = factory.createComponentType();

    Object.getOwnPropertyNames(Class.prototype).forEach(function (prop) {
      if (prop.startsWith(AbstractComponent.IN_PORT)) {
          addInputPort(prop.replace(AbstractComponent.IN_PORT,  ''), factory, compType);

      } else if (prop.startsWith(AbstractComponent.OUT_PORT)) {
          addOutputPort(prop.replace(AbstractComponent.OUT_PORT,  ''), factory, compType);
      }
    });

    // add dictionary
    genDictionary(compType, Class);

    return compType;
};
