var kevoree = require('kevoree-library');
var shortid = require('../util/shortid');

/*
 * Called when a client asked for a push
 */
module.exports = function push(logger, server, client2name, client, pMsg, instance) {
	var nodeName = client2name[client.id];
	if (nodeName) {
		logger.info('push issued by: ' + nodeName);
	} else {
		var origin = 'anonymous';
		if (client.upgradeReq.headers.origin) {
			origin = client.upgradeReq.headers.origin;
		}
		logger.info('push issued by ' + origin);
	}
	var factory = new kevoree.factory.DefaultKevoreeFactory();
	var loader = factory.createJSONLoader();
	try {
		var model = loader.loadModelFromString(pMsg.getModel()).get(0);
		var id = shortid(10);
		model.generated_KMF_ID = id;
		server.modelId = id;
		instance.getKevoreeCore().deploy(model);
	} catch (err) {
		logger.error('erroneous model received (push ignored)');
	}
};
