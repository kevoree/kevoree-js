var Bootstrapper    = require('kevoree-commons').Bootstrapper,
    NPMResolver     = require('kevoree-resolvers').NPMResolver,
    path            = require('path');

var FILE    = 'file',
    GIT     = 'git',
    NPM     = 'npm';

/**
 *
 * @type {NPMBootstrapper}
 */
module.exports = Bootstrapper.extend({
    toString: "NodeJSBootstrapper",

    /**
     *
     */
    construct: function (modulesPath, logger) {
        this.log = logger;

        this.resolvers = {};
        this.resolvers[NPM]  = new NPMResolver(modulesPath, logger);
    },

    /**
     *
     * @param deployUnit
     * @param callback(Error, Clazz, ContainerRoot)
     */
    bootstrap: function (deployUnit, forceInstall, callback) {
        if (typeof(callback) == 'undefined') {
            // "forceInstall" parameter is not specified (optional)
            callback = forceInstall;
            forceInstall = false;
        }

        // --- Resolvers callback
        var bootstrapper = this;
        this.resolver('resolve', deployUnit, forceInstall, function (err, EntityClass, model) {
            if (err) {
                bootstrapper.log.error(err.message);
                callback(new Error("'"+deployUnit.name+"' bootstrap failed!"));
                return;
            }

            // install success
            callback(null, EntityClass, model);
            return;
        });
    },

    uninstall: function (deployUnit, callback) {
        var bootstrapper = this;
        this.resolver('uninstall', deployUnit, function (err) {
            if (err) {
                bootstrapper.log.error(err.message);
                callback(new Error("'"+deployUnit.name+"' uninstall failed!"));
                return;
            }

            // uninstall success
            callback(null);
            return;
        });
    },

    resolver: function (action, deployUnit, forceInstall, callback) {
        var url = deployUnit ? (deployUnit.url || '') : '';

        if (url.startsWith(FILE)) {
            this.log.warn("File resolver not implemented yet");

        } else if (url.startsWith(GIT)) {
            this.log.warn("Git resolver not implemented yet");

        } else {
            this.resolvers[NPM][action](deployUnit, forceInstall, callback);
        }
    }
});