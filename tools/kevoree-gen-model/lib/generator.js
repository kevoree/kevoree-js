'use strict';

var path = require('path'),
  chalk = require('chalk'),
  genComponent = require('./genComponent'),
  genChannel = require('./genChannel'),
  genGroup = require('./genGroup'),
  genNode = require('./genNode'),
  kevoree = require('kevoree-library'),
  Entity = require('kevoree-entities'),
  modelValidator = require('kevoree-validator'),
	kHash = require('kevoree-hash');

// constants
var NAMESPACE_PATTERN = /^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*$/;

// init Kevoree factory
var factory = new kevoree.factory.DefaultKevoreeFactory();

function createPackagesTree(namespace, model) {
  var deepestPkg;
  var pkg;
  namespace.split('.').forEach(function (name, index, names) {
    var subPkg = factory.createPackage();
    subPkg.name = name;
    if (pkg) {
      pkg.addPackages(subPkg);
    } else {
      model.addPackages(subPkg);
    }
    pkg = subPkg;
    if (index + 1 === names.length) {
      deepestPkg = subPkg;
    }
  });
  return deepestPkg;
}

function getTypeDefinitionName(Class, filename) {
  if (Class.prototype.toString() === Entity.AbstractComponent.prototype.toString() ||
    Class.prototype.toString() === Entity.AbstractNode.prototype.toString() ||
    Class.prototype.toString() === Entity.AbstractGroup.prototype.toString() ||
    Class.prototype.toString() === Entity.AbstractChannel.prototype.toString()) {
    if (Class.name === 'PseudoClass') {
      var base = path.basename(filename);
      var ext = path.extname(base);
      return base.substr(0, base.length - ext.length);
    } else {
      return Class.name;
    }
  } else {
    return Class.prototype.toString();
  }
}

/**
 *
 * @param {String} dirPath
 * @param {Boolean} quiet
 * @param {Function} callback
 */
var generator = function generator(dirPath, quiet, callback) {
  if (dirPath === undefined) {
    throw new Error('dirPath undefined');
  }

  // get module package.json
  var pkgJson = require(path.resolve(dirPath, 'package.json')),
    file = path.resolve(dirPath, pkgJson.main);

  // create a new ContainerRoot
  var model = factory.createContainerRoot();
  factory.root(model);

  // create packages according to "kevoree.namespace" specified in package.json
  if (pkgJson.kevoree && typeof (pkgJson.kevoree.namespace) === 'string') {
    if (NAMESPACE_PATTERN.test(pkgJson.kevoree.namespace)) {
      // create packages tree and return the leaf (eg. 'org.kevoree.library.js' => leaf is 'js')
      // so that we can then add the TypeDefinition and DeployUnit to it
      var leafPkg = createPackagesTree(pkgJson.kevoree.namespace, model);

      // create the project deployUnit
      var deployUnit = factory.createDeployUnit();
			deployUnit.hashcode = kHash(dirPath);
			deployUnit.name = pkgJson.name;
			deployUnit.version = pkgJson.version;
			var type = factory.createValue();
			type.name = 'platform';
			type.value = 'js';
			deployUnit.addFilters(type);
			leafPkg.addDeployUnits(deployUnit);

			// process main file
			var Class = require(file);
			var tdef;

			if (Object.getPrototypeOf(Class.prototype).toString() === Entity.AbstractComponent.prototype.toString()) {
				tdef = genComponent(deployUnit, Class);
			} else if (Object.getPrototypeOf(Class.prototype).toString() === Entity.AbstractChannel.prototype.toString()) {
				tdef = genChannel(deployUnit, Class);
			} else if (Object.getPrototypeOf(Class.prototype).toString() === Entity.AbstractGroup.prototype.toString()) {
				tdef = genGroup(deployUnit, Class);
			} else if (Object.getPrototypeOf(Class.prototype).toString() === Entity.AbstractNode.prototype.toString()) {
				tdef = genNode(deployUnit, Class);
			} else {
				if (!quiet) {
					process.stdout.write(chalk.yellow('Ignored:') + '\n\tFile: ' + file + '\n\tReason: Not a KevoreeEntity (check that you have only one version of kevoree-entities in your dependency tree)');
					callback(new Error('This is not the class you are looking for'));
					return;
				}
			}

			// add KevoreeJS deployUnit to the TypeDefinition
			tdef.name = getTypeDefinitionName(Class, pkgJson.main);
			var version;
			if ((version = Class.prototype.tdef_version) || (version = Class.tdef_version)) {
				tdef.version = version;
				tdef.addDeployUnits(deployUnit);

				if (pkgJson.description) {
					var desc = factory.createValue();
					desc.name = 'description';
					desc.value = pkgJson.description;
					tdef.addMetaData(desc);
				}

				// add TypeDefinition to the specified kevoree package
				leafPkg.addTypeDefinitions(tdef);

				var error;
				try {
					modelValidator(model);
				} catch (err) {
					error = err;
				} finally {
					callback(error, model, pkgJson.kevoree.namespace, leafPkg.typeDefinitions.get(0), deployUnit);
				}
			} else {
				callback(new Error('The TypeDefinition must specify a version with a named static property: "tdef_version"'));
			}
    } else {
      callback(new Error('The given namespace "' + pkgJson.kevoree.namespace + '" in package.json is not valid (expected: ' + NAMESPACE_PATTERN.toString() + ')'));
    }
  } else {
    callback(new Error('Unable to find "kevoree.namespace" property in "' + pkgJson.name + '" package.json'));
  }
};

module.exports = generator;
