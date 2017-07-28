var AbstractChannel = require('kevoree-entities').AbstractChannel;
var mqtt = require('mqtt');

/**
 * Kevoree channel
 * @type {MQTTChannel}
 */
var MQTTChannel = AbstractChannel.extend({
    toString: 'MQTTChannel',
    tdef_version: 1,

    dic_host: { optional: false, defaultValue: 'mqtt.kevoree.org' },
    dic_port: { optional: false, defaultValue: 81 },
    dic_uuid: { optional: false },

    /**
     *
     * @param done
     */
    start: function (done) {
        var host = this.dictionary.getString('host'),
            port = this.dictionary.getNumber('port'),
            uuid = this.dictionary.getString('uuid');

        if (!uuid || uuid.trim().length === 0) {
            done(new Error('"uuid" attribute must be set'));
            return;
        }
        this.uuid = uuid.replace(/(\/)*$/, '');

        if (host && host.length > 0 && port && port.length > 0) {
            var topic = this.uuid + '/#';
            if (topic && topic.length > 0) {
                // create MQTT client
                this.client = mqtt.createClient(port, host);

                // register "connect" event listener
                this.client.on('connect', function () {
                    this.log.info(this.getName()+' connected to '+host+':'+port);
                    this.client.subscribe(topic, function (err) {
                        if (err) {
                            this.log.info(this.getName()+' unable to subcribe to topic '+topic+' (reason: '+err.message+')');
                        } else {
                            this.log.info(this.getName()+' subscribed to topic '+topic);
                        }
                    }.bind(this));
                }.bind(this));

                // register "close" event listener
                this.client.on('close', function () {
                    this.log.info(this.getName()+' closed connection with '+host+':'+port);
                }.bind(this));

                // register "message" event listener
                this.client.on('message', function (topic, msg) {
                    this.getInputs().forEach(function (path) {
                        if (this.uuid+path === topic) {
                            this.localDispatch(msg);
                        }
                    }.bind(this));
                }.bind(this));

                // register "error" event listener
                this.client.on('error', function (err) {
                    this.log.error(this.getName()+' error: '+err.message);
                    this.update(function () {});
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
    },

    /**
     *
     * @param done
     */
    stop: function (done) {
        if (this.client) {
            this.client.end();
        }
        done();
    },

    update: function (done) {
        this.stop(function () {
            this.start(done);
        }.bind(this));
    },

    /**
    * When a channel is bound with an output port this method will be called when a message is sent
    *
    * @param fromPortPath port that sends the message
    * @param destPortPaths port paths of connected input port that should receive the message
    * @param msg
    * @param callback
    */
    onSend: function (fromPortPath, destPortPaths, msg, callback) {
        var model = this.getKevoreeCore().getDeployModel() || this.getKevoreeCore().getCurrentModel();

        destPortPaths.forEach(function (path) {
            var targetNode = model.findByPath(path).eContainer().eContainer().name;
            if (targetNode === this.getNodeName()) {
                // local message
                this.localDispatch(msg);
            } else {
                // remote message
                if (this.client) {
                    this.client.publish(this.uuid+path, msg+'');
                }
            }
        }.bind(this));
    }
});

module.exports = MQTTChannel;
