var Class               = require('pseudoclass'),
    KevoreeCore         = require('kevoree-core'),
    BrowserLogger       = require('./BrowserLogger'),
    BrowserBootstrapper = require('./BrowserBootstrapper'),
    UIBrowserRuntime    = require('../ui/UIBrowserRuntime'),
    Bootstrap           = require('../command/network/Bootstrap'),
    uuid                = require('node-uuid'),
    WebSocket           = require('ws');

var CLIENT_CLEANER_ADDRESS = 'ws://'+window.location.host+'/cc';

/**
 * Created by leiko on 12/03/14.
 */
var BrowserRuntime = Class({
    toString: 'BrowserRuntime',

    construct: function () {
        this.uuid = uuid.v1();
        console.log('UUID:', this.uuid);
        this.logger = new BrowserLogger(this.toString());
        this.core = new KevoreeCore(__dirname, this.logger);

        this.core.setUICommand(function (ui, callback) {
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

        // connect to WebSocket server and register
        var wsConnect = function () {
            console.log('Trying to connect to '+CLIENT_CLEANER_ADDRESS);
            this.ws = new WebSocket(CLIENT_CLEANER_ADDRESS);
            this.ws.onopen = function () {
                this.ui.wsConnected();
                this.ws.send(JSON.stringify({
                    action: 'register',
                    uuid: this.uuid,
                    name: this.core.getNodeName()
                }));
                console.log('Connected to '+CLIENT_CLEANER_ADDRESS);
            }.bind(this);

            this.ws.onclose = function () {
                this.ui.wsDisconnected();
                setTimeout(wsConnect, 2000);
            }.bind(this);
        }.bind(this);
        wsConnect();

        var bootstrapper = new BrowserBootstrapper(__dirname, this.logger, this);
        this.core.setBootstrapper(bootstrapper);
        this.ui = new UIBrowserRuntime(this);

        var bootstrapCmd = new Bootstrap(this);
        this.core.on('started', function () {
            this.ui.started();

            this.ws.send(JSON.stringify({
                action: 'setname',
                name: this.core.getNodeName()
            }));

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
        this.ws.close(); // this will trigger node removal server-side
    },

    clearLogs: function () {
        this.logger.clear();
    },

    getUUID: function () {
        return this.uuid;
    }
});

module.exports = BrowserRuntime;