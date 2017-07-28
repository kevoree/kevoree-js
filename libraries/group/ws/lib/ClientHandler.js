'use strict';

var WebSocket = require('ws'); // jshint ignore:line
var StringDecoder = require('string_decoder').StringDecoder;
var kevoree = require('kevoree-library');

var shortid = require('./shortid');
var Protocol = require('./Protocol');

var decoder = new StringDecoder('utf8');

/**
 * Handles client events on the WebSocket server
 *  - connection
 *  - messages
 *  - disconnection
 * @type {ClientHandler}
 */
function ClientHandler(group) {
  this.group = group;
  // cache maps
  this.name2Ws = {};
  this.ws2Name = {};
}

ClientHandler.prototype = {
  tpl: function(tpl, nodeName) {
    return tpl
      .replace(/{nodeName}/g, nodeName)
      .replace(/{groupName}/g, this.group.getName());
  },

  getHandler: function() {
    return function(ws) {
      ws.id = shortid();

      // kevoree tools
      var factory = new kevoree.factory.DefaultKevoreeFactory(),
        loader = factory.createJSONLoader(),
        saver = factory.createJSONSerializer(),
        compare = factory.createModelCompare(),
        cloner = factory.createModelCloner();

      // heartbeat handling
      ws.heartbeatId = setInterval(function() {
        if (ws.readyState !== WebSocket.OPEN) {
          ws.close();
					clearInterval(ws.heartbeatId);
        } else {
          ws.pingId = shortid();
          ws.ping(ws.pingId, null, false);
          ws.pingTimeout = setTimeout(function() {
            ws.close();
          }, 15000);
        }
      }, 15000);
      ws.on('pong', function(data) {
        data = decoder.write(data);
        if (data === ws.pingId) {
          clearTimeout(ws.pingTimeout);
        }
      });

      // websocket listeners
      ws.on('close', function() {
        clearInterval(ws.heartbeatId);
        var nodeName = this.ws2Name[ws.id];
        if (nodeName) {
          var modelToApply = cloner.clone(this.group.getKevoreeCore().getCurrentModel());
          if (this.checkFilter(nodeName)) {
            var onDisconnectKevs = this.tpl(this.group.getDictionary().getString('onDisconnect', ''), nodeName);
            if (onDisconnectKevs.length > 0) {
              this.group.log.debug(this.group.toString(), '===== onDisconnect KevScript =====');
              this.group.log.debug(this.group.toString(), onDisconnectKevs);
              this.group.log.debug(this.group.toString(), '==================================');
              this.group.getKevoreeCore().kevs.parse(onDisconnectKevs, modelToApply, function(err, model) {
                if (err) {
                  this.group.log.error('Unable to parse onDisconnect KevScript. No changes made after the disconnection of ' + nodeName);
              } else {
                this.group.getKevoreeCore().deploy(model);
                }
              }.bind(this));
            } else {
              this.group.getKevoreeCore().deploy(modelToApply);
            }
          }
        }
        delete this.name2Ws[this.ws2Name[ws.id]];
        delete this.ws2Name[ws.id];
      }.bind(this));

      ws.on('error', function() {
        clearInterval(ws.heartbeatId);
        try {
          ws.close();
        } catch (err) {
          this.group.log.error(this.group.toString(), err.stack);
        }

        if (this.ws2Name !== null) {
          if (this.ws2Name[ws.id] !== null) {
            delete this.name2Ws[this.ws2Name[ws.id]];
          }
          delete this.ws2Name[ws.id];
        }
      }.bind(this));

      ws.on('message', function(msg) {
        var parsedMsg = Protocol.parse(msg);
        if (parsedMsg === null) {
          this.group.log.error(this.group.toString(), '"' + this.group.getName() + '" unknown Kevoree message ' + msg);
        } else {
          switch (parsedMsg.getType()) {
            case Protocol.REGISTER_TYPE:
              if (!this.name2Ws[parsedMsg.getNodeName()]) {
                // cache new client
                this.name2Ws[parsedMsg.getNodeName()] = ws;
                this.ws2Name[ws.id] = parsedMsg.getNodeName();

                if (this.group.isMaster()) {
                  this.group.log.info(this.group.toString(), 'New client registered "' + parsedMsg.getNodeName() + '"');
                  var modelToApply = cloner.clone(this.group.getKevoreeCore().getCurrentModel());
                  if (parsedMsg.getModel() || parsedMsg.getModel() !== 'null') {
                    // new registered model has a model to share: merging it locally
                    var recModel = loader.loadModelFromString(parsedMsg.getModel()).get(0);
                    compare.merge(recModel, modelToApply).applyOn(recModel);
                    modelToApply = recModel;
                    this.group.log.debug(this.group.toString(), 'Node\'s "'+parsedMsg.getNodeName()+'" model has been merged with the current one');
                  }

                  if (this.checkFilter(parsedMsg.getNodeName())) {
                    // add onConnect logic
                    var onConnectKevs = this.tpl(this.group.getDictionary().getString('onConnect', ''), parsedMsg.getNodeName());
                    if (onConnectKevs.length > 0) {
                      this.group.log.debug(this.group.toString(), '===== onConnect KevScript =====');
                      this.group.log.debug(this.group.toString(), onConnectKevs);
                      this.group.log.debug(this.group.toString(), '===============================');
                      this.group.getKevoreeCore().kevs.parse(onConnectKevs, modelToApply, function(err, model) {
                        if (err) {
                          this.group.log.error('Unable to parse onConnect KevScript ('+err.message+'). Broadcasting model without onConnect process.');
                          this.group.getKevoreeCore().deploy(modelToApply);
                        } else {
                          this.group.getKevoreeCore().deploy(model);
                        }
                      }.bind(this));
                    } else {
                      this.group.getKevoreeCore().deploy(modelToApply);
                    }
                  } else {
                    this.group.getKevoreeCore().deploy(modelToApply);
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
              try {
                var model = loader.loadModelFromString(parsedMsg.getModel()).get(0);
                this.group.log.info(this.group.toString(), 'Push received');
                this.group.log.info(this.group.toString(), 'Applying model locally...');
                this.group.getKevoreeCore().deploy(model);
              } catch (err) {
                this.group.log.error(this.group.toString(), '"'+this.group.getName()+'" has received a malformed push message \''+parsedMsg.toRaw()+'\'');
              }
              break;

            case Protocol.KEVS_TYPE:
            this.group.log.info(this.group.toString(), 'Push received (kevscript)');
            this.group.log.info(this.group.toString(), 'Applying KevScript locally...');
              this.group.getKevoreeCore().kevs.parse(parsedMsg.getKevScript(), this.group.getKevoreeCore().getCurrentModel(), function (err, model) {
                if (err) {
                  this.group.log.error(this.group.toString(), 'KevScript error ('+err.message+')');
                } else {
                  this.group.getKevoreeCore().deploy(model);
                }
              }.bind(this));
              break;

            default:
              this.group.log.error(this.group.toString(), '"' + this.group.getName() + '" unhandled Kevoree message ' + msg);
              break;
          }
        }
      }.bind(this));
    }.bind(this);
  },

  /**
   * Clear server caches
   */
  clearCache: function() {
    Object.keys(this.name2Ws).forEach(function(name) {
      delete this.name2Ws[name];
    }.bind(this));

    Object.keys(this.ws2Name).forEach(function(wsId) {
      delete this.ws2Name[wsId];
    }.bind(this));
  },

  checkFilter: function (nodeName) {
    var filter = this.group.dictionary.getString('filter');
    if (filter && filter.length > 0) {
      var pattern = new RegExp(filter);
      return (pattern.exec(nodeName)) !== null;
    }
    return true;
  },

  toString: function () {
    return 'ClientHandler';
  }
};

module.exports = ClientHandler;
