/**
 * Created by leiko on 12/03/14.
 */
var http            = require('http'),
    fs              = require('fs'),
    zlib            = require('zlib'),
    tar             = require('tar'),
    AdmZip          = require('adm-zip'),
    rimraf          = require('rimraf'),
    mkdirp          = require('mkdirp'),
    browserify      = require('browserify'),
    npm             = require('npm'),
    config          = require('./../config.js'),
    npmi            = require('npmi'),
    path            = require('path'),
    browserifyer    = require('../lib/browserifyer');

module.exports = function(req, res) {
    // handle POST & GET
    req.body.type = req.body.type || req.query.type;
    req.body.name = req.body.name || req.query.name;
    req.body.version = req.body.version || req.query.version;

    if (req.body.type == 'npm') {
        var installDir        = path.resolve(__dirname, '..', '..', 'client', 'dist', 'libraries'),
            npmInstallDir     = path.resolve(__dirname, '..', 'node_modules'),
            modulePath        = path.resolve(npmInstallDir, req.body.name),
            browserModulePath = path.resolve(installDir, req.body.name),
            downloadLink      = '/libraries/'+req.body.name+'.zip';

        // check if bundle as already been downloaded
        if (!fs.existsSync(browserModulePath+'.zip')) {
            var options = {
                name: req.body.name,
                version: req.body.version
            };

            var message = '';
            npmi(options, function (err) {
                if (err) {
                    message = 'Unable to install '+req.body.name;
                    console.error(message);
                    return res.send(500, message);
                }

                var moduleZip = path.resolve(installDir, req.body.name+'.zip');

                // module installed successfully: zip browserified bundle
                var zip = new AdmZip();
                zip.addLocalFile(path.resolve(modulePath, 'browser', req.body.name+'.js'));
                zip.writeZip(moduleZip);
                zip.location = moduleZip;

                // send response
                return res.jsonp({
                    zipPath: downloadLink,
                    zipName: req.body.name+'@'+req.body.version,
                    requireName: modulePath
                });
            });


        } else {
            // send response
            return res.jsonp({
                zipPath: downloadLink,
                zipName: req.body.name+'@'+req.body.version,
                requireName: modulePath
            });
        }

    } else {
        return res.jsonp(JSON.parse(new Error('Sorry, for now Kevoree Browser Runtime server is only able to resolve "npm" packages.')));
    }
};