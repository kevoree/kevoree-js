var Bootstrapper = require('kevoree-commons').Bootstrapper;

/**
 *
 * @type {BrowserBootstrapper}
 */
module.exports = Bootstrapper.extend({
    toString: "BrowserBootstrapper",

    /**
     *
     */
    construct: function (logger, resolver) {
        this.log = logger;
        this.resolver = resolver;
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
        this.resolver.resolve(deployUnit, forceInstall, function (err, EntityClass, model) {
            if (err) {
                this.log.error(err.message);
                callback(new Error("'"+deployUnit.name+"' bootstrap failed!"));
                return;
            }

            // install success
            callback(null, EntityClass, model);
        }.bind(this));
    },

    uninstall: function (deployUnit, callback) {
        this.resolver.uninstall(deployUnit, function (err) {
            if (err) {
                this.log.error(err.message);
                callback(new Error("'"+deployUnit.name+"' uninstall failed!"));
                return;
            }

            // uninstall success
            callback(null);
        }.bind(this));
    }
});