var AbstractComponent = require('kevoree-entities').AbstractComponent;
var kevoree = require('kevoree-library').org.kevoree;
var genDictionary = require('./genDictionary');

/**
 * Generates component
 * @param deployUnit
 * @param obj
 * @param pkg
 */
module.exports = function (deployUnit, obj, pkg) {
    var factory = new kevoree.factory.DefaultKevoreeFactory();

    // create a new component type
    var compType = factory.createComponentType();
    compType.name = obj.toString();
    compType.version = deployUnit.version;

    // add super type if not AbstractComponent
    var superType = obj.constructor.prototype.superPrototype.toString();
    if (superType !== 'AbstractComponent') {
        // FIXME once registry.kevoree.org is done
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
    pkg.addTypeDefinitions(compType);

    return compType;
};

var addInputPort = function addInputPort(name, factory, compType) {
    var portRef = factory.createPortTypeRef();
    portRef.optional = true; // TODO wrong you should specify this somewhere
    portRef.noDependency = true; // TODO wrong you should specify this somewhere
    portRef.name = name;
    compType.addProvided(portRef);
};

var addOutputPort = function addOutputPort(name, factory, compType) {
    var portRef = factory.createPortTypeRef();
    portRef.optional = true; // TODO wrong you shoould specify this somewhere
    portRef.noDependency = true; // TODO wrong you should specify this somewhere
    portRef.name = name;
    compType.addRequired(portRef);
};