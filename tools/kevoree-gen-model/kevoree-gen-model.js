var path        = require('path'),
    fs          = require('fs'),
    chalk       = require('chalk'),
    generator   = require('./lib/generator'),
    kevoree     = require('kevoree-library').org.kevoree;

module.exports = function (dirPath, quiet, callback) {
    if (typeof (quiet) === 'function') {
        callback = quiet;
        quiet = false;
    }

    if (typeof (quiet) === 'undefined') { quiet = false; }

    /**
     * Handles Error object
     * @param err
     */
    function errHandler(err) {
        process.stderr.write(chalk.red('Model generation failed!')+'\n');

        switch (err.code) {
            default:
            case 'PARSE_FAIL':
                if (!quiet) {
                    process.stderr.write('\n'+err.stack+'\n');
                }
                break;

            case 'ENOENT':
                if (!quiet) {
                    process.stderr.write('\n'+err.stack.replace('ENOENT, lstat ', 'unable to find ')+'\n');
                }
                break;
        }
        callback(err);
    }

    /**
     * Handles generation logs & file
     * @param model
     * @param pkg
     * @param tdef
     * @param deployUnit
     */
    function genLogsAndFile(model, pkg, tdef, deployUnit) {
        if (!quiet) {
            process.stdout.write('Package:         ' + pkg+'\n');
            process.stdout.write('TypeDefinition:  ' + tdef.name+'\n');
            process.stdout.write('Version:         ' + tdef.version+'\n');
            process.stdout.write('DeployUnit:      ' + deployUnit.name+'\n');
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
                    process.stdout.write('Dictionary:      [ ' + dic.join(', ') + ' ]\n');
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
                    process.stdout.write('Input port(s):   [ ' + provided.join(', ') + ' ]\n');
                }
            }
            if (tdef.required) {
                // required port logging
                var required = [];
                var requiredIt = tdef.required.iterator();
                while (requiredIt.hasNext()) {
                    required.push(requiredIt.next().name);
                }
                if (required.length > 0) {
                    process.stdout.write('Output port(s):  [ ' + required.join(', ') + ' ]\n');
                }
            }
        }

        if (!quiet) {
            process.stdout.write((!quiet ? '\n' : '')+chalk.green('Model generation done'));
        }

        var factory         = new kevoree.factory.DefaultKevoreeFactory(),
            jsonSerializer  = factory.createJSONSerializer(),
            filepath        = path.resolve(dirPath, 'kevlib.json'),
            prettyModel     = JSON.stringify(JSON.parse(jsonSerializer.serialize(model)), null, 4);

        fs.writeFile(filepath, prettyModel, function(err) {
            if(err) {
                errHandler(err);
            } else {
                if (!quiet) {
                    console.log("\nModel 'kevlib.json' saved at %s", path.relative(process.cwd(), filepath));
                }
                callback();
            }
        });
    }

    fs.lstat(dirPath, function (err, stats) {
        if (err) {
            errHandler(err);
        } else {
            if (stats.isFile() || stats.isDirectory()) {
                if (stats.isFile()) {
                    dirPath = path.resolve(dirPath, '..'); // use this file's folder as root folder
                }

                // execute model generator
                try {
                    generator(dirPath, quiet, function (err, model, pkg, tdef, deployUnit) {
                        if (err) {
                            errHandler(err);
                        } else {
                            genLogsAndFile(model, pkg, tdef, deployUnit);
                        }
                    });
                } catch (err) {
                    errHandler(err);
                }
            } else {
                errHandler(new Error("You should give the path to a folder in argument."));
            }
        }
    });
};