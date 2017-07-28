// var fs = require('fs');
var kevoree = require('kevoree-library');
var RegisterMessage = require('../protocol/RegisterMessage');

module.exports = function register(logger, client, instance) {
	// XXX take extra caution of the possible side-effects of a register
	// XXX message received before the current node even end the first deployment
	// XXX which will inevitably result in unexpected model merging
	var factory = new kevoree.factory.DefaultKevoreeFactory();
	var serializer = factory.createJSONSerializer();
	var modelStr;

	try {
		modelStr = serializer.serialize(instance.getKevoreeCore().getCurrentModel());
		// fs.writeFileSync('/tmp/client-register-'+instance.getNodeName()+'.json', JSON.stringify(JSON.parse(modelStr), null, 2), 'utf8');
	} catch (err) {
		logger.warn('unable to serialize register model');
	}

	if (modelStr) {
		// sending register message
		var rMsg = new RegisterMessage(instance.getNodeName(), modelStr);
		client.send(rMsg.toRaw());
	}
};
