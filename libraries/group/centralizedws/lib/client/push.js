// var fs = require('fs');
var kevoree = require('kevoree-library');
var findMasterNode = require('../util/find-master-node');

module.exports = function register(logger, pMsg, instance) {
	var factory = new kevoree.factory.DefaultKevoreeFactory();
	var loader = factory.createJSONLoader();
	var model;

	try {
		model = loader.loadModelFromString(pMsg.getModel()).get(0);
		// get out of try/catch if loadModelFromString didn't fail otherwise
		// it could catch unwanted errors
	} catch (err) {
		logger.warn('unable to parse model pushed from master "'+findMasterNode(instance.getModelEntity()).name+'"');
	}

	if (model) {
		// fs.writeFileSync('/tmp/client-push-'+instance.getNodeName()+'.json', JSON.stringify(JSON.parse(pMsg.getModel()), null, 2), 'utf8');
		// deploy received model locally
		instance.getKevoreeCore().deploy(model);
	}
};
