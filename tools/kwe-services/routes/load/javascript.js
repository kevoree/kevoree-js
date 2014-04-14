var npm    = require('npm');
var async  = require('async');
var config = require('../../config');
var rimraf = require('rimraf');
var path   = require('path');

var libraries = [];
var canClear = true;
var clearId = null;

// clear libraries cache function loop
setInterval(function clearCache() {
    if (libraries.length > 0) {
        if (canClear) {
            // we can clear cache now
            clearTimeout(clearId);
            // rm library module directory if any
            for (var i in libraries) {
                var modulePath = path.resolve('node_modules', libraries[i].artifactID);
                (function (modulePath) {
                    rimraf(modulePath, function (err) {
                        if (err) {
                            console.log('Unable to rimraf "'+modulePath+'".\nError: '+err.message);
                        }
                    });
                })(modulePath);
            }

            var currentdate = new Date();
            console.log("Javascript core libraries cache cleared (" + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/"
                + currentdate.getFullYear() + " @ "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds() + ')');
            libraries.length = 0;

        } else {
            // clear old task if any
            clearTimeout(clearId);
            // restart a task in 2000ms
            clearId = setTimeout(clearCache, 2000);
        }
    }
}, config.CLEAR_LIBS); // do this every CLEAR_LIBS ms

module.exports = function (callback) {
    if (libraries.length > 0) {
        console.log('Javascript core libraries loaded from cache');
        return callback(null, libraries);

    } else {
        // load javascript libraries from NPM registry
        console.log('Loading javascript core libraries from npm registry...');
        npm.load({}, function (err) {
            if (err) return callback(new Error('Unable to load npm server-side.'));

            // search for kevoree libraries using npm
            npm.commands.search('/^(kevoree-comp-|kevoree-chan-|kevoree-group-|kevoree-node-)[\\w-]+/', true, function (err, modules) {
                if (err) return callback(new Error('Something went wrong while using npm.search()'));

                // npm search command succeed
                libraries.length = 0; // resetting libraries array (clear cache)
                canClear = false;
                var asyncTasks = [];
                for (var name in modules) {
                    (function (module) {
                        if (module.version.length !== 0 && (module.keywords.indexOf('kevoree-std-lib') !== -1)) { // workaround https://github.com/npm/npm/issues/5033
                            asyncTasks.push(function (iteratorCb) {
                                npm.commands.view([module.name], true, function (err, view) {
                                    if (err) return iteratorCb(new Error('Something went wrong while using npm.view('+module.name+')'));

                                    var splittedName = view[module.version].name.split('-');
                                    libraries.push({
                                        groupID:    '',
                                        artifactID: module.name,
                                        type:       splittedName[1],
                                        simpleName: splittedName[2],
                                        latest:     module.version,
                                        versions:   view[module.version].versions
                                    });
                                    iteratorCb();
                                });
                            });
                        }

                    })(modules[name]);
                }

                async.parallel(asyncTasks, function (err) {
                    if (err) {
                        callback(err);
                        canClear = true;
                        return;
                    }

                    callback(null, libraries);
                    canClear = true;
                });
            });
        });
    }
}