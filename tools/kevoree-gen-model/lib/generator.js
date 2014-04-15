var fs         = require('fs'),
    path         = require('path'),
    npm          = require('npm'),
    genComponent = require('./genComponent'),
    genChannel   = require('./genChannel'),
    genGroup     = require('./genGroup'),
    genNode      = require('./genNode'),
    kevoree      = require('kevoree-library').org.kevoree;

// init Kevoree entities types
var KevoreeEntity, AbstractComponent, AbstractGroup, AbstractChannel, AbstractNode;
// init quiet mode to false
var quiet = false;
// init Kevoree factory
var factory = new kevoree.impl.DefaultKevoreeFactory();

/**
 *
 * @param dirPath
 * @param callback
 */
var generator = function generator(dirPath, quiet_, callback) {
    if (dirPath == undefined) throw new Error("dirPath undefined");

    // retrieve kevoree-entities types from the project path
    var kePath = path.resolve(dirPath, 'node_modules', 'kevoree-entities'); // TODO add this path in command-line argument ?
    KevoreeEntity     = require(kePath).KevoreeEntity;
    AbstractComponent = require(kePath).AbstractComponent;
    AbstractGroup     = require(kePath).AbstractGroup;
    AbstractChannel   = require(kePath).AbstractChannel;
    AbstractNode      = require(kePath).AbstractNode;

    // set quiet mode
    quiet = quiet_;

    try {
        // get module package.json
        var modulePkg = require(path.resolve(dirPath, 'package.json'));

        // create a new ContainerRoot
        var model = factory.createContainerRoot();

        // create a javascript library for the model
        var library = factory.createTypeLibrary();
        library.name = 'Javascript';
        model.addLibraries(library);

        // create the project deployUnit
        var deployUnit = factory.createDeployUnit();
        deployUnit.name = modulePkg.name;
        deployUnit.version = modulePkg.version;
        deployUnit.type = 'npm';
        model.addDeployUnits(deployUnit);

        // process main file
        var typeDef = processFile(path.resolve(dirPath, modulePkg.main), deployUnit, model);
        if (typeof(typeDef) !== 'undefined' && typeDef != null) {
            // add typedefinition to Javascript library
            typeDef.version = modulePkg.version;
            library.addSubTypes(typeDef);
        }

        return callback(null, model);

    } catch (err) {
        return callback(err);
    }
};

var processFile = function (file, deployUnit, model) {
    try {
        var Class = require(file);

        if (typeof Class == 'function') {
            var obj = new Class();
            if (obj instanceof KevoreeEntity) {
                // this Class is a KevoreeEntity
                if (obj instanceof AbstractComponent) {
                    console.log("\nProcessing component:\n\tFile: '%s'", file);
                    return genComponent(deployUnit, obj, model);

                } else if (obj instanceof AbstractChannel) {
                    console.log("\nProcessing channel:\n\tFile: '%s'", file);
                    return genChannel(deployUnit, obj, model);

                } else if (obj instanceof AbstractGroup) {
                    console.log("\nProcessing group:\n\tFile: '%s'", file);
                    return genGroup(deployUnit, obj, model);

                } else if (obj instanceof AbstractNode) {
                    console.log("\nProcessing node:\n\tFile: '%s'", file);
                    return genNode(deployUnit, obj, model);
                }

            } else {
                // this is not the Class you are looking for
                if (!quiet) console.log("\nIgnored:\n\tFile: '%s'\n\tReason: Not a KevoreeEntity", file);
            }
        }
    } catch (e) {
        if (e.code == 'PARSE_FAIL') throw e;
        if (!quiet) console.log("\nIgnored:\n\tFile: '%s'\n\tReason: Unable to create a new object\n\tError: %s", file, e.message);
    }
};

module.exports = generator;