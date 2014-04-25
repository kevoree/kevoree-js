/**
 * Created by leiko on 12/03/14.
 */
var fs      = require('fs'),
    AdmZip  = require('adm-zip'),
    ncp     = require('ncp').ncp,
    config  = require('./../config.js'),
    npmi    = require('npmi'),
    path    = require('path');

module.exports = function(req, res) {
    if (req.body.type == 'npm') {
        var publicInstall     = config.paths.publicInstall,
            npmInstallDir     = config.paths.npmInstallDir(req.body.uuid),
            modulePath        = config.paths.modulePath(npmInstallDir, req.body.name),
            browserModulePath = config.paths.browserModulePath(publicInstall, req.body.name),
            moduleZip         = config.paths.moduleZip(browserModulePath, req.body.name, req.body.version),
            downloadLink      = config.paths.downloadLink(req.body.name, req.body.version);

        // check if bundle as already been downloaded
        if (!fs.existsSync(browserModulePath+'.zip')) {
            var options = {
                name: req.body.name,
                version: req.body.version,
                path: path.resolve(npmInstallDir, '..')
            };

            npmi(options, function (err) {
                if (err) {
                    var message = 'Unable to install '+req.body.name;
                    console.error(message);
                    return res.send(500, message);
                }

                // module installed successfully: zip browserified bundle
                var zip = new AdmZip();
                zip.addLocalFile(path.resolve(modulePath, 'browser', req.body.name+'.js'));
                zip.writeZip(moduleZip);
                zip.location = moduleZip;

                ncp(path.resolve(modulePath, 'resources'), path.resolve(browserModulePath, 'resources'), function (err) {
                    if (err) { /* ignore error because some library do not have resources/ folder */ }

                    // send response
                    return res.json({
                        zipPath: downloadLink,
                        zipName: req.body.name+'@'+req.body.version
                    });
                });
            });


        } else {
            // send response
            return res.json({
                zipPath: downloadLink,
                zipName: req.body.name+'@'+req.body.version
            });
        }

    } else {
        return res.json(JSON.parse(new Error('Sorry, for now Kevoree Browser Runtime server is only able to resolve "npm" packages.')));
    }
};