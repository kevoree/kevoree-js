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
    // get project version for deployUnits
    var projectPackageJson = require(path.resolve(dirPath, 'package.json'));

    // get every file path recursively
    walk(dirPath, ['node_modules'], function (err, files) {
      if (err) return callback(err);

      // walk succeed - create a new ContainerRoot
      var model = factory.createContainerRoot();

      // create a javascript library for the model
      var library = factory.createTypeLibrary();
      library.name = 'Javascript';
      model.addLibraries(library);

      // create the project deployUnit
      var deployUnit = factory.createDeployUnit();
      deployUnit.name = projectPackageJson.name;
      deployUnit.version = projectPackageJson.version;
      deployUnit.type = 'npm';
      model.addDeployUnits(deployUnit);

      // for each file, update model
      files.forEach(function (file) {
        var typeDef = processFile(file, deployUnit, model);
        if (typeof(typeDef) !== 'undefined' && typeDef != null) {
          // set every generated typedefinition to be in the Javascript library
          typeDef.version = projectPackageJson.version;
          library.addSubTypes(typeDef);
        }
      });

      return callback(null, model);
    });

  } catch (err) {
    return callback(err);
  }
};

/**
 * Recursively walk through a directory tree filling a "files" array
 * with all the files encountered during the walk (excluding those
 * given in the "excludes" param array)
 * On error or when its job is done it will call the third argument.
 * So this is supposed to be a function that has 2 arguments (err, files)
 * If "err" is defined = something went wrong
 * If "err" undefined = woot, you have all the files in the "files" array argument
 *
 * @param dir root dir to walk through
 * @param excludes array of files/directory/names to exclude from results (do not give a full path, just filename or directory name)
 * @param done callback(err, files)
 */
var walk = function(dir, excludes, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);

    // readdir success
    var pending = list.length;
    if (!pending) return done(null, results);

    // process excludes
    list.diff(excludes);
    pending = list.length;
    if (!pending) return done(null, results);

    list.forEach(function (file) {
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, excludes, function(err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          if (getExtension(file) == '.js') {
            results.push(file);
          }
          if (!--pending) done(null, results);
        }
      });
    });
  });
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
}

function getExtension(filename) {
  var i = filename.lastIndexOf('.');
  return (i < 0) ? '' : filename.substr(i);
}

/**
 * Removes elements from the given array parameter from the array
 * var files = ['index.js', 'node_modules', 'README.md'];
 * var excludes = ['node_modules'];
 * files.diff(excludes) => ['index.js', 'README.md'];
 *
 * @param array elements to remove from array
 */
Array.prototype.diff = function diff(array) {
  for (var i in array) {
    do {
      var index = this.indexOf(array[i]);
      // if item is in 'this' array: remove it
      if (index > -1) this.splice(index, 1);
      // keep doing this until there is no more array[i] item in 'this' array
    } while (index > -1);
  }
}

module.exports = generator;