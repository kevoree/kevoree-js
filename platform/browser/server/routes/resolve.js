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
            npmInstallDir     = path.resolve(__dirname,  '..', 'node_modules'),
            modulePath        = path.resolve(npmInstallDir, req.body.name),
            browserModulePath = path.resolve(installDir, req.body.name),
            downloadLink      = '/libraries/'+req.body.name+'.zip';

        // check if bundle as already been downloaded
        if (!fs.existsSync(browserModulePath+'.zip')) {
            var options = {
                name: req.body.name,
                version: req.body.version
            };

            npmi(options, function (err) {
                if (err) {
                    console.error('Unable to install '+req.body.name);
                    return res.send(500, 'Unable to install '+req.body.name);
                }

                setTimeout(function () {
                    // installation succeeded
                    mkdirp(browserModulePath, function () {
                        // browserify module
                        var options = {
                            installDir: installDir,
                            npmInstallDir: npmInstallDir,
                            external: {
                                'kevoree-library': path.resolve(npmInstallDir, 'kevoree-library')
                            }
                        }
                        browserifyer(req.body.name, options, function (err) {
                            if (err) {
                                console.error('Unable to browserify '+req.body.name);
                                return res.send(500, 'Unable to browserify '+req.body.name);
                            }

                            // send response
                            return res.jsonp({
                                zipPath: downloadLink,
                                zipName: req.body.name+'@'+req.body.version,
                                requireName: modulePath
                            });
                        });
                    });
                }, 1000);
            });


        } else {
            // send response
            res.jsonp({
                zipPath: downloadLink,
                zipName: req.body.name+'@'+req.body.version,
                requireName: modulePath
            });
            return;
        }

    } else {
        return res.jsonp(JSON.parse(new Error('Sorry, for now Kevoree Browser Runtime server is only able to resolve "npm" packages.')));
    }
}