// var fs = require('fs');
const kevoree = require('kevoree-library');
const RegisterMessage = require('../protocol/RegisterMessage');

module.exports = function register(logger, client, instance) {
  // XXX take extra caution of the possible side-effects of a register
  // XXX message received before the current node even end the first deployment
  // XXX which will inevitably result in unexpected model merging
  const factory = new kevoree.factory.DefaultKevoreeFactory();
  const serializer = factory.createJSONSerializer();
  let modelStr;

  try {
    modelStr = serializer.serialize(instance.getKevoreeCore().getCurrentModel());
    // fs.writeFileSync('/tmp/client-register-'+instance.getNodeName()+'.json', JSON.stringify(JSON.parse(modelStr), null, 2), 'utf8');
  } catch (err) {
    logger.warn('unable to serialize register model');
  }

  if (modelStr) {
    // sending register message
    const rMsg = new RegisterMessage(instance.getNodeName(), modelStr);
    client.send(rMsg.toRaw());
  }
};
