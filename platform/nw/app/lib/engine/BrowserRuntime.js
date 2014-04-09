var Class               = require('pseudoclass'),
    KevoreeCore         = require('kevoree-core'),
    BrowserLogger       = require('./BrowserLogger'),
    BrowserBootstrapper = require('./BrowserBootstrapper'),
    UIBrowserRuntime    = require('../ui/UIBrowserRuntime'),
    NPMResolver         = require('kevoree-resolvers').NPMResolver,
    optimist            = require('optimist'),
    kevoree             = require('kevoree-library').org.kevoree,
    Kevscript           = require('kevoree-kevscript'),
    fs                  = require('fs'),
    path                = require('path');

/**
 * Created by leiko on 12/03/14.
 */
var BrowserRuntime = Class({
    toString: 'BrowserRuntime',

    construct: function (gui) {
        var modulesPath = process.cwd();
        this.logger = new BrowserLogger(this.toString());
        this.resolver = new NPMResolver(modulesPath, this.logger);
        this.kevscript = new Kevscript({
            resolvers: {
                npm: this.resolver
            }
        });

        var argv = optimist(gui.App.argv)
            .alias('n', 'nodeName')
            .alias('g', 'groupName')
            .alias('p', 'groupPort')
            .alias('m', 'model')
            .alias('k', 'kevscript').argv;

        var win = gui.Window.get();

        processArgv(this, argv, function (hasParams) {
            // if we succeed in processing command-line arguments (whether there are some or not)
            // we can display the frame (otherwise it is meaningless, because program already exit)
            win.show();

            this.core = new KevoreeCore(modulesPath, this.logger);
            this.bootstrapModel = null;
            this.groupName = null;
            this.groupPort = null;

            var bootstrapper = new BrowserBootstrapper(this.logger, this.resolver);
            this.core.setBootstrapper(bootstrapper);

            this.core.on('started', function () {
                this.ui.started();

                // platform node started
                if (this.bootstrapModel) {
                    this.core.deploy(this.bootstrapModel);
                } else {
                    var nodeName = this.core.getNodeName()  || 'node0',
                        grpName  = this.groupName || 'sync',
                        port     = this.groupPort || 9000;

                    var kevsModel = '' +
                        'include npm:kevoree-node-javascript:latest' + '\n' +
                        'include npm:kevoree-group-websocket:latest' + '\n' +
                        'add '+nodeName+' : JavascriptNode' + '\n' +
                        'add '+grpName+' : WebSocketGroup' + '\n' +
                        'attach '+nodeName+' '+grpName + '\n' +
                        'set '+grpName+'.port/'+nodeName+' = "'+port+'"' + '\n' +
                        'network '+nodeName+'.lan.ip 127.0.0.1';

                    this.kevscript.parse(kevsModel, function (err, model) {
                        if (err) {
                            this.logger.error(this.toString(), err.message);
                            this.core.stop();
                            return;
                        }
                        this.core.deploy(model);
                    }.bind(this));
                }
            }.bind(this));

            this.core.on('deployed', function () {
                // TODO remove that
                console.log(this.core.nodeInstance);
            }.bind(this));

            this.core.on('stopped', function () {
                this.ui.stopped();
            }.bind(this));

            this.core.on('error', function (err) {
                this.logger.error(err.message);
            }.bind(this));

            this.core.on('rollbackError', function (err) {
                this.logger.error(err.message);
            }.bind(this));

            this.core.on('rollbackSucceed', function () {
                this.logger.info(this.toString(), 'Rollback succeed');
            }.bind(this));

            this.core.on('adaptationError', function (err) {
                this.logger.error(err.message);
            }.bind(this));

            this.ui = new UIBrowserRuntime(this);
            if (hasParams) {
                console.log('Bootstrapping using command-line parameters: -n '+argv.n+' -g '+argv.g+' -p '+argv.p);
                this.start(argv.n, argv.g, argv.p);
            } else {
                this.ui.showBootstrapModal();
            }
        }.bind(this));
    },

    start: function (nodeName, groupName, groupPort) {
        this.groupName = groupName;
        this.groupPort = groupPort;
        this.core.start(nodeName);
    },

    stop: function () {
        this.core.stop();
    },

    setBootstrapModel: function (model) {
        this.bootstrapModel = model;
    },

    getResolver: function () {
        return this.resolver;
    },

    clearLogs: function () {
        this.logger.clear();
    },

    setUICommand: function (cmd) {
        this.core.setUICommand(cmd);
    }
});

function processArgv(runtime, argv, done) {
    if ((typeof argv.m === 'string') && (typeof argv.k === 'undefined')) {
        // a path to a Kevoree json model has been specified
        return fs.readFile(path.resolve(argv.m), {encoding: 'utf8'}, function (err, rawModel) {
            if (err) {
                console.error('Bootstrap error: Unable to read JSON file '+argv.m);
                process.exit(2);
            }
            try {
                var loader = new kevoree.loader.JSONModelLoader();
                var model = loader.loadModelFromString(rawModel).get(0);
                runtime.setBootstrapModel(model);
                done(true);
            } catch (err) {
                console.error(err.message);
                process.exit(2);
            }
        });

    } else if ((typeof argv.k === 'string') && (typeof argv.m === 'undefined')) {
        // a path to a Kevoree KevScript file has been specified
        console.log('PAPAPATH', path.resolve(process.cwd(), argv.k));
        return fs.readFile(path.resolve(process.cwd(), argv.k), {encoding: 'utf8'}, function (err, rawKevscript) {
            console.log('RAW', rawKevscript);
            if (err) {
                console.error('Bootstrap error: Unable to read Kevscript file '+argv.k);
                process.exit(2);
            }

            runtime.kevscript.parse(rawKevscript, function (err, model) {
                if (err) {
                    console.error('Bootstrap error: Unable to interpret Kevscript file ('+argv.k+')\n'+err.message);
                    process.exit(2);
                    return;
                }

                runtime.setBootstrapModel(model);
                done(true);
            });
        });

    } else if ((typeof argv.m !== 'undefined') && (typeof argv.k !== 'undefined')) {
        // both json and kevs are specified => error
        console.error("ERROR: You cannot specify both -m & -k parameters (must be one of them, or none)");
        process.exit(2);

    } else if ((typeof argv.m === 'undefined') && (typeof argv.k === 'undefined')) {
        if ((typeof argv.n === 'undefined') && (typeof argv.g === 'undefined') && (typeof argv.p === 'undefined')) {
            if (argv._.length > 0) {
                console.error('ERROR: Unknown specified parameter (available parameters are: -n, -g, -p, -m, -k, or none)');
                process.exit(2);
            } else {
                return done(false);
            }
        } else {
            return done(true);
        }
    }
    done(false);
}

module.exports = BrowserRuntime;