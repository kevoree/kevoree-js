var AbstractComponent = require('kevoree-entities').AbstractComponent;
var http = require('http');
var express = require('express');
var RED = require('node-red');
var when = require('when');
var shortid = require('shortid');
var findPort = require('./findPort');
var createInputServer = require('./createInputServer');
var createOutputServer = require('./createOutputServer');
var rimraf = require('rimraf');

var K_INPUT = 'kWSServerInput';
var K_INPUT_CONF = 'kWSServerInputConf';
var K_OUTPUT = 'kWSServerOutput';
var K_OUTPUT_CONF = 'kWSServerOutputConf';

/**
 * Kevoree component
 * @type {NodeRED}
 */
var NodeRED = AbstractComponent.extend({
    toString: 'NodeRED',
    tdef_version: 1,

    dic_port: { optional: false, defaultValue: 9090 },
    dic_userDir: { optional: false },
    dic_nodesDir: { },
    dic_httpAdminRoot: { optional: false, defaultValue: '/' },
    dic_httpNodeRoot: { optional: false, defaultValue: '/api' },
    dic_flows: { },

    construct: function () {
        this.server = null;
        this.clients = {};
        this.needRestart = false;
        this.inputWSS = null;
        this.outputWSS = null;
    },

    start: function (done) {
        // Create an Express app
        var app = express();

        // Add a simple route for static content served from 'public'
        app.use("/", express.static("public"));

        // Create a server
        this.server = http.createServer(app);

        var userDir = this.getDictionary().getString('userDir'),
            nodesDir = this.getDictionary().getString('nodesDir'),
            httpAdminRoot = this.getDictionary().getString('httpAdminRoot'),
            httpNodeRoot = this.getDictionary().getString('httpNodeRoot');

        if (!userDir || userDir.length === 0) {
            done(new Error('"'+this.getName()+'" attribute "userDir" must be set'));
            return;
        }

        rimraf(userDir, function () {
            // Create the settings object - see default settings.js file for other options
            var settings = {
                httpAdminRoot:         httpAdminRoot,
                httpNodeRoot:          httpNodeRoot,
                userDir:               userDir,
                nodesDir:              nodesDir,
                functionGlobalContext: { }    // enables global context
            };

            // Initialise the runtime with a server and settings
            RED.init(this.server, settings);

            // Serve the editor UI from settings.httpAdminRoot
            app.use(settings.httpAdminRoot, RED.httpAdmin);

            // Serve the http nodes UI from settings.httpNodeRoot
            app.use(settings.httpNodeRoot, RED.httpNode);

            var port = this.getDictionary().getNumber('port', this.dic_port.defaultValue);
            if (!port) {
                done(new Error('"'+this.getName()+'" attribute "port" must be set'));
                return;
            }

            this.server.on('connection', function (client) {
                var id = shortid.generate();
                this.clients[id] = client;

                client.on('close', function () {
                    delete this.clients[id];
                }.bind(this));
            }.bind(this));

            this.server.listen(port, function () {
                this.log.info('"'+this.getName()+'" server started at http://0.0.0.0:'+port+httpAdminRoot);

                // Start the runtime
                RED.start()
                    .then(function () {
                        // TODO get rid of this as soon as node-red fixes the issue
                        // https://github.com/node-red/node-red/pull/685
                        return when.promise(function (resolve) {
                            setTimeout(function () {
                                resolve();
                            }, 2000);
                        });
                    })
                    .then(function () {
                        this.preUpdateFlows(this.getDictionary().getString('flows'))
                            .then(function () {
                                done();
                            })
                            .catch(function () {
                                this.log.warn('"'+this.getName()+'" unable to set flows ('+err.message+')');
                            }.bind(this));
                    }.bind(this))
                    .catch(function (err) {
                        this.log.warn('"'+this.getName()+'" unable to start NodeRED ('+err.message+')');
                        done(err);
                    }.bind(this));
            }.bind(this));

            // do not rebind handlers when component is restarting
            this.getDictionary().emitter
                .removeAllListeners('port')
                .removeAllListeners('httpAdminRoot')
                .removeAllListeners('httpNodeRoot')
                .removeAllListeners('userDir')
                .removeAllListeners('flows');

            this.getDictionary().on('flows', function (flows) {
                this.preUpdateFlows(flows)
                    .catch(function (err) {
                        this.log.warn('"'+this.getName()+'" unable to set flows ('+err.message+')');
                    }.bind(this));
            }.bind(this));
            this.getDictionary().on('port', function () {
                this.needRestart = true;
            }.bind(this));
            this.getDictionary().on('httpAdminRoot', function () {
                this.needRestart = true;
            }.bind(this));
            this.getDictionary().on('httpNodeRoot', function () {
                this.needRestart = true;
            }.bind(this));
            this.getDictionary().on('userDir', function () {
                this.needRestart = true;
            }.bind(this));
        }.bind(this));
    },

    stop: function (done) {
        RED.stop();

        if (this.inputWSS) {
            this.inputWSS.close();
            delete this.inputWSS;
        }

        if (this.outputWSS) {
            this.outputWSS.close();
            delete this.outputWSS;
        }

        if (this.server) {
            for (var id in this.clients) {
                if (this.clients.hasOwnProperty(id)) {
                    this.clients[id].destroy();
                    delete this.clients[id];
                }
            }
            this.server.close(function () {
                done();
            }.bind(this));
        } else {
            done();
        }
    },

    startInputOutputServers: function () {
        return findPort()
            .then(function (port) {
                this.inputWSS = createInputServer(port);
                this.log.debug('"'+this.getName()+'" WebSocket kevoreeInputServer available at 127.0.0.1:'+port);
                return findPort();
            }.bind(this))
            .then(function (port) {
                this.outputWSS = createOutputServer(port);
                this.log.debug('"'+this.getName()+'" WebSocket kevoreeOutputServer available at 127.0.0.1:'+port);
                this.outputWSS.onMessage(function (msg) {
                    this.out_output(msg);
                }.bind(this));
            }.bind(this))
    },

    /**
     *
     * @param flows
     * @returns {Promise<boolean>}
     */
    updateFlows: function (flows) {
        var kInput      = false,
            kInputConf  = null,
            kOutput     = false,
            kOutputConf = null,
            edited      = false;

        flows.forEach(function (item) {
            if (item.id === K_INPUT) {
                kInput = true;

            } else if (item.id === K_INPUT_CONF) {
                kInputConf = item;

            } else if (item.id === K_OUTPUT) {
                kOutput = true;

            } else if (item.id === K_OUTPUT_CONF) {
                kOutputConf = item;
            }
        });

        if (!kInput) {
            // no Kevoree Input Server found in flow => add it
            flows.push({
                id:     K_INPUT,
                name:   'kevoreeInput',
                type:   'websocket in',
                server: '',
                client: K_INPUT_CONF,
                x:      100,
                y:      100,
                wires:  [[]]
            });
            edited = true;
        }

        if (!kInputConf) {
            // no Kevoree Input Server configuration found in flow => add it
            flows.push({
                id:       K_INPUT_CONF,
                type:     'websocket-client',
                path:     'ws://127.0.0.1:'+this.inputWSS.port,
                wholemsg: 'false'
            });
            edited = true;
        } else {
            if (kInputConf.path !== 'ws://127.0.0.1:'+this.inputWSS.port) {
                kInputConf.path = 'ws://127.0.0.1:'+this.inputWSS.port;
                edited = true;
            }
        }

        if (!kOutput) {
            // no Kevoree Output Server found in flow => add it
            flows.push({
                id:     K_OUTPUT,
                name:   'kevoreeOutput',
                type:   'websocket out',
                server: '',
                client: K_OUTPUT_CONF,
                x:      300,
                y:      100,
                wires:  [[]]
            });
            edited = true;
        }

        if (!kOutputConf) {
            // no Kevoree Output Server configuration found in flow => add it
            flows.push({
                id:       K_OUTPUT_CONF,
                type:     'websocket-client',
                path:     'ws://127.0.0.1:'+this.outputWSS.port,
                wholemsg: 'false'
            });
            edited = true;
        } else {
            if (kOutputConf.path !== 'ws://127.0.0.1:'+this.outputWSS.port) {
                kOutputConf.path = 'ws://127.0.0.1:'+this.outputWSS.port;
                edited = true;
            }
        }

        return RED.nodes.setFlows(flows)
            .then(function () {
                return edited;
            });
    },

    preUpdateFlows: function (flows) {
        // start in/out servers
        return this.startInputOutputServers()
            .then(function () {
                // process flows using value in dictionary
                try {
                    flows = JSON.parse(flows);
                    if (Object.prototype.toString.call(flows) !== '[object Array]') {
                        this.log.warn('"'+this.getName()+'" attribute "flows" is not an array. Default flows used "[]"');
                        flows = [];
                    }
                } catch (err) {
                    this.log.warn('"'+this.getName()+'" attribute "flows" is not a valid JSON. Default flows used "[]"');
                    flows = [];
                }

                return this.updateFlows(flows);
            }.bind(this));
    },

    update: function (done) {
        if (this.needRestart) {
            this.stop(function () {
                this.start(done);
            }.bind(this));
        }
        this.needRestart = false;
        done();
    },

    in_input: function (data) {
        try {
            this.inputWSS.send(data);
            this.log.debug('"'+this.getName()+'" incoming message sent to NodeRED through kevoreeInput');
        } catch (err) {
            this.log.warn('"'+this.getName()+'" error sending message to NodeRED through kevoreeInput ('+err.message+'). Message lost');
        }
    },

    out_output: function (data) {}
});

module.exports = NodeRED;
