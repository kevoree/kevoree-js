#!/usr/bin/env node
var optimist = require('optimist')
        .usage('Usage: $0 [-p path/to/your/project] [-q] [-h] [-v]')
        .options('p', {
            default: process.cwd(),
            describe: 'Project path'
        })
        .options('q', {
            default: false,
            describe: 'Quiet logs'
        })
        .options('h', {
            default: false,
            describe: 'Display this help'
        })
        .options('v', {
            default: false,
            describe: 'Verbose logs'
        }),
    kevoreeGen = require('./kevoree-gen-model');

if (optimist.argv.h) {
    optimist.showHelp();
    process.exit(0);
}

kevoreeGen(optimist.argv.p, {quiet: optimist.argv.q, verbose: optimist.argv.v}, function (err) {
    if (err) {
        process.exit(1);
    }
});