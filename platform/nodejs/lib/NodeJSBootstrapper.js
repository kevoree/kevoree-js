var Bootstrapper    = require('kevoree-commons').Bootstrapper,
    NPMResolver     = require('kevoree-resolvers').NPMResolver,
    path            = require('path');

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
        this.resolver = new NPMResolver(modulesPath, logger);
    },

    /**
     *
     * @param deployUnit
     * @param callback(Error, Clazz, ContainerRoot)
     */
    bootstrap: function (deployUnit, forceInstall, callback) {
        if (!callback) {
            // "forceInstall" parameter is not specified (optional)
            callback = forceInstall;
            forceInstall = false;
        }

        // --- Resolvers callback
        var bootstrapper = this;
        this.resolver.resolve(deployUnit, forceInstall, function (err, EntityClass, model) {
            if (err) {
                bootstrapper.log.error(err.message);
                return callback(new Error("'"+deployUnit.name+"' bootstrap failed!"));
            }

            // install success
            callback(null, EntityClass, model);
        });
    },

    uninstall: function (deployUnit, callback) {
        var bootstrapper = this;
        this.resolver.uninstall(deployUnit, function (err) {
            if (err) {
                bootstrapper.log.error(err.message);
                callback(new Error("'"+deployUnit.name+"' uninstall failed!"));
                return;
            }

            // uninstall success
            callback(null);
        });
    }
});