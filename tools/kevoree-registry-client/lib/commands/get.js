// Created by leiko on 10/09/14 14:16
var chalk    = require('chalk');
var fs       = require('fs');
var getModel = require('../get');

function get_(argv, callback) {
    if (argv.h) {
        get_.help();
        callback(null);
    } else {
        if (argv._.length <= 1) {
            get_.help();
            callback(null);
        } else {
            argv._.shift(); // get rid of 'get' param
            var type = argv.t ? argv.t : 'json';

            if (argv._.length === 0) {
                get_.help();
                callback(null);
            } else {
                getModel({fqns: argv._, type: type}, function (err, model) {
                    if (err) {
                        callback(err);
                    } else {
                        if (type === 'json' && argv.pretty) {
                            model = JSON.stringify(JSON.parse(model), null, 4);
                        }

                        if (argv.o) {
                            // output to a file
                            try {
                                fs.writeFileSync(argv.o, model+'\n', 'utf8');
                                process.stdout.write(chalk.green('Get ')+argv.o);
                                process.stdout.write('\n');
                                callback(null);

                            } catch (err) {
                                callback(err);
                            }

                        } else {
                            // output to stdout
                            process.stdout.write('\n');
                            process.stdout.write(model);
                            process.stdout.write('\n');
                            callback(null);
                        }
                    }
                });
            }
        }
    }
}

get_.help = function () {
    process.stdout.write('Usage:');
    process.stdout.write('\n\n');
    process.stdout.write('    '+chalk.cyan('kevoree-registry')+' '+chalk.yellow('get')+' <FQN [FQN ...]> [<options>]');
    process.stdout.write('\n\n');
    process.stdout.write('Options:');
    process.stdout.write('\n\n');
    process.stdout.write('    -o, --output=FILE     Output retrieved model to given FILE');
    process.stdout.write('\n');
    process.stdout.write('    -t, --type=TYPE       Model type TYPE = [json (default), xmi, trace]');
    process.stdout.write('\n');
    process.stdout.write('    --pretty              Pretty print (only works for JSON type)');
    process.stdout.write('\n\n');
    process.stdout.write('Description:');
    process.stdout.write('\n\n');
    process.stdout.write('    <FQN> is a fully qualified name of the form:');
    process.stdout.write('\n\n');
    process.stdout.write('        e.g    org.kevoree.library.js.JavascriptNode/5.1.2');
    process.stdout.write('\n\n');
    process.stdout.write('    The "/X.X.X" part in the FQN is optional and should not be specified if you want');
    process.stdout.write('\n');
    process.stdout.write('    to retrieve a package model.');
    process.stdout.write('\n');
    process.stdout.write('    You can specify multiple FQN in one command-line:');
    process.stdout.write('\n\n');
    process.stdout.write('        e.g    kevoree-registry get abc.def ghi.jkl mno.pqr [<options>]');
    process.stdout.write('\n');
};

module.exports = get_;