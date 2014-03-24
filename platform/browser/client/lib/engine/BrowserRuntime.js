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

        this.core.setUICommand(function (ui, callback) {
            console.log('UICommand', ui);
            try {
                var data = {
                    headerID:   'header'+parseInt(Math.random()*1000),
                    contentID:  'content'+parseInt(Math.random()*1000),
                    name:       ui.getName()
                };
                $('#tabs-host').append(RuntimeTemplates['tab-header'].render(data));
                $('#tabs-content-host').append(RuntimeTemplates['tab-content'].render(data));

                var rootDiv = document.querySelector('#'+data.contentID);
                rootDiv.createShadowRoot = rootDiv.createShadowRoot || rootDiv.webkitCreateShadowRoot;
                ui.on('nameChanged', function (name) {
                    $('#'+data.headerID+' a').html(name);
                });
                ui.setRoot(rootDiv.createShadowRoot());
                ui.setDestroyCmd(function () {
                    var tabLi = document.querySelector('#'+data.headerID);
                    tabLi.parentNode.removeChild(tabLi);
                    rootDiv.parentNode.removeChild(rootDiv);
                });
                return callback();

            } catch (err) {
                console.error(err);
                return callback(err);
            }
        });

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
                    this.core.stop();
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