// Created by leiko on 10/09/14 14:13
var chalk = require('chalk');
var path  = require('path');

function help(argv, callback) {
    function defaultHelp() {
        process.stdout.write('Usage:');
        process.stdout.write('\n\n');
        process.stdout.write('    '+chalk.cyan('kevoree-registry')+' <command> [<args>] [<options>]');
        process.stdout.write('\n\n');
        process.stdout.write('Commands:');
        process.stdout.write('\n\n');
        process.stdout.write('    get                   Retrieve a model from Kevoree registry');
        process.stdout.write('\n');
        process.stdout.write('    help                  Display help information about kevoree-registry');
        process.stdout.write('\n');
        process.stdout.write('    post                  Push a model to Kevoree registry');
        process.stdout.write('\n');
        process.stdout.write('    version               Output kevoree-registry version');
        process.stdout.write('\n\n');
        process.stdout.write('Options:');
        process.stdout.write('\n\n');
        process.stdout.write('    --verbose             Give more information on standard output');
        process.stdout.write('\n\n');
        process.stdout.write('See \'kevoree-registry help <command>\' for more information on a command.');
        process.stdout.write('\n');
    }

    if (argv._.length > 0) {
        if (argv._.length === 1) {
            defaultHelp();
            callback(null);
        } else {
            try {
                var cmd = require('../commands/'+argv._[1]);
                cmd.help();
                callback(null);
            } catch (err) {
                defaultHelp();
                callback(null);
            }
        }
    } else {
        defaultHelp();
        callback(null);
    }
}

module.exports = help;