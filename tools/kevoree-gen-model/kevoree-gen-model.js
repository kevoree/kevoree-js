var path    = require('path'),
    fs      = require('fs'),
    chalk   = require('chalk'),
    gen     = require('./lib/generator'),
    kevoree = require('kevoree-library').org.kevoree;

module.exports = function (dirPath, logLevel, callback) {
    var quiet    = logLevel.quiet    || false,
        verbose  = logLevel.verbose  || false,
        callback = callback || function () {};

    if (quiet) {
        var noop = function () {};
        for (var method in console) {
            console[method] = noop;
        }
    }

    function genCallback(err, model) {
        if (err) {
            console.error(chalk.red('Model generation failed!')+'\nError: '+err.message);
            return process.nextTick(function () {
                callback(err);
            });
        }

        if (model.typeDefinitions.size() > 0) {
            if (verbose) {
                var tdef = model.typeDefinitions.get(0);
                console.log('\nTypeDefinition: %s', tdef.name);
                console.log('Version: \t%s', tdef.version);
                console.log('DeployUnit: \t%s:%s', tdef.deployUnit.type, tdef.deployUnit.name);
                if (tdef.dictionaryType) {
                    // dictionary logging
                    var dic = [];
                    var attrs = tdef.dictionaryType.attributes.iterator();
                    while (attrs.hasNext()) {
                        var attr = attrs.next();
                        var value = attr.name + ':' + attr.datatype;
                        if (typeof (attr.defaultValue) === 'string' && attr.defaultValue.length > 0) {
                            value += ' ("'+attr.defaultValue+'")';
                        } else {
                            value += ' ('+attr.defaultValue+')';
                        }
                        if (!attr.optional) {
                            value = chalk.underline(value);
                        }
                        if (attr.fragmentDependant) {
                            value = chalk.inverse(value);
                        }
                        dic.push(value);
                    }
                    if (dic.length > 0) {
                        console.log('Dictionary: \t[ %s ]', dic.join(', '));
                    }

                }
                if (tdef.provided) {
                    // provided port logging
                    var provided = [];
                    var providedIt = tdef.provided.iterator();
                    while (providedIt.hasNext()) {
                        provided.push(providedIt.next().name);
                    }
                    if (provided.length > 0) {
                        console.log('Input port(s): \t[ %s ]', provided.join(', '));
                    }
                }
                if (tdef.required) {
                    // required port logging
                    var required = []
                    var requiredIt = tdef.required.iterator();
                    while (requiredIt.hasNext()) {
                        required.push(requiredIt.next().name);
                    }
                    if (required.length > 0) {
                        console.log('Output port(s): [ %s ]', required.join(', '));
                    }
                }
            }
            console.log((verbose ? '\n' : '')+chalk.green('Model generation done'));
        } else {
            return genCallback(new Error('No TypeDefinition found in project'));
        }

        var jsonSerializer = new kevoree.serializer.JSONModelSerializer(),
            filepath = path.resolve(dirPath, 'kevlib.json'),
            // hack to indent output string properly
            beautifulModel = JSON.stringify(JSON.parse(jsonSerializer.serialize(model)), null, 4);

        fs.writeFile(filepath, beautifulModel, function(err) {
            if(err) {
                return genCallback(err);
            } else {
                console.log("\nModel 'kevlib.json' saved at %s", path.relative(process.cwd(), filepath));
                return process.nextTick(callback);
            }
        });
    }

    fs.lstat(dirPath, function (err, stats) {
        if (err) {
            return genCallback(err);
        }

        if (stats.isFile()) {
            // it is a file
            dirPath = path.resolve(dirPath, '..'); // use this file's folder as root folder
            gen(dirPath, verbose, genCallback);

        } else if (stats.isDirectory()) {
            gen(dirPath, verbose, genCallback);

        } else {
            return genCallback(new Error("You should give the path to a folder in argument."));
        }
    });
};