'use strict';

var PREFIX = 'out_';

function Output(compInstance, portElem) {
	this.path = portElem.path();
	this.channels = {};

	var fieldName = PREFIX + portElem.name;

	if (typeof compInstance[fieldName] === 'undefined') {
		throw new Error('Unable to find output port field \'' + fieldName + '\' in component \'' + compInstance.name + '\'');
	} else {
		var self = this;
		compInstance[fieldName] = function internalSend(msg, callback) {
			var channelPaths = Object.keys(self.channels);
			if (channelPaths.length > 0) {
				compInstance.log.debug(compInstance.toString(), compInstance.name + '.' + portElem.name + ' -> ' + msg);
			} else {
				compInstance.log.debug(compInstance.toString(), compInstance.name + '.' + portElem.name + ' -> ' + msg + ' (dropped)');
			}
			channelPaths.forEach(function (chanPath) {
				self.channels[chanPath].internalSend(portElem.path(), msg, callback);
			});
		};
	}
}

Output.prototype = {
	addChannel: function (chanInstance) {
		this.channels[chanInstance.path] = chanInstance;
	},

	removeChannel: function (chanInstance) {
		delete this.channels[chanInstance.path];
	}
};

module.exports = Output;
module.exports.PREFIX = PREFIX;
