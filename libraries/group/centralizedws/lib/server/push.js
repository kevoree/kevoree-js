const kevoree = require('kevoree-library');
const shortid = require('../util/shortid');

/*
 * Called when a client asked for a push
 */
module.exports = function push(logger, server, client2name, client, pMsg, instance) {
  const nodeName = client2name[client.id];
  if (nodeName) {
    logger.info('push issued by: ' + nodeName);
  } else {
    let origin = 'anonymous';
    if (client.upgradeReq.headers.origin) {
      origin = client.upgradeReq.headers.origin;
    }
    logger.info('push issued by ' + origin);
  }
  const factory = new kevoree.factory.DefaultKevoreeFactory();
  const loader = factory.createJSONLoader();
  try {
    const model = loader.loadModelFromString(pMsg.getModel()).get(0);
    const id = shortid(10);
    model.generated_KMF_ID = id;
    server.modelId = id;
    instance.getKevoreeCore().deploy(model);
  } catch (err) {
    logger.error('erroneous model received (push ignored)');
  }
};
