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
            var arg0 = argv._[1].split('/');
            var fqn = arg0[0];
            var version = arg0[1] ? arg0[1] : '*';
            var type = argv.t ? argv.t : 'json';

            if (!fqn) {
                get_.help();
                callback(null);
            } else {
                getModel({fqn: fqn, version: version, type: type}, function (err, model) {
                    if (err) {
                        callback(err);
                    } else {
                        if (type === 'json' && argv.p) {
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
    process.stdout.write('    '+chalk.cyan('kevoree-registry')+' '+chalk.yellow('get')+' <FQN> [<options>]');
    process.stdout.write('\n\n');
    process.stdout.write('Options:');
    process.stdout.write('\n\n');
    process.stdout.write('    -o, --output=FILE     Output retrieved model to given FILE');
    process.stdout.write('\n');
    process.stdout.write('    -t, --type=TYPE       Model type TYPE = [json (default), xmi, trace]');
    process.stdout.write('\n');
    process.stdout.write('    -p, --pretty          Pretty print (only works for JSON type)');
    process.stdout.write('\n');
};

module.exports = get_;