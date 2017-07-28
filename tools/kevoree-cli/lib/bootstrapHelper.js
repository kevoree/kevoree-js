module.exports = function bootstrapHelper(kevs, options, callback) {
	if (options.model) {
		if (options.model.findNodesByID(options.nodeName)) {
			callback(null, options.model);
		} else {
			callback(new Error('Unable to find node instance "' + options.nodeName + '" in given model.'));
		}
	} else {
		// generates a default model
		let data = 'add {{nodeName}} : JavascriptNode\n' +
		'add {{groupName}} : WSGroup\n' +
		'attach {{nodeName}} {{groupName}}\n' +
		'set {{groupName}}.port/{{nodeName}} = \'{{groupPort}}\'';

		data = data.replace(/{{nodeName}}/g, options.nodeName).replace(/{{groupName}}/g, options.groupName).replace(/{{groupPort}}/g, options.groupPort);
		if (options.logLevel && options.logLevel !== 'info') {
			data += '\nset {{nodeName}}.logLevel = \'{{logLevel}}\''.replace(/{{nodeName}}/g, options.nodeName).replace(/{{logLevel}}/g, options.logLevel);
		}
		options.logger.warn('No bootstrap model given, using:\n' + data);
		kevs.parse(data, callback);
	}
};
