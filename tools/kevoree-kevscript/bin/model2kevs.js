#!/usr/bin/env node

var path     = require('path'),
    chalk    = require('chalk'),
    fs       = require('fs'),
    optimist = require('optimist')
        .usage('Usage: $0 <path/to/a/model.json> [-o path/to/output/model.kevs]')
        .demand(['o'])
        .alias('o', 'output')
        .describe('o', 'Where to write the output Kevoree Kevscript model')
        .default('o', 'model.kevs'),
    KevScript = require('./../lib/KevScript'),
    kevoree   = require('kevoree-library').org.kevoree;

if (optimist.argv._.length === 1) {
    var input = path.resolve(optimist.argv._[0]);
    var output = path.resolve(optimist.argv.o);
    var factory = new kevoree.factory.DefaultKevoreeFactory();
    var loader = factory.createJSONLoader();
    var kevs = new KevScript();

    fs.readFile(input, 'utf8', function (err, data) {
        if (err) throw err;

        var script = kevs.parseModel(loader.loadModelFromString(data).get(0));
        fs.writeFile(output, script, 'utf8', function (err) {
            if (err) throw err;
            console.log('Kevoree Kevscript generated succefully');
            console.log('model used: '+input);
            console.log('kevs gen:   '+output);
        });
    });
} else {
    console.log(optimist.help());
}

