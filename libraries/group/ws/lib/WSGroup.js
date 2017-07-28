'use strict';

var AbstractGroup = require('kevoree-entities').AbstractGroup;
var kevoree = require('kevoree-library').org.kevoree;
var WebSocket = require('ws');
var WebSocketServer = require('ws').Server;
var SmartSocket = require('smart-socket');
var ClientHandler = require('./ClientHandler');
var Protocol = require('./Protocol');
var PushMessage = require('./message/PushMessage');
var RegisterMessage = require('./message/RegisterMessage');

/**
 * Kevoree group
 */
var WSGroup = AbstractGroup.extend({
  toString: 'WSGroup',
  tdef_version: 1,

  dic_master:       {},
  dic_port:         { fragmentDependant: true, defaultValue: 9000 },
  dic_onConnect:    {},
  dic_onDisconnect: {},
  dic_filter:       {},

  construct: function() {
    this.server = null;
    this.client = null;
    this.clientHandler = new ClientHandler(this);
    this.updatePort = false;
    this.updateMaster = false;
  },

  start: function(done) {
    if (this.hasMaster()) {
      if (this.isMaster()) {
        this.createServer(done);
      } else {
        this.createClient(done);
      }
    } else {
      this.createServer(done);
    }

    this.dictionary.on('port', this.onPortUpdate);
    this.dictionary.on('master', this.onMasterUpdate);
  },

  stop: function(done) {
    this.updatePort = false;
    this.updateMaster = false;
    this.dictionary.off('port', this.onPortUpdate);
    this.dictionary.off('master', this.onMasterUpdate);

    // clear server
    try {
      this.server.close();
    } catch (ignore) {
      /* prevent not running server to throw err */
    } finally {
      this.server = null;
    }

    // clear cache
    this.clientHandler.clearCache();

    // clear client
    if (this.smartSocket) {
      this.smartSocket.close(true);
    }
    this.client = null;
    done();
  },

  update: function(done) {
    if (this.updatePort || this.updateMaster) {
      this.stop(function() {
        this.start(done);
      }.bind(this));
    } else {
      done();
    }
  },

  onPortUpdate: function () {
    this.updatePort = true;
  },
  onMasterUpdate: function () {
    this.updateMaster = true;
  },

  createServer: function(done) {
    var deployedHandler = function () {
      if (this.server) {
        var factory = new kevoree.factory.DefaultKevoreeFactory();
        var saver = factory.createJSONSerializer();
        var modelStr = saver.serialize(this.getKevoreeCore().getCurrentModel());
        var msg = new PushMessage(modelStr);
        var count = 0;
        this.server.clients.forEach(function (client) {
          if (client && client.readyState === WebSocket.OPEN) {
            client.send(msg.toRaw());
            count++;
          }
        });
        if (count > 0) {
          this.log.info(this.getName(), 'Broadcasting new model to all clients ('+count+')');
        }
      }
    }.bind(this);

    try {
        var that = this;
        var port = this.dictionary.getNumber('port', 9000);
        this.server = new WebSocketServer({port: port}, function () {
          that.getKevoreeCore().on('deployed', deployedHandler);
          that.log.info(that.toString(), '"'+that.getName()+'" listen on ' + port);
          that.server.on('connection', that.clientHandler.getHandler());
          done();
        });

        this.server.on('error', function (err) {
          err.message = '"'+that.getName()+'" WebSocketServer error: ' + err.message;
          done(err);
        });

        this.server.on('close', function () {
          that.getKevoreeCore().off('deployed', deployedHandler);
        });
    } catch (err) {
        done(err);
    }
  },

  createClient: function(done) {
    var deployedHandler = function (client) {
      return function () {
        if (!this.lock) {
          var factory = new kevoree.factory.DefaultKevoreeFactory();
          var saver = factory.createJSONSerializer();
          var modelStr = saver.serialize(this.getKevoreeCore().getCurrentModel());
          var msg = new PushMessage(modelStr);
          if (client && client.readyState === WebSocket.OPEN) {
            this.log.info(this.getName(), 'Notifying master "'+this.dictionary.getString('master')+'" to update model');
            client.send(msg.toRaw());
          }
        }
      }.bind(this);
    }.bind(this);

    if (this.client === null || this.client.readyState === WebSocket.OPEN) {
      var selfGroup = this.getModelEntity();
      // localize master node
      var master = this.dictionary.getString('master');
      if (selfGroup && master && master.length > 0) {
        var masterDico = selfGroup.findFragmentDictionaryByID(master);
        var port = this.dic_port.defaultValue;
        if (masterDico) {
          var val = masterDico.findValuesByID('port');
          port = val.value;
        }
        var addresses = [];
        var node = this.getKevoreeCore().getDeployModel().findNodesByID(master);
        if (node) {
          node.networkInformation.array.forEach(function(net) {
            net.values.array.forEach(function(prop) {
              if (net.name.toLowerCase().indexOf('ip') !== -1 || prop.name.toLowerCase().indexOf('ip') !== -1) {
                if (prop.value.indexOf(':') !== -1) {
                  addresses.push('[' + prop.value + ']' + ':' + port);
                } else {
                  addresses.push(prop.value + ':' + port);
                }
              }
            });
          });

          if (addresses.length === 0) {
            done(new Error('WSGroup error: "' + this.getName() + '" unable to find a suitable address for master server "' + master + '"'));
          } else {
            var factory = new kevoree.factory.DefaultKevoreeFactory();
            var loader = factory.createJSONLoader();
            var saver = factory.createJSONSerializer();

            this.smartSocket = new SmartSocket({
              addresses: addresses,
              loopBreak: 3000
            });
            this.smartSocket.start();

            this.smartSocket.on('open', function(ws) {
              this.log.info('"' + this.getName() + '" connected to master server ' + ws.url);
              this.client = ws;

              var currentModel = saver.serialize(this.getKevoreeCore().getCurrentModel()).trim();
              var registerMsg = new RegisterMessage(this.getNodeName(), currentModel);
              ws.send(registerMsg.toRaw());

              this.getKevoreeCore().on('deployed', deployedHandler(ws));
            }.bind(this));

            this.smartSocket.on('close', function(ws) {
              this.log.info('Lost connection with master "' + master + '" at ' + ws.url);
              this.getKevoreeCore().off('deployed', deployedHandler(ws));
            }.bind(this));

            this.smartSocket.on('message', function(ws, msg) {
              var parsedMsg = Protocol.parse(msg);
              if (!parsedMsg) {
                this.log.error('"' + this.getName() + '" unknown Kevoree message ' + msg);
              } else {
                switch (parsedMsg.getType()) {
                  case Protocol.PUSH_TYPE:
                    // push from master
                    var model = loader.loadModelFromString(parsedMsg.getModel()).get(0);
                    this.lock = true;
                    try {
                      this.getKevoreeCore().deploy(model, function () {
                        this.lock = false;
                      }.bind(this));
                    } catch (ignore) {
                      this.lock = false;
                    }
                    break;

                  default:
                    this.log.error('"' + this.getName() + '" unhandled Kevoree message ' + msg);
                    break;
                }
              }
            }.bind(this));

            done();
          }
        }
      }
    }
  },

  pushToMaster: function(serializedModel) {
    if (this.client !== null && this.client.readyState === WebSocket.OPEN) {
      var pushMessage = new PushMessage(serializedModel);
      this.client.send(pushMessage.toRaw());
      return true;
    } else {
      return false;
    }
  },

  hasMaster: function() {
    var master = this.dictionary.getString('master');
    return (master && master.length > 0);
  },

  isMaster: function() {
    if (this.hasMaster()) {
      return this.dictionary.getString('master') === this.getNodeName();
    } else {
      return false;
    }
  }
});

module.exports = WSGroup;
