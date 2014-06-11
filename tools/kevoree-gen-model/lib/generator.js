var fs               = require('fs'),
    path             = require('path'),
    npm              = require('npm'),
    chalk            = require('chalk'),
    genComponent     = require('./genComponent'),
    genChannel       = require('./genChannel'),
    genGroup         = require('./genGroup'),
    genNode          = require('./genNode'),
    kevoree          = require('kevoree-library').org.kevoree;

// init Kevoree entities types
var KevoreeEntity, AbstractComponent, AbstractGroup, AbstractChannel, AbstractNode;
// init Kevoree factory
var factory = new kevoree.impl.DefaultKevoreeFactory();

/**
 *
 * @param dirPath {string}
 * @param verbose {boolean}
 * @param callback {function}
 * @returns {*}
 */
var generator = function generator(dirPath, verbose, callback) {
    if (dirPath == undefined) throw new Error("dirPath undefined");

    function processFile(file, deployUnit, model) {
        try {
            var Class = require(file);

            if (typeof Class == 'function') {
                var obj = new Class();
                if (obj instanceof KevoreeEntity) {
                    // this Class is a KevoreeEntity
                    if (obj instanceof AbstractComponent) {
                        if (verbose) console.log("Processing component:\n\tFile: '%s'", file);
                        return genComponent(deployUnit, obj, model);

                    } else if (obj instanceof AbstractChannel) {
                        if (verbose) console.log("Processing channel:\n\tFile: '%s'", file);
                        return genChannel(deployUnit, obj, model);

                    } else if (obj instanceof AbstractGroup) {
                        if (verbose) console.log("Processing group:\n\tFile: '%s'", file);
                        return genGroup(deployUnit, obj, model);

                    } else if (obj instanceof AbstractNode) {
                        if (verbose) console.log("Processing node:\n\tFile: '%s'", file);
                        return genNode(deployUnit, obj, model);
                    }

                } else {
                    // this is not the Class you are looking for
                    if (verbose) console.log(chalk.yellow('Ignored:')+"\n\tFile: '%s'\n\tReason: Not a KevoreeEntity (check that you have only one version of kevoree-entities in your dependency tree)", file);
                }
            }
        } catch (e) {
            if (e.code == 'PARSE_FAIL') throw e;
            if (verbose) console.log(chalk.yellow('Ignored:')+"\n\tFile: '%s'\n\tReason: Unable to create a new object\n\tError: %s", file, e.message);
        }
    }

    try {
        // retrieve kevoree-entities types from the project path
        var kePath = path.resolve(dirPath, 'node_modules', 'kevoree-entities'); // TODO add this path in command-line argument ?
        KevoreeEntity     = require(kePath).KevoreeEntity;
        AbstractComponent = require(kePath).AbstractComponent;
        AbstractGroup     = require(kePath).AbstractGroup;
        AbstractChannel   = require(kePath).AbstractChannel;
        AbstractNode      = require(kePath).AbstractNode;

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

module.exports = generator;