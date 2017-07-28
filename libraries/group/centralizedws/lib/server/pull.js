var kevoree = require('kevoree-library');

/*
 * Called when a client asked for a pull
 */
module.exports = function pull(logger, client2name, client, instance) {
	var nodeName = client2name[client.id];
	if (nodeName) {
		logger.info('pull requested: ' + nodeName);
	} else {
		logger.info('pull requested');
	}
	var factory = new kevoree.factory.DefaultKevoreeFactory();
	var saver = factory.createJSONSerializer();
	var modelStr = saver.serialize(instance.getKevoreeCore().getCurrentModel());
	client.send(modelStr);
};
