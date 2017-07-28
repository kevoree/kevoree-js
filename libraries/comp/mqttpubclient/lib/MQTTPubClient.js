var AbstractComponent = require('kevoree-entities/lib/AbstractComponent');
var mqtt = require('mqtt');

/**
 * Kevoree component
 * @type {MQTTPubClient}
 */
var MQTTPubClient = AbstractComponent.extend({
	toString: 'MQTTPubClient', tdef_version: 1,

	/* This is an example of dictionary attribute that you can set for your entity */
	dic_host: {
		optional: false
	},
	dic_port: {
		optional: false,
		datatype: 'number'
	},
	dic_topic: {
		defaultValue: '/'
	},

	/**
   * this method will be called by the Kevoree platform when your component has to start
   * @param {Function} done
   */
	start: function(done) {
		var host = this.dictionary.getString('host'),
			port = this.dictionary.getNumber('port'),
			topic = this.dictionary.getString('topic', MQTTPubClient.prototype.dic_topic.defaultValue);

		if (host && host.length > 0 && port !== null) {
			// create MQTT client
			this.client = mqtt.connect('mqtt://' + host + ':' + port);

			// register "connect" event listener
			this.client.on('connect', function() {
				this.log.info(this.getName() + ' connected to ' + host + ':' + port);
			}.bind(this));

			// register "close" event listener
			this.client.on('close', function() {
				this.log.info(this.getName() + ' closed connection with ' + host + ':' + port);
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

	in_pub: function(msg) {
		var topic = this.dictionary.getString('topic', MQTTPubClient.prototype.dic_topic.defaultValue);
		if (this.client) {
			this.client.publish(topic, msg + '');
			this.log.debug('"' + this.getName() + '" publishing "' + msg + '" to "' + topic + '"');
		}
	},

	in_jsonPub: function(msg) {
    var parsed = false;
		try {
			msg = JSON.parse(msg);
      if (msg.topic === undefined && msg.message === undefined) {
        this.log.error('"' + this.getName() + '" incoming JSON message is malformed (msg.topic = '+msg.topic+', msg.message = '+msg.message+')');
      } else {
        parsed = true;
      }
    } catch (err) {
      this.log.error('"' + this.getName() + '" unable to parse incoming JSON message, message will not be publish to MQTT server');
    }

    if (parsed && this.client) {
      this.client.publish(msg.topic, msg.message + '');
      this.log.debug('"' + this.getName() + '" publishing "' + msg.message + '" to "' + msg.topic + '"');
    }
	}
});

module.exports = MQTTPubClient;
