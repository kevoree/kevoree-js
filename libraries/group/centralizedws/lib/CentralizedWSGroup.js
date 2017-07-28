var AbstractGroup = require('kevoree-entities/lib/AbstractGroup');
var server = require('./server');
var client = require('./client');

function logger(log, tag) {
	return {
		info: function (msg) {
			log.info('CentralizedWSGroup', tag + ' ' + msg);
		},
		debug: function (msg) {
			log.debug('CentralizedWSGroup', tag + ' ' + msg);
		},
		warn: function (msg) {
			log.warn('CentralizedWSGroup', tag + ' ' + msg);
		},
		error: function (msg) {
			log.error('CentralizedWSGroup', tag + ' ' + msg);
		}
	};
}

var CentralizedWSGroup = AbstractGroup.extend({
	toString: 'CentralizedWSGroup',
	tdef_version: 2,

	dic_isMaster: {
		optional: false,
		defaultValue: false,
		fragmentDependant: true
	},
	dic_masterNet: {
		optional: false,
		defaultValue: 'lo.ipv4',
		fragmentDependant: true
	},
	dic_port: {
		optional: false,
		defaultValue: 9000
	},
	dic_onDisconnect: {
		defaultValue: ''
	},
	dic_reduceModel: {
		optional: false,
		defaultValue: true
	},

	start: function (done) {
		var isMaster = this.dictionary.getBoolean('isMaster', this.dic_isMaster.defaultValue);
		var masterNet = this.dictionary.getString('masterNet', this.dic_masterNet.defaultValue);
		var port = this.dictionary.getNumber('port', this.dic_port.defaultValue);

		var rMasterNet = masterNet.match(/^([a-z0-9A-Z]+)\.([a-z0-9A-Z]+)$/);
		if (rMasterNet && rMasterNet.length > 0) {
			if (isMaster) {
				this.fragment = server.create(logger(this.log, '[' + this.name + '][master]'), port, this);
				done();
			} else {
				try {
					this.fragment = client.create(logger(this.log, '[' + this.name + '][client]'), port, this, rMasterNet[1], rMasterNet[2]);
					done();
				} catch (err) {
					done(err);
				}
			}

			var self = this;
			this.dictionary.on('port', function () {
				if (isMaster) {
					this.fragment.broadcast(logger(this.log, '[' + this.name + '][master]'), this);
				}
				this.stop(function () {
					self.start(function () {});
				});
			});

		} else {
			done(new Error('"masterNet" param must comply with ' + /^[a-z0-9A-Z]+\.[a-z0-9A-Z]+$/));
		}
	},

	stop: function (done) {
		this.fragment.close(this);
		done();
	}
});

module.exports = CentralizedWSGroup;
