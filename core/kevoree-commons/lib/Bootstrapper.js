var Class = require('pseudoclass');

/**
 * Bootstrapper API
 * @type {Bootstrapper}
 */
var Bootstrapper = Class({
    toString: 'Bootstrapper',

    /**
     *
     * @param {KevoreeLogger} logger
     * @param {Resolver} resolver
     */
    construct: function (logger, resolver) {
        if (logger) {
            this.log = logger;
            if (resolver) {
                this.resolver = resolver;
            } else {
                throw new Error('No resolver given to '+this.toString()+' (you need to give a proper Resolver to your Bootstrapper)');
            }
        } else {
            throw new Error('No logger given to '+this.toString()+' (you need to give a proper KevoreeLogger to your Bootstrapper)');
        }
    },

    /**
     *
     * @param nodeName
     * @param model
     * @param callback
     */
    bootstrapNodeType: function (nodeName, model, callback) {
        callback = callback || function () {};

        var node = model.findNodesByID(nodeName);
        if (node) {
            var meta = node.typeDefinition.select('deployUnits[name=*]/filters[name=platform,value=javascript]');
            if (meta.size() > 0) {
                this.bootstrap(meta.get(0).eContainer(), false, callback);
            } else {
                callback(new Error("No DeployUnit found for '"+nodeName+"' that matches the 'javascript' platform"));
            }
        } else {
            return callback(new Error("Unable to find '"+nodeName+"' in the given model."));
        }
    },

    /**
     *
     * @param deployUnit
     * @param forceInstall [optional] boolean to indicate whether or not we should force re-installation
     * @param callback                function(Error, Clazz, ContainerRoot)
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
                bootstrapper.log.error(bootstrapper.toString(), err.stack);
                return callback(new Error("'"+deployUnit.name+"' bootstrap failed!"));
            }

            // install success
            callback(null, EntityClass, model);
        });
    },

    /**
     *
     * @param deployUnit
     * @param callback
     */
    uninstall: function (deployUnit, callback) {
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

module.exports = Bootstrapper;