// Created by leiko on 02/10/14 12:20
var Class = require('pseudoclass');
var WebSocket = require('ws');
var kevoree = require('kevoree-library').org.kevoree;

var Protocol = require('./Protocol');
var PushMessage = require('./message/PushMessage');
var PullMessage = require('./message/PullMessage');

/**
 * Handles client events on the WebSocket server
 *  - connection
 *  - messages
 *  - disconnection
 * @type {ClientHandler}
 */
var ClientHandler = Class({
    toString: 'ClientHandler',

    construct: function (group) {
        this.group = group;
        // cache maps
        this.name2Ws = {};
        this.ws2Name = {};
    },

    /**
     * Returns a client handler for WebSocketServer
     * @returns {function(this:ClientHandler)}
     */
    getHandler: function () {
        return function (ws) {
            var wsId = ws.upgradeReq.headers['sec-websocket-key'];

            // kevoree tools
            var factory = new kevoree.factory.DefaultKevoreeFactory(),
                loader  = factory.createJSONLoader(),
                saver   = factory.createJSONSerializer(),
                compare = factory.createModelCompare();

            // websocket listeners
            ws.on('close', function () {
                if (this.ws2Name[wsId] !== null) {
                    delete this.name2Ws[this.ws2Name[wsId]];
                }
                delete this.ws2Name[wsId];
            }.bind(this));

            ws.on('error', function () {
                try {
                    ws.close();
                } catch (err) {
                    this.group.log.error(this.group.toString(), err.stack);
                }

                if (this.ws2Name !== null) {
                    if (this.ws2Name[wsId] !== null) {
                        delete this.name2Ws[this.ws2Name[wsId]];
                    }
                    delete this.ws2Name[wsId];
                }
            }.bind(this));

            ws.on('message', function (msg) {
                var parsedMsg = Protocol.parse(msg);
                if (parsedMsg === null) {
                    this.group.log.error(this.group.toString(), '"'+this.group.getName()+'" unknown Kevoree message '+msg);
                } else {
                    switch (parsedMsg.getType()) {
                        case Protocol.REGISTER_TYPE:
                            if (!this.name2Ws[parsedMsg.getNodeName()]) {
                                // cache new client
                                this.name2Ws[parsedMsg.getNodeName()] = ws;
                                this.ws2Name[wsId] = parsedMsg.getNodeName();

                                if (this.group.isMaster()) {
                                    if (!parsedMsg.getModel() || parsedMsg.getModel() === 'null') {
                                        var currentModel = saver.serialize(this.group.getKevoreeCore().getCurrentModel());
                                        var pushMessage = new PushMessage(currentModel);
                                        this.group.log.info(this.group.toString(), 'Sending my model to client "'+parsedMsg.getNodeName()+'"');
                                        ws.send(pushMessage.toRaw());
                                    } else {
                                        // ok i've to merge locally
                                        var recModel = loader.loadModelFromString(parsedMsg.getModel()).get(0);
                                        var mergedModel = factory.createModelCloner().clone(this.group.getKevoreeCore().getCurrentModel());
                                        compare.merge(this.group.getKevoreeCore().getCurrentModel(), recModel).applyOn(mergedModel);
                                        this.group.log.info(this.group.toString(), 'New client registered "'+parsedMsg.getNodeName()+'". Merging his model with mine');
                                        this.group.log.info(this.group.toString(), 'Broadcasting merged model to all connected clients');
                                        var mergedModelStr = saver.serialize(mergedModel);
                                        for (var name in this.name2Ws) {
                                            if (this.name2Ws[name].readyState === WebSocket.OPEN) {
                                                this.name2Ws[name].send(new PushMessage(mergedModelStr).toRaw());
                                            }
                                        }
                                        ws.send(new PushMessage(saver.serialize(mergedModel)).toRaw());
                                        this.group.getKevoreeCore().deploy(mergedModel);
                                    }
                                }
                            }
                            break;

                        case Protocol.PULL_TYPE:
                            var modelReturn = saver.serialize(this.group.getKevoreeCore().getCurrentModel());
                            ws.send(modelReturn);
                            this.group.log.info(this.group.toString(), 'Pull requested');
                            break;

                        case Protocol.PUSH_TYPE:
                            var model = loader.loadModelFromString(parsedMsg.getModel()).get(0);
                            if (this.group.hasMaster()) {
                                if (this.group.isMaster()) {
                                    var count = 0;
                                    for (var clientName in this.name2Ws) {
                                        if (this.name2Ws.hasOwnProperty(clientName)) {
                                            count++;
                                            if (this.name2Ws[clientName].readyState === WebSocket.OPEN) {
                                                this.name2Ws[clientName].send(parsedMsg.toRaw());
                                            }
                                        }
                                    }
                                    if (count > 0) {
                                        this.group.log.info(this.group.toString(), 'Broadcast model over '+count+' client'+((count > 1) ? 's':''));
                                    }
                                }
                            } else {
                                // TODO ?
                                this.group.log.info(this.group.toString(), 'No master specified, model will NOT be send to all other nodes');
                            }

                            this.group.log.info(this.group.toString(), 'Push received, applying locally...');
                            this.group.getKevoreeCore().deploy(model);

                            break;

                        default:
                            this.group.log.error(this.group.toString(), '"'+this.group.getName()+'" unhandled Kevoree message ' + msg);
                            break;
                    }
                }
            }.bind(this));
        }.bind(this);
    },

    /**
     * Clear server caches
     */
    clearCache: function () {
        this.name2Ws = {};
        this.ws2Name = {};
    }
});

module.exports = ClientHandler;