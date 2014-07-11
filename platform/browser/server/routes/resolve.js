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
    var type = req.body.type,
        uuid = req.body.uuid,
        name = req.body.name,
        vers = req.body.version;

    if (type === 'npm') {
        var publicInstall     = config.paths.publicInstall,
            npmInstallDir     = config.paths.npmInstallDir(uuid),
            modulePath        = config.paths.modulePath(npmInstallDir, name),
            browserModulePath = config.paths.browserModulePath(publicInstall, name),
            moduleZip         = config.paths.moduleZip(browserModulePath, name, vers),
            downloadLink      = config.paths.downloadLink(name, vers);

        // check if bundle as already been downloaded
        if (!fs.existsSync(moduleZip)) {
            var options = {
                name: name,
                version: vers,
                path: path.resolve(npmInstallDir, '..')
            };

            npmi(options, function (err) {
                if (err) {
                    var message = 'Unable to install '+name;
                    console.error(message);
                    return res.send(500, message);
                }

                // module installed successfully: zip browserified bundle
                var zip = new AdmZip();
                zip.addLocalFile(path.resolve(modulePath, 'browser', name+'.js'));
                zip.writeZip(moduleZip);
                zip.location = moduleZip;

                ncp(path.resolve(modulePath, 'resources'), path.resolve(browserModulePath, 'resources'), function (err) {
                    if (err) { /* ignore error because some library do not have resources/ folder */ }

                    // send response
                    return res.json({
                        zipPath: downloadLink,
                        zipName: name+'@'+vers
                    });
                });
            });


        } else {
            // send response
            return res.json({
                zipPath: downloadLink,
                zipName: name+'@'+vers
            });
        }

    } else {
        return res.json({error: 'Sorry, for now Kevoree Browser Runtime server is only able to resolve "npm" packages.'});
    }
};