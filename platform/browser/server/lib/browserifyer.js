var browserify  = require('browserify'),
    path        = require('path'),
    fs          = require('fs'),
    AdmZip      = require('adm-zip'),
    mkdirp      = require('mkdirp'),
    rimraf      = require('rimraf');

/**
 * Created by leiko on 13/03/14.
 */
module.exports = function (name, options, callback) {
    if (!callback) {
        callback = options;
        options = {};
    }
    options = options || {};
    options.bundleExt = options.bundleExt || '-bundle.js';
    options.installDir = options.installDir || '.';
    options.npmInstallDir = options.npmInstallDir || '.';
    options.external = options.external || {};

    var bundleFolder = path.resolve(options.installDir, name);
    mkdirp(bundleFolder, function () {
        var bundlePath = path.resolve(bundleFolder, name + options.bundleExt);
        var bundleFile = fs.createWriteStream(bundlePath, 'utf8');

        // browserify module
        var b = browserify({transform: 'brfs'});

        // use as external libraries
        for (var extName in options.external) {
            b.external(options.external[extName], { expose: extName});
        }

        b.require(path.resolve(options.npmInstallDir, name), { expose: name });

        b.bundle({detectGlobals: true}, function (err) {
            if (err) {
                return callback(err);
            }
        }).pipe(bundleFile).on('finish', function () {
            // zip browser-bundled folder
            var zip = new AdmZip();
            zip.addLocalFile("/home/me/some_picture.png");
            zip.writeZip(bundleFolder+'.zip');
            zip.location = bundlePath;

            rimraf(bundleFolder, function (err) {
                if (err) {
                    console.warn('Unable to delete directory ', bundleFolder);
                    return callback(null, zip);
                }

                return callback(null, zip);
            });
        });
    });
};