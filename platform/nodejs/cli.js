#!/usr/bin/env node
var NodeJSRuntime = require('./lib/NodeJSRuntime'),
    KevoreeLogger = require('kevoree-commons').KevoreeLogger,
    path          = require('path'),
    os            = require('os'),
    fs            = require('fs'),
    kevoree       = require('kevoree-library').org.kevoree,
    NPMResolver   = require('kevoree-resolvers').NPMResolver,
    KevScript     = require('kevoree-kevscript'),
    argv          = require('optimist')
        .usage('Usage: $0 [--nodeName node0 --groupName sync (--groupPort 9000) (--model path/to/your/model.json | --kevscript path/to/your/model.kevs) --modulesPath . --logLevel info]')
        .alias('n', 'nodeName')
        .alias('g', 'groupName')
        .alias('gp', 'groupPort')
        .alias('m', 'model')
        .alias('k', 'kevscript')
        .alias('p', 'modulesPath')
        .alias('l', 'logLevel')
        .alias('h', 'help')
        .alias('v', 'version')
        .default('n', 'node0')
        .default('g', 'sync')
        .default('gp', 9000)
        .default('p', os.tmpdir())
        .default('l', 'info')
        .describe('nodeName', 'Name of this runtime node platform')
        .describe('groupName', 'Name of the group your node platform is related to')
        .describe('groupPort', 'Port number to bind node to group')
        .describe('model', 'A JSON model to bootstrap on')
        .describe('kevscript', 'A KevScript model to bootstrap on')
        .describe('modulesPath', 'Where to install resolved deploy units')
        .describe('logLevel', 'Level of the logger before node platform starts (all|debug|info|warn|error|quiet)')
        .describe('help', 'Displays this help')
        .describe('version', 'Displays Kevoree Node.js Runtime version');

if (argv.argv.help) {
    console.log(argv.help());
} else if (argv.argv.version) {
    console.log(require('./package.json').version);
} else {
    argv = argv.argv;
    var log = new KevoreeLogger('NodeJSRuntime');
    switch (argv.logLevel) {
        case 'all':
            log.setLevel(KevoreeLogger.ALL);
            break;

        case 'debug':
            log.setLevel(KevoreeLogger.DEBUG);
            break;

        default:
        case 'info':
            log.setLevel(KevoreeLogger.INFO);
            break;

        case 'warn':
            log.setLevel(KevoreeLogger.WARN);
            break;

        case 'error':
            log.setLevel(KevoreeLogger.ERROR);
            break;

        case 'quiet':
            log.setLevel(KevoreeLogger.QUIET);
            break;
    }

    var resolver = new NPMResolver(argv.modulesPath, log);
    var runtime = new NodeJSRuntime(argv.modulesPath, log, resolver);
    var factory  = new kevoree.factory.DefaultKevoreeFactory();
    var loader   = factory.createJSONLoader();

    // runtime error handler
    var errorHandler = function () {
        log.error('Platform shut down.');
        runtime.stop();
        process.exit(1);
    };

    runtime.once('deployError', errorHandler);
    runtime.once('adaptationError', errorHandler);

    // Kevoree Runtime started event listener
    runtime.on('started', function () {
        // Kevoree Core is started, deploy model
        if (argv.kevscript && argv.kevscript.length > 0) {
            // try with --kevscript param
            fs.readFile(argv.kevscript, 'utf8', function (err, text) {
                if (err) {
                    log.error(err.message);
                    errorHandler();
                } else {
                    var kevs = new KevScript();
                    kevs.parse(text, function (err, model) {
                        if (err) {
                            log.error('Unable to load Kevoree KevScript: '+err.message);
                            errorHandler();
                        } else {
                            runtime.deploy(model);
                        }
                    });
                }
            });

        } else {
            // try with --model param
            var model = loadModelFromCmdLineArg();
            runtime.deploy(model);
        }
    });

    runtime.on('stopped', function () {
        process.exit(0);
    });

    // Kevore Runtime error event listener
    runtime.on('error', function (err) {
        log.error(err.stack);
        process.exit(1);
    });

    var loadModelFromCmdLineArg = function loadModelFromCmdLineArg() {
        if (argv.model && argv.model.length > 0) {
            var modelPath = path.resolve(argv.model);
            try {
                return loader.loadModelFromString(JSON.stringify(fs.readFileSync(modelPath, 'utf8'))).get(0);
            } catch (err) {
                log.error('Unable to load Kevoree JSON model: '+err.message);
                errorHandler();
            }
        }
    };

    runtime.once('deployed', function deployHandler() {
        runtime.off('deployed', deployHandler);
        runtime.off('deployError', errorHandler);
        runtime.off('adaptationError', errorHandler);
    });

    runtime.start(argv.nodeName, argv.groupName, argv.groupPort);
}
