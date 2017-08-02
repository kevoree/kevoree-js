const RWebSocket = require('rwebsocket');
const shrink = require('../util/shrink');
const findMasterNode = require('../util/find-master-node');
const findMasterNets = require('../util/find-master-nets');
const register = require('./register');
const push = require('./push');
const Protocol = require('../protocol/Protocol');
const PushMessage = require('../protocol/PushMessage');
const RegisteredMessage = require('../protocol/RegisteredMessage');
const PushKevSMessage = require('../protocol/PushKevSMessage');

function getUri(logger, port, instance, masterNetName, masterNetValueName) {
  let uri = '';
  if (port === 443) {
    uri = 'wss://';
  } else {
    uri = 'ws://';
  }

  const masterNode = findMasterNode(instance.getModelEntity());
  if (masterNode) {
    const nets = findMasterNets(instance.getModelEntity(), masterNode);
    if (nets[masterNetName]) {
      if (nets[masterNetName][masterNetValueName]) {
        return uri + nets[masterNetName][masterNetValueName] + ':' + port;
      } else {
        throw new Error('Unable to find network value named "' + masterNetValueName + '" for master node "' + masterNode.name + '"');
      }
    } else {
      throw new Error('Unable to find network "' + masterNetName + '" for master node "' + masterNode.name + '"');
    }
  } else {
    throw new Error('No master node found. Did you set one node "isMaster" to "true"?');
  }
}

module.exports = {
  create: function (logger, port, instance, masterNetName, masterNetValueName) {
    const self = this;
    const uri = getUri(logger, port, instance, masterNetName, masterNetValueName);
    self.client = new RWebSocket(uri);

    self.client.onopen = function () {
      logger.info('connected to ' + uri);
      register(logger, self.client, instance);
    };

    self.client.onmessage = function (msg) {
      if (typeof msg === 'object') {
        // data is a MessageEvent not a raw string
        msg = msg.data;
      }

      const pMsg = Protocol.parse(msg);
      if (pMsg) {
        if (self.client.isRegistered) {
          // registered client
          switch (pMsg.getType()) {
            case PushMessage.TYPE:
              push(logger, pMsg, instance);
              break;

            case PushKevSMessage.TYPE:
              // TODO
              logger.debug('kevs push are not handled yet');
              // push(logger, client2name, client, pMsg, instance);
              break;

            default:
              logger.warn('unknown message type: ' + pMsg.getType() + ' (msg: "' + shrink(msg, 15) + '")');
              break;
          }
        } else {
          // unregistered client
          switch (pMsg.getType()) {
            case RegisteredMessage.TYPE:
              self.client.isRegistered = true;
              break;

            default:
              logger.warn('ignoring message type "' + pMsg.getType() + '" send by master (state: not yet registered)');
              break;
          }

        }
      } else {
        logger.warn('unable to parse message: ' + shrink(msg, 20));
      }
    };

    self.client.onclose = function (evt) {
      self.client.isRegistered = false;
      if (evt.code !== 1000) {
        // reconnect();
      } else {
        logger.info('connection closed with ' + uri + ' (code=' + evt.code + ',reason=' + evt.status + ')');
      }
    };

    self.client.connect();

    return this;
  },
  close: function () {
    this.client.close();
  }
};
