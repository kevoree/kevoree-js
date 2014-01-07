var Class = require('pseudoclass');

/**
 * Resolver API
 * @type {Resolver}
 */
var Resolver = Class({
    toString: 'Resolver',

    /**
     *
     * @param deployUnit Kevoree DeployUnit
     * @param force [optional] boolean that indicates whether or not we should force re-installation no matter what
     * @param callback(err, Class, model)
     */
    resolve: function (deployUnit, force, callback) {},

    uninstall: function (deployUnit, force, callback) {}
});

module.exports = Resolver;