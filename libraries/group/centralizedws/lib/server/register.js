var kevoree = require('kevoree-library');

var RegisteredMessage = require('../protocol/RegisteredMessage');
var shortid = require('../util/shortid');
var reducer = require('../util/reducer');
var HeartBeatManager = require('../util/heartbeat-manager');
var findMasterNode = require('../util/find-master-node');

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

		var factory = new kevoree.factory.DefaultKevoreeFactory();
		var loader = factory.createJSONLoader();
		var cloner = factory.createModelCloner();
		var model = null;

		try {
			model = loader.loadModelFromString(pMsg.getModel()).get(0);
		} catch (e) {
			logger.warn('erroneous model received from "' + pMsg.getNodeName() + '" registration');
			logger.warn(e.stack);
		}

		if (model) {
			var group = instance.getModelEntity();
			var masterName = findMasterNode(group).name;
			logger.debug('reducing register model for master "' + masterName + '" and client "' + pMsg.getNodeName() + '"...');
			var registerModel = reducer(model, masterName, pMsg.getNodeName());
			var compare = factory.createModelCompare();
			var kCore = instance.getKevoreeCore();
			var currentModel = cloner.clone(kCore.getCurrentModel());
			compare.merge(registerModel, currentModel).applyOn(registerModel);
			// fs.writeFileSync('/tmp/master-register-'+pMsg.getNodeName()+'.json', JSON.stringify(JSON.parse(factory.createJSONSerializer().serialize(registerModel)), null, 2), 'utf8');
			instance.isRegister = true;
			logger.debug('isRegister lock = true');
			kCore.deploy(registerModel, function () {
				logger.debug('isRegister lock = false');
				instance.isRegister = false;
			});
		}

		// send registered ack back to client
		client.send(new RegisteredMessage().toRaw());

		var hbManager = new HeartBeatManager(client, process.env.KEV_CWSG_HB || 15000);
		hbManager.start();
	}
};
