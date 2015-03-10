var AbstractChannel = require('kevoree-entities').AbstractChannel;
var mqtt = require('mqtt');

var KEVOREE_PREFIX = 'kev/';

/**
 * Kevoree channel
 * @type {MQTTChannel}
 */
var MQTTChannel = AbstractChannel.extend({
    toString: 'MQTTChannel',

    dic_host:  { optional: false, defaultValue: 'mqtt.kevoree.org' },
    dic_port:  { optional: false, defaultValue: 81 },

    /**
     *
     * @param done
     */
    start: function (done) {
        var host = this.dictionary.getString('host'),
            port = this.dictionary.getNumber('port');

        if (host && host.length > 0 && port && port.length > 0) {
            var topic = KEVOREE_PREFIX + this.getName() + '_' + this.getNodeName();
            if (topic && topic.length > 0) {
                // create MQTT client
                this.client = mqtt.createClient(port, host);

                // register "connect" event listener
                this.client.on('connect', function () {
                    this.log.info(this.toString(), this.getName()+' connected to '+host+':'+port);
                    this.client.subscribe(topic, function (err) {
                        if (err) {
                            this.log.info(this.toString(), this.getName()+' unable to subcribe to topic '+topic+' (reason: '+err.message+')');
                        } else {
                            this.log.info(this.toString(), this.getName()+' subscribed to topic '+topic);
                        }
                    }.bind(this));
                }.bind(this));

                // register "close" event listener
                this.client.on('close', function () {
                    this.log.info(this.toString(), this.getName()+' closed connection with '+host+':'+port);
                }.bind(this));

                // register "message" event listener
                this.client.on('message', this.onMessage.bind(this));

                // register "error" event listener
                this.client.on('error', function (err) {
                    this.log.error(this.toString(), this.getName()+' error: '+err.message);
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

    onMessage: function (topic, msg) {
        this.localDispatch(msg);
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
            var targetNode = model.findByPath(path).eContainer().eContainer().name;
            if (targetNode === this.getNodeName()) {
                // local message
                this.localDispatch(msg);
            } else {
                // remote message
                this.client.publish(KEVOREE_PREFIX + this.getName() + '_' + targetNode, msg);
            }
        }.bind(this));
    }
});

module.exports = MQTTChannel;
