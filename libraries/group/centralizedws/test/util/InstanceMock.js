const kGroupMock = require('./kGroupMock');

function InstanceMock(nodeName, name) {
	this.nodeName = nodeName;
	this.name = name;
	this.currentModel = null;
	this.kInstance = kGroupMock;
	this.dictionary = {
		getString: function (name) {
			switch (name) {
				case 'masterNet':
					return 'lo.ipv4';
				case 'onDisconnect':
					return '// nothing';
				default:
					return undefined;
			}
		}
	};
	this.dic_onDisconnect = {};
	this.dic_onDisconnect.defaultValue = 'lo.ipv4';
}

InstanceMock.prototype = {
	getName: function () {
		return this.name;
	},

	getNodeName: function () {
		return this.nodeName;
	},

	getKevoreeCore: function () {
		const self = this;
		return {
			getCurrentModel: function () {
				return self.currentModel;
			},
			deploy: function () {},
			on: function () {},
			off: function () {},
			submitScript: function () {}
		};
	},

	getModelEntity: function () {
		return this.kInstance;
	},

	getDictionary: function () {
		return this.dictionary;
	}
};

module.exports = InstanceMock;
