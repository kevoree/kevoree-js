var Resolver        = require('kevoree-commons').Resolver,
    KevoreeLogger   = require('./BrowserLogger'),
    FileSystem      = require('kevoree-commons').FileSystem,
    async           = require('async'),
    Resolve         = require('../command/network/Resolve');

/**
 * Retrieves module content from zip from server
 * @type {NPMResolver}
 *
 * Created by leiko on 12/03/14.
 */
var NPMResolver = Resolver.extend({
    toString: 'NPMResolver',

    construct: function (modulesPath, logger, runtime) {
        this.modulesPath = modulesPath;
        this.log = logger;
        this.resolveCmd = new Resolve(runtime);
    },

    resolve: function (deployUnit, forceInstall, callback) {
        this._super(deployUnit, forceInstall, callback);
        if (typeof(callback) === 'undefined') {
            // "forceInstall" parameter is not specified (optional)
            callback = forceInstall;
            forceInstall = false;
        }

        // forward resolving request to server
        this.resolveCmd.execute(deployUnit, forceInstall, function (err, resp) {
            if (err) {
                if (err.responseText.length === 0) {
                    err.responseText = "Kevoree Runtime server was not able to process '/resolve' request ("+deployUnit.name+":"+deployUnit.version+")";
                }
                return callback(new Error(err.responseText));
            }

            // server response contains a zipPath & name of the requested module package (retrieved server-side from npm registry)
            // other browser that don't support FileSystem API
            var xhr = new XMLHttpRequest();
            xhr.open('GET', resp.zipPath, true);
            xhr.responseType = 'blob';

            xhr.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        var zip = new JSZip(e.target.result);
                        var entry = zip.file(deployUnit.name + '.js');
                        // TODO all namespaces are available to dynamically loaded modules resulting
                        // TODO in a very huge leak for the browser runtime itself
                        // TODO This is an incomplete list of available "globals" in each module)
                        // TODO {global: null, window: null, document: null, $: null, jQuery: null}
                        eval(entry.data);
                        var ModuleEntry = require(deployUnit.name);
                        callback(null, ModuleEntry);
                    };
                    reader.readAsArrayBuffer(this.response);
                }
            };

            xhr.send();
        });
    },

    uninstall: function (deployUnit, callback) {
        this._super(deployUnit, callback);
        // TODO unload from memory
        callback();
    }
});

module.exports = NPMResolver;