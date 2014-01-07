var AbstractComponent = require('kevoree-entities').AbstractComponent;
var kevoree = require('kevoree-library').org.kevoree;
var genDictionary = require('./genDictionary');

/**
 * Generates component
 * @param deployUnit
 * @param obj
 * @param model
 */
module.exports = function (deployUnit, obj, model) {
  var factory = new kevoree.impl.DefaultKevoreeFactory();

  // create a new component type
  var compType = factory.createComponentType();
  compType.name = obj.toString();

  // add super type if not AbstractComponent
  var superType = obj.constructor.prototype.superPrototype.toString();
  if (superType != 'AbstractComponent') {
    // TODO
  }

  // set deployUnit
  compType.deployUnit = deployUnit;

  for (var prop in obj) {
    if (prop.startsWith(AbstractComponent.IN_PORT)) {
      addInputPort(prop.replace(AbstractComponent.IN_PORT,  ''), factory, compType);

    } else if (prop.startsWith(AbstractComponent.OUT_PORT)) {
      addOutputPort(prop.replace(AbstractComponent.OUT_PORT,  ''), factory, compType);
    }

  }

  // add dictionary
  genDictionary(compType, obj);

  // add component type to model
  model.addTypeDefinitions(compType);

  return compType;
}

var addInputPort = function addInputPort(name, factory, compType) {
  var portRef = factory.createPortTypeRef();
  portRef.optional = true; // TODO wrong you should specify this somewhere
  portRef.noDependency = true; // TODO wrong you should specify this somewhere
  portRef.name = name;
  compType.addProvided(portRef);
  console.log("\tNew input port '%s' added to component", name);
}

var addOutputPort = function addOutputPort(name, factory, compType) {
  var portRef = factory.createPortTypeRef();
  portRef.optional = true; // TODO wrong you shoould specify this somewhere
  portRef.noDependency = true; // TODO wrong you should specify this somewhere
  portRef.name = name;
  compType.addRequired(portRef);
  console.log("\tNew output port '%s' added to component", name);
}

// String.startsWith(str)
if (typeof String.prototype.startsWith != 'function') {
  String.prototype.startsWith = function startsWith(str) {
    return this.slice(0, str.length) == str;
  };
}