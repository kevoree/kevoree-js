var npm    = require('npm');
var async  = require('async');
var config = require('../../config');

var libraries = [];

// clear libraries cache function loop
setInterval(function () {
  if (libraries.length > 0) {
    var currentdate = new Date();
    console.log("Javascript core libraries cache cleared at " + currentdate.getDate() + "/"
      + (currentdate.getMonth()+1)  + "/"
      + currentdate.getFullYear() + " @ "
      + currentdate.getHours() + ":"
      + currentdate.getMinutes() + ":"
      + currentdate.getSeconds());
    libraries = []; // clear cache (TODO lock the thing because ugly things could happen here)
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
      npm.commands.search('/kevoree-comp-|kevoree-chan-|kevoree-group-|kevoree-node-/', true, function (err, modules) {
        if (err) return callback(new Error('Something went wrong while using npm.search()'));

        // npm search command succeed
        libraries.length = 0; // resetting libraries array (clear cache)
        var asyncTasks = [];
        for (var moduleName in modules) {
          (function (packageName, latest) {
            asyncTasks.push(function (iteratorCb) {
              npm.commands.view([packageName], true, function (err, view) {
                if (err) return iteratorCb(new Error('Something went wrong while using npm.view('+packageName+')'));

                var splittedName = view[latest].name.split('-');
                libraries.push({
                  groupID:    '',
                  artifactID: packageName,
                  type:       splittedName[1],
                  simpleName: splittedName[2],
                  latest:     latest,
                  versions:   view[latest].versions
                });
                iteratorCb();
              });
            });
          })(moduleName, modules[moduleName].version);
        }

        async.parallel(asyncTasks, function (err) {
          if (err) return callback(err);

          return callback(null, libraries);
        });
      });
    });
  }
}