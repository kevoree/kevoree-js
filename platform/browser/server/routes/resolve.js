var http       = require('http'),
    fs         = require('fs'),
    zlib       = require('zlib'),
    tar        = require('tar'),
    AdmZip     = require('adm-zip'),
    rimraf     = require('rimraf'),
    browserify = require('browserify'),
    npm        = require('npm'),
    config     = require('./../config.js'),
    npmi       = require('npmi'),
    path       = require('path');

module.exports = function(req, res) {
    if (req.body.type == 'npm') {
        var installDir        = path.resolve('client', 'dist', 'public', 'libraries'),
            npmInstallDir     = path.resolve('.'),
            modulePath        = path.resolve(npmInstallDir, 'node_modules', req.body.name),
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
                    return res.send(500, err.message);
                }

                // installation succeeded
                fs.mkdir(browserModulePath, function () {
                    // browserify module
                    var b = browserify();
                    var bundleFile = fs.createWriteStream(path.resolve(browserModulePath, req.body.name+'-bundle.js'));
                    bundleFile.on('end', function () {
                        bundleFile.end();
                    });

                    console.log('BUNDLING...', req.body.name+'-bundle.js');
                    // set kevoree-library and kevoree-kotlin as 'provided externally' because there are bundled with
                    // kevoree-browser-runtime-client, if you don't do that, they will be loaded multiple times
                    // and the whole thing will blew up like crazy, trust me (just lost 2 hours)
                    b.external(path.resolve(npmInstallDir, 'node_modules', 'kevoree-kotlin'), {expose: 'kevoree-kotlin'})
                        .external(path.resolve(npmInstallDir, 'node_modules', 'kevoree-library'), {expose: 'kevoree-library'})
                        .require(modulePath, { expose: req.body.name })
                        .transform('brfs')// will try to get content from fs.readFileSync() into a function (to be available as a string later on)
                        .bundle({detectGlobals: false}, function (err) {
                            if (err) {
                                return res.send(500, err.message);
                            }
                        })
                        .pipe(bundleFile)
                        .on('finish', function () {
                            console.log('BUNDLE OK', req.body.name+'-bundle.js');
                            // zip browser-bundled folder
                            var zip = new AdmZip();
                            zip.addLocalFolder(browserModulePath);
                            zip.writeZip(browserModulePath+'.zip');

                            // send response
                            return res.json({
                                zipPath: downloadLink,
                                zipName: req.body.name+'@'+req.body.version,
                                requireName: modulePath
                            });
                        });
                });
            });


        } else {
            // send response
            res.json({
                zipPath: downloadLink,
                zipName: req.body.name+'@'+req.body.version,
                requireName: modulePath
            });
            return;
        }

    } else {
        res.send(500, 'Sorry, for now Kevoree Browser Runtime server is only able to resolve "npm" packages.');
    }
}