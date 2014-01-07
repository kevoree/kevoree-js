var Resolver      = require('kevoree-commons').Resolver,
    KevoreeLogger = require('kevoree-commons').KevoreeLogger,
    kevoree       = require('kevoree-library').org.kevoree,
    npm           = require('npm'),
    path          = require('path');

var NPMResolver = Resolver.extend({
  toString: 'NPMResolver',

  construct: function (modulesPath, logger) {
    this.modulesPath = modulesPath || '';
    this.log = logger || new KevoreeLogger(this.toString());
    this.log.debug(this.toString(), 'modulesPath= '+this.modulesPath);
  },

  resolve: function (deployUnit, forceInstall, callback) {
    if (typeof(callback) == 'undefined') {
      // "forceInstall" parameter is not specified (optional)
      callback = forceInstall;
      forceInstall = false;
    }

    var packageName = deployUnit.name,
        module      = deployUnit.name + ((deployUnit.version.length > 0) ? '@'+deployUnit.version: ''),
        loader      = new kevoree.loader.JSONModelLoader(),
        pkgPath     = path.resolve(this.modulesPath, 'node_modules', packageName); // default npm module location
    
    function doResolve() {
      var KClass = require(pkgPath);
      var jsonModel = require(path.resolve(pkgPath, 'kevlib.json'));
      try {
        var model = loader.loadModelFromString(JSON.stringify(jsonModel)).get(0);
        return callback(null, KClass, model);
      } catch (err) {
        // something went wrong while loading model :/
        return callback(err);
      }
    }
    
    function resolveFromRegistry(installPath) {
      npmInstall(installPath, module, function (err) {
        if (err) {
          this.log.error(this.toString(), 'npm failed to install package \''+ module +'\'');
          return callback(new Error("Bootstrap failure"));
        }
        // npm install succeed so library should be installed as an npm module: go resolve
        doResolve();
      });
    }
    
    // first of all: is "forceInstall" flag set to true ?
    if (forceInstall == true) {
      // user wants to reinstall library
      
    } else {
      // we do not need to reinstall the library if it has already been installed
      // lets check if it has been installed
      if (isAvailable(pkgPath)) {
        // library is already installed: great! go callback
        doResolve();
      } else {
        // library is not installed as an npm module
        // lets try to check if the current directory contains the library
        // so that we can install it with the local content
        try {
          var pkg = require(path.resolve('.', 'package.json'));
          if (pkg.name === packageName) {
            // current directory contains the library
            npmInstall(this.modulesPath, path.resolve('.'), function (err) {
              if (err) {
                this.log.error(this.toString(), 'npm failed to install package \''+ path.resolve('.') +'\'');
                return callback(new Error("Bootstrap failure"));
              }
              // library should now be installed as an npm module
              doResolve();
            });
          } else {
            // well unable to find module locally, lets try to resolve it from npm registry
            resolveFromRegistry(this.modulesPath);
          }
        } catch (err) {
          // unable to require current directory package.json, lets try to resolve module from npm registry
          resolveFromRegistry(this.modulesPath);
        }
      }
    }
  },

  uninstall: function (deployUnit, callback) {
    npm.load({}, function (err) {
      if (err) {
        // npm load error
        return callback(new Error('NPMResolver error: unable to load npm module'));
      }

      var module = deployUnit.name + ((deployUnit.version.length > 0) ? '@'+deployUnit.version: '');

      // load success
      npm.commands.uninstall(this.modulesPath, [module], function (er) {
        if (er) {
          // failed to load package:version
          return callback(new Error('NPMResolver failed to uninstall '+module));
        }

        callback();

      }.bind(this));
    }.bind(this));
  }
});

function isAvailable(modulePath) {
  try {
    require.resolve(modulePath);
    return true;
  } catch (err) {}
  return false;
}

function npmInstall(installPath, module, callback) {
  npm.load({}, function (err) {
    if (err) return callback(err);
    
    npm.commands.install(installPath, [module], function (err) {
      if (err) return callback(err);
      
      return callback();
    })
  });
}

module.exports = NPMResolver;