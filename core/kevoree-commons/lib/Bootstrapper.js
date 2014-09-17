var Class = require('pseudoclass'),
    async = require('async');

/**
 * Bootstrapper API
 * @type {Bootstrapper}
 */
var Bootstrapper = Class({
    toString: 'Bootstrapper',

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
    bootstrap: function (deployUnit, forceInstall, callback) {},

    /**
     *
     * @param deployUnit
     * @param callback
     */
    uninstall: function (deployUnit, callback) {}
});

module.exports = Bootstrapper;