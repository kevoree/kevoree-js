const WebSocket = require('ws');
const kevoree = require('kevoree-library');

const Protocol = require('../protocol/Protocol');
const RegisterMessage = require('../protocol/RegisterMessage');
const PushMessage = require('../protocol/PushMessage');
const PullMessage = require('../protocol/PullMessage');
const PushKevSMessage = require('../protocol/PushKevSMessage');
const shrink = require('../util/shrink');
const reducer = require('../util/reducer');
const findMasterNode = require('../util/find-master-node');

const register = require('./register');
const pull = require('./pull');
const push = require('./push');
const unregister = require('./unregister');

const client2name = {};

function statusLog(status) {
  if (status && status.length > 0) {
    return ', status=' + status + '';
  }

  return '';
}

function onMessage(logger, server, client, msg, instance) {
  const pMsg = Protocol.parse(msg);
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
          instance.submitScript(pMsg.getKevScript(), () => {
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
    let origin = 'unknown';
    if (client.upgradeReq.headers.origin) {
      origin = client.upgradeReq.headers.origin;
    }
    logger.debug('client "' + origin + '" disconnected');
  }
}

function onConnection(logger, server, client, instance) {
  client.on('message', (msg) => {
    onMessage(logger, server, client, msg, instance);
  });

  client.on('close', (code, status) => {
    onClose(logger, client, instance, code, status);
  });
}

module.exports = {
  client2name: client2name,
  create(logger, port, instance) {
    this.server = new WebSocket.Server({
      port: port
    }, () => {
      logger.info('listening on 0.0.0.0:' + port);
    });

    this.server.on('connection', (client) => {
      onConnection(logger, this.server, client, instance);
    });

    this.deployHandler = () => {
      if (this.server.clients.length > 0 && !instance.isRegister) {
        logger.debug('=== Broadcast new model to clients ===');
        this.broadcast(logger, instance);
        logger.debug('=== Broadcast done ===');
      } else {
        logger.debug('Deployment is issued by a register (ignore broadcast)');
      }
    };

    instance.getKevoreeCore().on('deployed', this.deployHandler);

    return this;
  },
  broadcast(logger, instance) {
    const factory = new kevoree.factory.DefaultKevoreeFactory();
    const serializer = factory.createJSONSerializer();
    const model = instance.getKevoreeCore().getCurrentModel();

    let processedModel = model;
    const group = instance.getModelEntity();
    const masterName = findMasterNode(group).name;
    const doReduceModel = instance.getDictionary().getBoolean('reduceModel', instance.dic_reduceModel.defaultValue);

    this.server.clients.forEach((client) => {
      if (client.id) {
        // this "client" is a registered node
        const name = client2name[client.id];
        if (doReduceModel) {
          processedModel = reducer(model, masterName, name);
          logger.debug(' ✔ reduced model for "' + name + '"');
        }
      }

      const modelStr = serializer.serialize(processedModel);
      const pushMsg = new PushMessage(modelStr).toRaw();

      let remoteOrigin = 'unknown';
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
  close(instance) {
    instance.getKevoreeCore().off('deployed', this.deployHandler);
    this.server.close();
  }
};
