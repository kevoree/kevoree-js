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
        });
    kevoreeGen = require('./kevoree-gen-model');

if (optimist.argv.h) {
    optimist.showHelp();
    process.exit(0);
}

kevoreeGen(optimist.argv.p, optimist.argv.q, function (err) {
    if (err) {
        process.exit(1);
    }
});