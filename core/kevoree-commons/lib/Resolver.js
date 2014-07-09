var Class = require('pseudoclass'),
    KevoreeLogger = require('./KevoreeLogger');

/**
 * Resolver API
 * @type {Resolver}
 */
var Resolver = Class({
    toString: 'Resolver',

    construct: function (modulesPath, logger) {
        this.modulesPath = modulesPath || '';
        this.log = logger || new KevoreeLogger(this.toString());
        this.repositories = [];
    },

    /**
     *
     * @param deployUnit Kevoree DeployUnit
     * @param force [optional] boolean that indicates whether or not we should force re-installation no matter what
     * @param callback function(err, Class, model)
     */
    resolve: function (deployUnit, force, callback) {},

    uninstall: function (deployUnit, force, callback) {},

    addRepository: function (url) {
        if (this.repositories.indexOf(url) === -1) this.repositories.push(url);
    }
});

module.exports = Resolver;