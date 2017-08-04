const kevoree = require('kevoree-library');

const RegisteredMessage = require('../protocol/RegisteredMessage');
const shortid = require('../util/shortid');
const reducer = require('../util/reducer');
const HeartBeatManager = require('../util/heartbeat-manager');
const findMasterNode = require('../util/find-master-node');

/*
 * Called when a client asked for registration
 */
module.exports = function register(logger, client2name, client, pMsg, instance) {
  if (client2name[client.id]) {
    logger.warn('node "' + client2name[client.id] + '" is already registered (id=' + client.id + ')');

  } else {
    client.id = shortid(10);
    client2name[client.id] = pMsg.getNodeName();
    logger.info('node "' + pMsg.getNodeName() + '" registered (id=' + client.id + ')');

    const factory = new kevoree.factory.DefaultKevoreeFactory();
    const loader = factory.createJSONLoader();
    const cloner = factory.createModelCloner();
    let model = null;

    try {
      model = loader.loadModelFromString(pMsg.getModel()).get(0);
    } catch (e) {
      logger.warn('erroneous model received from "' + pMsg.getNodeName() + '" registration');
      logger.warn(e.stack);
    }

    if (model) {
      const group = instance.getModelEntity();
      const masterNode = findMasterNode(group);
      if (masterNode) {
        const masterName = masterNode.name;
        logger.debug('reducing register model for master "' + masterName + '" and client "' + pMsg.getNodeName() + '"...');
        const registerModel = reducer(model, masterName, pMsg.getNodeName());
        const compare = factory.createModelCompare();
        const kCore = instance.getKevoreeCore();
        const currentModel = cloner.clone(kCore.getCurrentModel());
        compare.merge(registerModel, currentModel).applyOn(registerModel);
        // fs.writeFileSync('/tmp/master-register-'+pMsg.getNodeName()+'.json', JSON.stringify(JSON.parse(factory.createJSONSerializer().serialize(registerModel)), null, 2), 'utf8');
        instance.isRegister = true;
        logger.debug('isRegister lock = true');
        kCore.deploy(registerModel, () => {
          logger.debug('isRegister lock = false');
          instance.isRegister = false;
        });
      } else {
        throw new Error('Unable to find a master node');
      }
    }

    // send registered ack back to client
    client.send(new RegisteredMessage().toRaw());

    const hbManager = new HeartBeatManager(client, process.env.KEV_CWSG_HB || 15000);
    hbManager.start();
  }
};
