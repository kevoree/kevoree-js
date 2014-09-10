#!/usr/bin/env node
var minimist = require('minimist');
var chalk = require('chalk');
var fs = require('fs');

var argv = minimist(process.argv.slice(2), {
    alias: {
        help:    'h',
        version: 'v',
        output:  'o',
        pretty:  'p'
    },
    boolean: ['h', 'v', 'p', 'verbose'],
    string:  ['o']
});

function cmdHandler(err) {
    if (err) {
        process.stderr.write(chalk.red('Error')+' '+err.message+'\n');
        if (argv.verbose) {
            err.stack = err.stack.split('\n');
            err.stack.splice(0, 1);
            err.stack = err.stack.join('\n');
            process.stderr.write(err.stack+'\n');
        }
        process.exit(1);
    } else {
        process.exit(0);
    }
}

var help = require('../lib/commands/help');
var version = require('../lib/commands/version');

try {
    var command = require('../lib/commands/'+argv._[0]);
    command(argv, cmdHandler);
} catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
        if (argv.v) {
            version(argv, cmdHandler);
        } else {
            help(argv, cmdHandler);
        }
    } else {
        cmdHandler(err);
        process.exit(1);
    }
}