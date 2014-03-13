/**
 * Created by leiko on 12/03/14.
 */
var http       = require('http'),
    fs         = require('fs'),
    zlib       = require('zlib'),
    tar        = require('tar'),
    AdmZip     = require('adm-zip'),
    rimraf     = require('rimraf'),
    mkdirp     = require('mkdirp'),
    browserify = require('browserify'),
    npm        = require('npm'),
    config     = require('./../config.js'),
    npmi       = require('npmi'),
    path       = require('path');

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
                    console.error('Internal Server Error', err.message);
                    return res.jsonp(JSON.parse(err));
                }

                // installation succeeded
                mkdirp(browserModulePath, function () {
                    // browserify module
                    var b = browserify();
                    var bundleFile = fs.createWriteStream(path.resolve(browserModulePath, req.body.name+'-bundle.js'));
                    bundleFile.on('end', function () {
                        bundleFile.end();
                    });

                    // set kevoree-library and kevoree-kotlin as 'provided externally' because there are bundled with
                    // kevoree-browser-runtime-client, if you don't do that, they will be loaded multiple times
                    // and the whole thing will blew up like crazy, trust me (just lost 2 hours)
                    b.external(path.resolve(npmInstallDir, 'kevoree-library'), {expose: 'kevoree-library'})
                        .require(modulePath, { expose: req.body.name })
                        .transform('brfs')// will try to get content from fs.readFileSync() into a function (to be available as a string later on)
                        .bundle({detectGlobals: false}, function (err) {
                            if (err) {
                                return res.jsonp(JSON.parse(err));
                            }
                        })
                        .pipe(bundleFile)
                        .on('finish', function () {
                            // zip browser-bundled folder
                            var zip = new AdmZip();
                            zip.addLocalFolder(browserModulePath);
                            zip.writeZip(browserModulePath+'.zip');

                            // send response
                            return res.jsonp({
                                zipPath: downloadLink,
                                zipName: req.body.name+'@'+req.body.version,
                                requireName: modulePath
                            });
                        });
                });
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