var Class               = require('pseudoclass'),
    KevoreeCore         = require('kevoree-core'),
    BrowserLogger       = require('./BrowserLogger'),
    BrowserBootstrapper = require('./BrowserBootstrapper'),
    UIBrowserRuntime    = require('../ui/UIBrowserRuntime'),
    Bootstrap           = require('../command/network/Bootstrap');

/**
 * Created by leiko on 12/03/14.
 */
var BrowserRuntime = Class({
    toString: 'BrowserRuntime',

    construct: function () {
        this.logger = new BrowserLogger(this.toString());
        this.core = new KevoreeCore(__dirname, this.logger);
        var bootstrapper = new BrowserBootstrapper(__dirname);
        this.core.setBootstrapper(bootstrapper);
        this.ui = new UIBrowserRuntime(this);

        var bootstrapCmd = new Bootstrap(this);
        this.core.on('started', function () {
            this.ui.started();

            // platform node started
            bootstrapCmd.execute(this.core.getNodeName(), function (err, model) {
                if (err) {
                    this.logger.error(this.toString(), err.message);
                    return;
                }
                this.core.deploy(model);
            }.bind(this));
        }.bind(this));

        this.core.on('stopped', function () {
            this.ui.stopped();
        }.bind(this));

        this.core.on('error', function (err) {
            this.logger.error(err.message);
            this.ui.stopped();
        }.bind(this));
    },

    start: function (nodeName) {
        this.core.start(nodeName);
    },

    stop: function () {
        this.core.stop();
    },

    clearLogs: function () {
        this.logger.clear();
    }
});

module.exports = BrowserRuntime;