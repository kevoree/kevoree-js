var Bootstrapper    = require('kevoree-commons').Bootstrapper,
  KevoreeLogger   = require('./KevoreeBrowserLogger'),
  NPMResolver     = require('./NPMResolver');

var GIT     = 'git',
    FILE    = 'file',
    NPM     = 'npm';

var BrowserBootstrapper = Bootstrapper.extend({
  toString: 'BrowserBootstrapper',

  construct: function (modulesPath) {
    this.modulesPath = modulesPath;

    this.resolvers = {};
    this.resolvers[NPM] = new NPMResolver(modulesPath);

    this.log = new KevoreeLogger(this.toString());
  },

  /**
   *
   * @param deployUnit
   * @param forceInstall [optional]
   * @param callback
   */
  bootstrap: function (deployUnit, forceInstall, callback) {
    if (typeof(callback) == 'undefined') {
      // "forceInstall" parameter is not specified (optional)
      callback = forceInstall;
      forceInstall = false;
    }

    // --- Resolvers callback
    var bootstrapper = this;
    this.resolver('resolve', deployUnit, forceInstall, function (err, EntityClass) {
      if (err) {
        bootstrapper.log.error(err.message);
        return callback(new Error("'"+deployUnit.name+"' bootstrap failed!"));
      }

      // install success
      return callback(null, EntityClass);
    });
  },

  uninstall: function (deployUnit, callback) {
    var bootstrapper = this;
    this.resolver('uninstall', deployUnit, function (err) {
      if (err) {
        bootstrapper.log.error(err.message);
        return callback(new Error("'"+deployUnit.name+"' uninstall failed!"));
      }

      // uninstall success
      return callback(null);
    });
  },

  resolver: function (action, deployUnit, forceInstall, callback) {
    var url = deployUnit ? (deployUnit.url || '') : '';

    if (url.startsWith(FILE)) {
//            this.resolvers[FILE][action](deployUnit, forceInstall, callback);
      return callback(new Error("File resolver not implemented yet"));

    } else if (url.startsWith(GIT)) {
      return callback(new Error("Git resolver not implemented yet"));

    } else {
      this.resolvers[NPM][action](deployUnit, forceInstall, callback);
    }
  }
});

module.exports = BrowserBootstrapper;