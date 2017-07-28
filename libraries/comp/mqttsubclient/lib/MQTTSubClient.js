var AbstractComponent = require('kevoree-entities/lib/AbstractComponent');
var mqtt = require('mqtt');

/**
 * Kevoree component
 * @type {MQTTSubClient}
 */
var MQTTSubClient = AbstractComponent.extend({
	toString: 'MQTTSubClient', tdef_version: 1,

	/* This is an example of dictionary attribute that you can set for your entity */
	dic_host: { optional: false },
	dic_port: { optional: false, datatype: 'number' },
	dic_topic: { defaultValue: '/' },

	/**
     * this method will be called by the Kevoree platform when your component has to start
     * @param {Function} done
     */
	start: function(done) {
		var host = this.dictionary.getString('host'),
        port = this.dictionary.getNumber('port'),
        topic = this.dictionary.getString('topic', MQTTSubClient.prototype.dic_topic.defaultValue);

		if (host && host.length > 0 && port !== null) {
			// create MQTT client
			this.client = mqtt.connect('mqtt://' + host + ':' + port);

			// register "connect" event listener
			this.client.on('connect', function() {
				this.log.info(this.getName() + ' connected to ' + host + ':' + port);
				this.client.subscribe(topic, function(err) {
					if (err) {
						this.log.info(this.getName() + ' unable to subcribe to topic ' + topic + ' (reason: ' + err.message + ')');
					} else {
						this.log.info(this.getName() + ' subscribed to topic ' + topic);
					}
				}.bind(this));
			}.bind(this));

			// register "close" event listener
			this.client.on('close', function() {
				this.log.info(this.getName() + ' closed connection with ' + host + ':' + port);
			}.bind(this));

			// register "message" event listener
			this.client.on('message', function(topic, msg) {
				this.out_onMsg(msg);
				try {
					var topicAndMsg = JSON.stringify({
						topic: topic,
						message: msg + ''
					});
					this.out_onTopicAndMsg(topicAndMsg);
				} catch (err) {
					this.log.error('Unable to serialize topic and message to JSON, onTopicAndMsg port will not be used');
				}
			}.bind(this));

			// register "error" event listener
			this.client.on('error', function(err) {
				this.log.error(this.getName() + ' error: ' + err.message);
				this.update(function() {});
			}.bind(this));

			done();

		} else {
			done(new Error('MQTTChannel error: unable to create MQTT client with given attributes (host: ' + host + ', port: ' + port + ', topic: ' + topic + ')'));
		}
	},

	/**
     * this method will be called by the Kevoree platform when your component has to stop
     * @param {Function} done
     */
	stop: function(done) {
		if (this.client) {
			this.client.end();
		}
		done();
	},

	update: function(done) {
		this.stop(function() {
			this.start(done);
		}.bind(this));
	},

	out_onMsg: function() {},
	out_onTopicAndMsg: function() {}
});

module.exports = MQTTSubClient;
