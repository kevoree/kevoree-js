var fs               = require('fs'),
    path             = require('path'),
    npm              = require('npm'),
    chalk            = require('chalk'),
    genComponent     = require('./genComponent'),
    genChannel       = require('./genChannel'),
    genGroup         = require('./genGroup'),
    genNode          = require('./genNode'),
    kevoree          = require('kevoree-library').org.kevoree;

// constants
var PKG_PATTERN = /^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*$/;

// init Kevoree factory
var factory = new kevoree.factory.DefaultKevoreeFactory();

/**
 *
 * @param {String} dirPath
 * @param {Boolean} quiet
 * @param {Function} callback
 */
var generator = function generator(dirPath, quiet, callback) {
    if (dirPath === undefined) throw new Error("dirPath undefined");

    // get module package.json
    var pkgJson = require(path.resolve(dirPath, 'package.json')),
        file    = path.resolve(dirPath, pkgJson.main);


    // retrieve kevoree-entities types from the project path
    var kePath            = path.resolve(dirPath, 'node_modules', 'kevoree-entities'),
        KevoreeEntity     = require(kePath).KevoreeEntity,
        AbstractComponent = require(kePath).AbstractComponent,
        AbstractGroup     = require(kePath).AbstractGroup,
        AbstractChannel   = require(kePath).AbstractChannel,
        AbstractNode      = require(kePath).AbstractNode;

    // create a new ContainerRoot
    var model = factory.createContainerRoot();

    // create packages according to "kevoree.package" specified in package.json
    if (pkgJson.kevoree && typeof (pkgJson.kevoree.package) === 'string') {
        if (PKG_PATTERN.test(pkgJson.kevoree.package)) {
            var pkgs = pkgJson.kevoree.package.split('.');

            function createPackagesTree(packages, index, model, parent) {
                // create a new package using packages[index] name
                var p = factory.createPackage();
                p.name = packages[index];

                // check recursivity condition
                if (index === packages.length - 1) {
                    // this is the last package in packages (eg. in 'org.kevoree.library.js' => this is 'js')
                    parent.addPackages(p);
                    // end recursion by sending the last package back
                    return p;
                } else {
                    // this is not the last package
                    if (parent) {
                        // this package will have a parent and a child
                        parent.addPackages(p);

                    } else {
                        // this package is the first one (eg. in 'org.kevoree.library.js' => this is 'org')
                        model.addPackages(p);
                    }

                    // recursion
                    return createPackagesTree(packages, index+1, model, p);
                }
            }

            // create packages tree and return the leaf (eg. 'org.kevoree.library.js' => leaf is 'js')
            // so that we can then add the TypeDefinition and DeployUnit to it
            var modelPkg = createPackagesTree(pkgs, 0, model, null);

            // create the project deployUnit
            var deployUnit = factory.createDeployUnit();
            deployUnit.name = pkgJson.name;
            deployUnit.version = pkgJson.version;
            deployUnit.type = 'npm';
            modelPkg.addDeployUnits(deployUnit);

            // process main file
            var Class = require(file);

            if (typeof Class == 'function') {
                var obj = new Class();
                if (obj instanceof KevoreeEntity) {
                    // this Class is a KevoreeEntity
                    if (obj instanceof AbstractComponent) {
                        genComponent(deployUnit, obj, modelPkg);

                    } else if (obj instanceof AbstractChannel) {
                        genChannel(deployUnit, obj, modelPkg);

                    } else if (obj instanceof AbstractGroup) {
                        genGroup(deployUnit, obj, modelPkg);

                    } else if (obj instanceof AbstractNode) {
                        genNode(deployUnit, obj, modelPkg);
                    }

                } else {
                    // this is not the Class you are looking for
                    if (!quiet) {
                        console.log(chalk.yellow('Ignored:')+"\n\tFile: '%s'\n\tReason: Not a KevoreeEntity (check that you have only one version of kevoree-entities in your dependency tree)", file);
                    }
                }
            }

            callback(null, model, pkgJson.kevoree.package, modelPkg.typeDefinitions.get(0));
        } else {
            callback(new Error('The given package "'+pkgJson.kevoree.package+'" in package.json is not valid (expected: '+PKG_PATTERN.toString()+')'));
        }
    } else {
        callback(new Error('Unable to find package name in "'+pkgJson.name+'" package.json'));
    }
};

module.exports = generator;