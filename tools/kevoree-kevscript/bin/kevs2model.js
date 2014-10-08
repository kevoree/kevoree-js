#!/usr/bin/env node

var path = require('path'),
    fs   = require('fs'),
    chalk= require('chalk'),
    optimist = require('optimist')
        .usage('Usage: $0 <path/to/a/model.kevs> [-c /path/to/a/context/model.json -o /path/to/output/model.json]')
        .demand(['o'])
        // -o, --output
        .alias('o', 'output')
        .describe('o', 'Where to write the output Kevoree JSON model')
        .default('o', 'model.json')
        // -c, --ctxModel
        .alias('c', 'ctxModel')
        .describe('c', 'A context model to apply KevScript on'),
    KevScript    = require('./../lib/KevScript'),
    kevoree      = require('kevoree-library').org.kevoree;

if (optimist.argv._.length === 1) {
    var input = path.resolve(optimist.argv._[0]);
    var output = path.resolve(optimist.argv.o);
    var factory = new kevoree.factory.DefaultKevoreeFactory();
    var serializer = factory.createJSONSerializer();
    var kevs = new KevScript();

    /**
     *
     * @param err
     * @param model
     */
    var kevscriptHandler = function (err, model) {
        if (err) {
            console.log(chalk.red("Unable to parse KevScript")+'\n'+err.stack);
            process.exit(1);
        } else {
            try {
                var modelStr = JSON.stringify(JSON.parse(serializer.serialize(model)), null, 4);
                fs.writeFile(output, modelStr, 'utf8', function (err) {
                    if (err) throw err;
                    console.log('Kevoree model generated succefully from KevScript file');
                    console.log('kevs used: '+input);
                    console.log('model gen: '+output);
                });
            } catch (err) {
                console.log(chalk.red("Unable to serialize generated model")+'\n'+err.stack);
            }
        }
    };

    fs.readFile(input, 'utf8', function (err, data) {
        if (err) throw err;

        if (optimist.c) {
            var loader = factory.createJSONLoader();
            fs.readFile(path.resolve(optimist.c), 'utf8', function (err, ctxModelSrc) {
                if (err) {
                    console.log(chalk.red("Unable to read context model file")+'\n'+err.stack);
                    process.exit(1);
                } else {
                    try {
                        kevs.parse(data, loader.loadModelFromString(ctxModelSrc).get(0), kevscriptHandler);
                    } catch (err) {
                        console.log(chalk.red("Unable to load context model")+'\n'+err.stack);
                        process.exit(1);
                    }
                }
            });
        } else {
            kevs.parse(data, kevscriptHandler);
        }
    });
} else {
    console.log(optimist.help());
}

