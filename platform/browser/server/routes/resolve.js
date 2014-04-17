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
        var publicDir         = 'node_modules',
            installDir        = path.resolve(__dirname, '..', '..', 'client', 'dist', publicDir),
            npmInstallDir     = path.resolve(__dirname, '..', 'client-nodes', req.body.uuid, 'node_modules'),
            modulePath        = path.resolve(npmInstallDir, req.body.name),
            browserModulePath = path.resolve(installDir, req.body.name),
            moduleZip         = browserModulePath + path.sep + req.body.name + '@' + req.body.version + '.zip',
            downloadLink      = '/' + publicDir + '/' + req.body.name + '/' + req.body.name + '@' + req.body.version + '.zip'; // url always use '/' don't need to use path.sep even on Windows ;)

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
                    return res.jsonp({
                        zipPath: downloadLink,
                        zipName: req.body.name+'@'+req.body.version
                    });
                });
            });


        } else {
            // send response
            return res.jsonp({
                zipPath: downloadLink,
                zipName: req.body.name+'@'+req.body.version
            });
        }

    } else {
        return res.jsonp(JSON.parse(new Error('Sorry, for now Kevoree Browser Runtime server is only able to resolve "npm" packages.')));
    }
};