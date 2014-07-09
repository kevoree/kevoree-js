var Bootstrapper    = require('kevoree-commons').Bootstrapper,
    NPMResolver     = require('kevoree-resolvers').NPMResolver,
    path            = require('path');

/**
 *
 * @type {NodeJSBootstrapper}
 */
var NodeJSBootstrapper = Bootstrapper.extend({
    toString: "NodeJSBootstrapper",

    /**
     *
     */
    construct: function (modulesPath, logger, resolver) {
        this.log = logger;
        this.resolver = resolver || new NPMResolver(modulesPath, logger);
    },

    /**
     *
     * @param deployUnit
     * @param forceInstall
     * @param callback function(err, Clazz, ContainerRoot)
     */
    bootstrap: function (deployUnit, forceInstall, callback) {
        this._super(deployUnit, forceInstall, callback);
        if (!callback) {
            // "forceInstall" parameter is not specified (optional)
            callback = forceInstall;
            forceInstall = false;
        }

        // --- Resolvers callback
        var bootstrapper = this;
        this.resolver.resolve(deployUnit, forceInstall, function (err, EntityClass, model) {
            if (err) {
                bootstrapper.log.error(bootstrapper.toString(), err.stack);
                return callback(new Error("'"+deployUnit.name+"' bootstrap failed!"));
            }

            // install success
            callback(null, EntityClass, model);
        });
    },

    uninstall: function (deployUnit, callback) {
        this._super(deployUnit, callback);
        var bootstrapper = this;
        this.resolver.uninstall(deployUnit, function (err) {
            if (err) {
                bootstrapper.log.error(bootstrapper.toString(), err.stack);
                callback(new Error("'"+deployUnit.name+"' uninstall failed!"));
                return;
            }

            // uninstall success
            callback(null);
        });
    }
});

module.exports = NodeJSBootstrapper;