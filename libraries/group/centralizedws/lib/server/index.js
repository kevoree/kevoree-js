var WebSocket = require('ws');
var kevoree = require('kevoree-library');

var Protocol = require('../protocol/Protocol');
var RegisterMessage = require('../protocol/RegisterMessage');
var PushMessage = require('../protocol/PushMessage');
var PullMessage = require('../protocol/PullMessage');
var PushKevSMessage = require('../protocol/PushKevSMessage');
var shrink = require('../util/shrink');
var reducer = require('../util/reducer');
var findMasterNode = require('../util/find-master-node');

var register = require('./register');
var pull = require('./pull');
var push = require('./push');
var unregister = require('./unregister');

var client2name = {};

function statusLog(status) {
	if (status && status.length > 0) {
		return ', status=' + status + '';
	}

	return '';
}

function onMessage(logger, server, client, msg, instance) {
	var pMsg = Protocol.parse(msg);
	if (pMsg) {
		if (client.id) {
			// registered node
			logger.debug('received message from node "' + client2name[client.id] + '" (id=' + client.id + ',msg=' + shrink(msg, 20) + ')');

			switch (pMsg.getType()) {
				case PullMessage.TYPE:
					pull(logger, client2name, client, instance);
					break;

        case PushKevSMessage.TYPE:
          logger.debug('submitting kevscript:');
          logger.debug(pMsg.getKevScript());
          instance.submitScript(pMsg.getKevScript(), function () {
            logger.debug('script executed');
          });
          break;

				default:
					logger.warn('protocol message type "' + pMsg.getType() + '" send by registered node (ignored)');
					break;
			}

		} else {
			// unknown client
			logger.debug('received message from unknown client (msg=' + shrink(msg, 20) + ')');

			switch (pMsg.getType()) {
				case PullMessage.TYPE:
					pull(logger, client2name, client, instance);
					break;

				case RegisterMessage.TYPE:
					register(logger, client2name, client, pMsg, instance);
					break;

				case PushMessage.TYPE:
					push(logger, server, client2name, client, pMsg, instance);
					break;

				default:
					logger.warn('protocol message type "' + pMsg.getType() + '" send by unknown client (ignored)');
					break;
			}
		}
	} else {
		logger.warn('unable to parse msg: ' + shrink(msg, 20));
	}
}

function onClose(logger, client, instance, code, status) {
	if (client.id) {
		// registered node
		logger.info('node "' + client2name[client.id] + '" disconnected (id=' + client.id + ',code=' + code + statusLog(status) + ')');
		unregister(logger, client2name, client, instance, status === 1000);
	} else {
		// unknown client
		var origin = 'unknown';
		if (client.upgradeReq.headers.origin) {
			origin = client.upgradeReq.headers.origin;
		}
		logger.debug('client "' + origin + '" disconnected');
	}
}

function onConnection(logger, server, client, instance) {
	client.on('message', function (msg) {
		onMessage(logger, server, client, msg, instance);
	});

	client.on('close', function (code, status) {
		onClose(logger, client, instance, code, status);
	});
}

module.exports = {
	client2name: client2name,
	create: function (logger, port, instance) {
		var self = this;
		self.server = new WebSocket.Server({
			port: port
		}, function () {
			logger.info('listening on 0.0.0.0:' + port);
		});

		self.server.on('connection', function (client) {
			onConnection(logger, self.server, client, instance);
		});

		this.deployHandler = function () {
			if (self.server.clients.length > 0 && !instance.isRegister) {
				logger.debug('=== Broadcast new model to clients ===');
				self.broadcast(logger, instance);
				logger.debug('=== Broadcast done ===');
			} else {
				logger.debug('Deployment is issued by a register (ignore broadcast)');
			}
		};

		instance.getKevoreeCore().on('deployed', this.deployHandler);

		return this;
	},
	broadcast: function (logger, instance) {
		var factory = new kevoree.factory.DefaultKevoreeFactory();
		var serializer = factory.createJSONSerializer();
		var model = instance.getKevoreeCore().getCurrentModel();

		var processedModel = model;
		var group = instance.getModelEntity();
		var masterName = findMasterNode(group).name;
		var doReduceModel = instance.getDictionary().getBoolean('reduceModel', instance.dic_reduceModel.defaultValue);

		this.server.clients.forEach(function (client) {
			if (client.id) {
				// this "client" is a registered node
				var name = client2name[client.id];
				if (doReduceModel) {
					processedModel = reducer(model, masterName, name);
					logger.debug(' ✔ reduced model for "' + name + '"');
				}
			}

			var modelStr = serializer.serialize(processedModel);
			var pushMsg = new PushMessage(modelStr).toRaw();

			var remoteOrigin = 'unknown';
			if (client.upgradeReq.headers.origin) {
				remoteOrigin = client.upgradeReq.headers.origin;
			}

			if (client.readyState === WebSocket.OPEN) {
				client.send(pushMsg);
				logger.debug(' ✔ model pushed to "' + (client2name[client.id] ? client2name[client.id] : remoteOrigin) + '"');
			} else {
				logger.debug(' ✘ unable to push to "' + (client2name[client.id] ? client2name[client.id] : remoteOrigin) + '" (connection is closed)');
				client.close();
			}
		});
	},
	close: function (instance) {
		instance.getKevoreeCore().off('deployed', this.deployHandler);
		this.server.close();
	}
};
