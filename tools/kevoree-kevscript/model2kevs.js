var path = require('path'),
    fs   = require('fs'),
    argv = require('optimist')
        .usage('Usage: $0 -m path/to/a/model.json [-o path/to/output/model.kevs]')
        .demand(['m', 'o'])
        .alias('m', 'model')
        .alias('o', 'output')
        .describe('m', 'Path to the Kevoree model JSON source file you want to transform into a Kevoree Kevscript model')
        .describe('o', 'Where to write the output Kevoree Kevscript model')
        .default('o', 'model.kevs')
        .argv,
    KevScript    = require('./lib/KevScript'),
    kevoree      = require('kevoree-library').org.kevoree;

var input = path.resolve(argv.m);
var output = path.resolve(argv.o);
var loader = new kevoree.loader.JSONModelLoader();
var kevs = new KevScript();

fs.readFile(input, 'utf8', function (err, data) {
    if (err) throw err;

    var script = kevs.parseModel(loader.loadModelFromString(data).get(0));
    fs.writeFile(output, script, 'utf8', function (err) {
        if (err) throw err;
        console.log('Kevoree Kevscript generated succefully');
        console.log('model used:\t'+input);
        console.log('kevs gen:\t'+output);
    });
});

