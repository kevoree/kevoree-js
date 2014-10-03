#!/usr/bin/env node
var minimist = require('minimist');
var chalk = require('chalk');
var fs = require('fs');

var argv = minimist(process.argv.slice(2), {
    alias: {
        help:    'h',
        version: 'v',
        output:  'o'
    },
    boolean: ['h', 'v', 'verbose', 'pretty'],
    string:  ['o', 'host', 'port']
});

console.log(argv);