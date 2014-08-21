var Class         = require('pseudoclass'),
    KevoreeCore     = require('kevoree-core'),
    KevoreeLogger   = require('kevoree-commons').KevoreeLogger,
    Bootstrapper    = require('./NodeJSBootstrapper'),
    bootstrapHelper = require('./bootstrapHelper'),
    path            = require('path'),
    EventEmitter    = require('events').EventEmitter;

var firstSIGINT = true,
    coreStarted = false,
    deploying = false,
    wannaStop = false;

var NodeJSRuntime = Class({
    toString: 'NodeJSRuntime',

    construct: function (modulesPath, logger, resolver) {
        this.modulesPath = modulesPath || path.resolve(__dirname, '..');
        this.log = logger;
        this.kCore = new KevoreeCore(this.modulesPath, this.log);
        this.bootstrapper = new Bootstrapper(this.modulesPath, this.log, resolver);
        this.nodename = 'node0'; // default nodename
        this.groupname = 'sync'; // default groupname
        this.emitter = new EventEmitter();
        this.model = null;
    },

    init: function () {
        this.kCore.setBootstrapper(this.bootstrapper);
        var self = this;

        // kevoree core started event listener
        this.kCore.on('started', function () {
            coreStarted = true;
            self.emitter.emit('started');
        });

        this.kCore.on('deploying', function () {
            deploying = true;
        });

        // kevoree core deployed event listener
        this.kCore.on('deployed', function (model) {
            deploying = false;
            self.emitter.emit('deployed', model);
            if (wannaStop) {
                self.kCore.stop();
            }
        });

        // kevoree core error event listener
        this.kCore.on('error', function (err) {
            self.log.error(err.stack);
            self.emitter.emit('error', err);
        });

        this.kCore.on('rollbackError', function (err) {
            self.log.error(err.stack);
            self.emitter.emit('rollbackError', err);
        });

        this.kCore.on('rollbackSucceed', function () {
            self.log.info(self.toString(), 'Rollback succeed');
            self.emitter.emit('rollbackSucceed');
        });

        this.kCore.on('adaptationError', function (err) {
            self.log.error(err.stack);
            deploying = false;
            self.emitter.emit('adaptationError', err);
            if (wannaStop) {
                self.kCore.stop();
            }
        });

        this.kCore.on('stopped', function () {
            coreStarted = false;
            process.exit(0);
        });
    },

    start: function (nodename, groupname) {
        // TODO add some verification over given names (no spaces & stuff like that)
        this.nodename = nodename || this.nodename;
        this.groupname = groupname || this.groupname;

        process.on('SIGINT', function() {
            process.stdout.write('\033[0G'); // http://stackoverflow.com/a/9628935/906441
            if (!coreStarted) {
                this.log.warn(this.toString(), 'Got SIGINT.  Shutting down Kevoree');
                process.exit(0);
            } else {
                if (!firstSIGINT) {
                    if (!deploying) {
                        this.log.warn(this.toString(), 'Force quit.');
                    } else {
                        this.log.warn(this.toString(), 'Force quit while deploying. '+this.modulesPath+' might be corrupted.');
                    }
                    process.exit(0);
                } else {
                    firstSIGINT = false;
                    if (!deploying) {
                        this.log.warn(this.toString(), 'Got SIGINT.  Shutting down Kevoree gracefully... (^C again to force quit)');
                        this.kCore.stop();
                    } else {
                        this.log.warn(this.toString(), 'Got SIGINT.  Will shutdown Kevoree gracefully once deploy process finished. (^C again to force quit)');
                        wannaStop = true;
                    }
                }
            }
        }.bind(this));

        process.nextTick(function () {
            this.kCore.start(this.nodename, this.groupname);
        }.bind(this));
    },

    deploy: function (model) {
        // deploy default bootstrap model
        var options = {
            model: model,
            bootstrapper: this.bootstrapper,
            nodeName: this.nodename,
            groupName: this.groupname,
            modulesPath: this.modulesPath,
            logger: this.log
        };
        bootstrapHelper(options, function (err, bootstrapModel) {
            if (err) throw err;

            process.nextTick(function () {
                this.kCore.deploy(bootstrapModel);
            }.bind(this));

        }.bind(this));
    },

    on: function (event, callback) {
        this.emitter.addListener(event, callback);
    },

    off: function (event, callback) {
        this.emitter.removeListener(event, callback);
    }
});

module.exports = NodeJSRuntime;