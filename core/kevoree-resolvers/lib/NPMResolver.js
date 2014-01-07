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
  },

  resolve: function (deployUnit, forceInstall, callback) {
    if (typeof(callback) == 'undefined') {
      // "forceInstall" parameter is not specified (optional)
      callback = forceInstall;
      forceInstall = false;
    }

    var packageName = deployUnit.name,
        module      = deployUnit.name + ((deployUnit.version.length > 0) ? '@'+deployUnit.version: ''),
        loader      = new kevoree.loader.JSONModelLoader();

    function doResolve() {
      var KClass = require(path.resolve(this.modulesPath, 'node_modules', packageName));
      var jsonModel = require(path.resolve(this.modulesPath, 'node_modules', packageName, 'kevlib.json'));
      return callback(null, KClass, loader.loadModelFromString(JSON.stringify(jsonModel)).get(0));
    }

    try {
      if (forceInstall == true) {
        // trigger FORCE_INSTALL error so installation is forced
        var e = new Error();
        e.code = 'FORCE_INSTALL';
        throw e;
      }
      doResolve.bind(this)();

    } catch (err) {
      if (err.code && err.code === "MODULE_NOT_FOUND" || err.code === "FORCE_INSTALL") {
        this.log.info(this.toString(), "DeployUnit ("+module+") is not installed yet: downloading & installing it...");
        npm.load({}, function (err) {
          if (err) {
            return callback(new Error('Unable to load npm module'));
          }

          // load success
          npm.commands.install(this.modulesPath, [module], function installCallback(err) {
            if (err) {
              this.log.error(this.toString(), 'npm failed to install package \''+ module +'\'');
              return callback(new Error("Bootstrap failure"));
            }

            doResolve.bind(this)();
          }.bind(this));
        }.bind(this));
      } else throw err;
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
      npm.commands.uninstall(this.modulesPath, [module], function uninstallCallback(er) {
        if (er) {
          // failed to load package:version
          return callback(new Error('NPMResolver failed to uninstall '+module));
        }

        callback();

      }.bind(this));
    }.bind(this));
  }
});

module.exports = NPMResolver;