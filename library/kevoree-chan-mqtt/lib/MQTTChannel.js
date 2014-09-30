var AbstractChannel = require('kevoree-entities').AbstractChannel;
var mqtt = require('mqtt');

/**
 * Kevoree channel
 * @type {MQTTChannel}
 */
var MQTTChannel = AbstractChannel.extend({
    toString: 'MQTTChannel',

    dic_host:  { optional: false, defaultValue: 'mqtt.kevoree.org' },
    dic_port:  { optional: false, defaultValue: 81 },
    dic_topic: { optional: false, defaultValue: 'kevoree' },

    /**
     *
     * @param done
     */
    start: function (done) {
        this._super(function () {
            var host = this.dictionary.getString('host'),
                port = this.dictionary.getNumber('port');

            if (host && host.length > 0 && port && port.length > 0) {
                var topic = this.dictionary.getString('topic');
                if (topic && topic.length > 0) {
                    this.client = mqtt.createClient(port, host);

                    this.client.on('connect', function () {
                        this.log.info(this.toString(), this.getName()+' connected to '+host+':'+port);
                        this.client.subscribe(topic, function (err) {
                            if (!err) {
                                this.log.info(this.toString(), this.getName()+' subscribed to topic '+topic);
                            }
                        }.bind(this));
                    }.bind(this));

                    this.client.on('close', function () {
                        this.log.info(this.toString(), this.getName()+' closed connection with '+host+':'+port);
                    }.bind(this));

                    this.client.on('message', this.onMessage.bind(this));

                    this.client.on('error', function (err) {
                        this.log.error(this.toString(), this.getName()+' MQTT client error: '+err.message);
                        this.update();
                    }.bind(this));

                } else {
                    done(new Error('MQTTChannel error: you must specify a topic to subscribe to (topic: '+topic+')'));
                    return;
                }
            } else {
                done(new Error('MQTTChannel error: unable to create MQTT client with given attributes (host: '+host+', port: '+port+')'));
                return;
            }

            done();
        }.bind(this));
    },

    /**
     *
     * @param done
     */
    stop: function (done) {
        this._super(function () {
            if (this.client) {
                this.client.end();
            }
            done();
        }.bind(this));
    },

    update: function (done) {
        this._super(function () {
            this.stop(function () {
                this.start(done);
            }.bind(this));
        }.bind(this));
    },

    onMessage: function (topic, msg) {
        try {
            var msgObj = JSON.parse(msg);
            if (msgObj.node === this.getNodeName()) {
                this.localDispatch(msgObj.msg);
            }

        } catch (err) {
            this.log.warn(this.toString(), '"'+this.getName()+'" unable to parse incoming message into a JSON object (drop message)');
        }
    },

    /**
    * When a channel is bound with an output port this method will be called when a message is sent
    *
    * @param fromPortPath port that sends the message
    * @param destPortPaths port paths of connected input port that should receive the message
    * @param msg
    */
    onSend: function (fromPortPath, destPortPaths, msg) {
        this._super();

        var model = this.getKevoreeCore().getDeployModel() || this.getKevoreeCore().getCurrentModel();

        destPortPaths.forEach(function (path) {
            var port = model.findByPath(path);
            if (port.eContainer().eContainer().name === this.getNodeName()) {
                // local message
                this.localDispatch(msg);
            } else {
                // remote message
                var topic = this.dictionary.getString('topic');
                if (topic && topic.length > 0) {
                    this.client.publish(topic, JSON.stringify({
                        node: port.eContainer().eContainer().name,
                        msg: msg
                    }));
                } else {
                    this.log.error(this.toString(), 'Unable to send message. "'+this.getName()+'.topic" value is null or empty.');
                }
            }
        }.bind(this));
    }
});

module.exports = MQTTChannel;
