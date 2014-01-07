var path = require('path'),
    fs   = require('fs'),
    rimraf = require('rimraf');

module.exports = function cleanStuff() {
    var browseredLibzPath = path.resolve('site', 'public', 'libraries', 'browser_modules');
    fs.readdir(browseredLibzPath, function(err, files) {
        if (err) return;

        // clean libraries on server start-up (to re-download each libraries once restarted)
        files.forEach(function (file) {
            if (file != '.gitignore') {
                fs.unlink(path.resolve(browseredLibzPath, file), function (err) {
                    if (err) {
                      rimraf(path.resolve(browseredLibzPath, file), function (err) {
                        if (err) return console.error('Error cleaning "%s" directory: %s', browseredLibzPath, err.message);
                      });
                    }
                });
            }
        });
    });
}