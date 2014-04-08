var Class               = require('pseudoclass'),
    KevoreeCore         = require('kevoree-core'),
    BrowserLogger       = require('./BrowserLogger'),
    BrowserBootstrapper = require('./BrowserBootstrapper'),
    UIBrowserRuntime    = require('../ui/UIBrowserRuntime'),
    NPMResolver         = require('kevoree-resolvers').NPMResolver,
    Bootstrap           = require('../command/Bootstrap');

/**
 * Created by leiko on 12/03/14.
 */
var BrowserRuntime = Class({
    toString: 'BrowserRuntime',

    construct: function () {
        var modulesPath = process.cwd();

        this.logger = new BrowserLogger(this.toString());
        this.resolver = new NPMResolver(modulesPath, this.logger);

        this.core = new KevoreeCore(modulesPath, this.logger);
        this.bootstrapModel = null;
        this.groupName = null;
        this.groupPort = null;

        var bootstrapper = new BrowserBootstrapper(this.logger, this.resolver);
        var bootstrapCmd = new Bootstrap(this, this.resolver);

        this.core.setBootstrapper(bootstrapper);
        this.ui = new UIBrowserRuntime(this);

        this.core.on('started', function () {
            this.ui.started();

            // platform node started
            if (this.bootstrapModel) {
                this.core.deploy(this.bootstrapModel);
            } else {
                var options = {
                    nodeName: this.core.getNodeName(),
                    groupName: this.groupName,
                    groupPort: this.groupPort
                };
                bootstrapCmd.execute(options, function (err, model) {
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

module.exports = BrowserRuntime;