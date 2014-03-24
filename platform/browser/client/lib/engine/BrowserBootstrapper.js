var Bootstrapper    = require('kevoree-commons').Bootstrapper,
    BrowserLogger   = require('./BrowserLogger'),
    NPMResolver     = require('./NPMResolver');

/**
 * Created by leiko on 12/03/14.
 */
var BrowserBootstrapper = Bootstrapper.extend({
    toString: 'BrowserBootstrapper',

    construct: function (modulesPath) {
        this.modulesPath = modulesPath;
        this.log = new BrowserLogger(this.toString());
        this.resolver = new NPMResolver(modulesPath);
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
        this.resolver.resolve(deployUnit, forceInstall, function (err, EntityClass) {
            if (err) {
                bootstrapper.log.error(err.message);
                return callback(new Error("'"+deployUnit.name+"' bootstrap failed!"));
            }

            // install success
            return callback(null, EntityClass);
        })
    },

    uninstall: function (deployUnit, callback) {
        var bootstrapper = this;
        this.resolver.uninstall(deployUnit, function (err) {
            if (err) {
                bootstrapper.log.error(err.message);
                return callback(new Error("'"+deployUnit.name+"' uninstall failed!"));
            }

            // uninstall success
            return callback(null);
        });
    }
});

module.exports = BrowserBootstrapper;