const kevoree = require('kevoree-library');

/*
 * Called when a client asked for a pull
 */
module.exports = function pull(logger, client2name, client, instance) {
  const nodeName = client2name[client.id];
  if (nodeName) {
    logger.info('pull requested: ' + nodeName);
  } else {
    logger.info('pull requested');
  }
  const factory = new kevoree.factory.DefaultKevoreeFactory();
  const saver = factory.createJSONSerializer();
  const modelStr = saver.serialize(instance.getKevoreeCore().getCurrentModel());
  client.send(modelStr);
};
