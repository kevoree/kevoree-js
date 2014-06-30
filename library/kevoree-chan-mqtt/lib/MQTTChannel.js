var AbstractChannel = require('kevoree-entities').AbstractChannel;
var mqtt = require('mqtt');

/**
 * Kevoree channel
 * @type {MQTTChannel}
 */
var MQTTChannel = AbstractChannel.extend({
    toString: 'MQTTChannel',

    dic_host: {
        optional: false,
        defaultValue: 'mqtt.kevoree.org'
    },

    dic_port: {
        optional: false,
        datatype: 'number',
        defaultValue: 81
    },

    dic_topic: {
        optional: false,
        defaultValue: 'kevoree'
    },

    start: function (_super) {
        _super.call(this);

        var host = this.dictionary.getValue('host'),
            port = this.dictionary.getValue('port');

        if (host && host.length > 0 && port && port.length > 0) {
            var topic = this.dictionary.getValue('topic');
            if (topic && topic.length > 0) {
                this.client = mqtt.createClient(port, host);
                this.client.subscribe(topic);
                this.log.info(this.toString(), this.getName()+' connected & subscribed to mqtt://'+host+':'+port+'/'+topic);

                this.client.on('message', this.onMessage.bind(this));
                this.client.on('error', function (err) {
                    this.log.error(this.toString(), this.getName()+' MQTT client error: '+err.message);
                    this.update();
                }.bind(this));

            } else {
                throw new Error('MQTTChannel error: you must specify a topic to subscribe to (topic: '+topic+')');
            }
        } else {
            throw new Error('MQTTChannel error: unable to create MQTT client with given attributes (host: '+host+', port: '+port+')');
        }
    },

    stop: function (_super) {
        _super.call(this);
        if (this.client) {
            this.client.end();
        }
    },

    update: function (_super) {
        _super.call(this);
        this.stop();
        this.start();
    },

    onMessage: function (topic, msg) {
        try {
            var msgObj = JSON.parse(msg);
            if (msgObj.node === this.getNodeName()) {
                this.localDispatch(msgObj.msg);
            }

        } catch (err) {
            this.log.warn(this.toString(), this.getName()+' unable to parse incoming message into a JSON object (drop message)');
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
        var model = this.getKevoreeCore().getCurrentModel();
        destPortPaths.forEach(function (path) {
            var port = model.findByPath(path);
            if (port.eContainer().eContainer().name === this.getNodeName()) {
                // local message
                this.localDispatch(msg);
            } else {
                // remote message
                var msgObj = {
                    node: port.eContainer().eContainer().name,
                    msg: msg
                };
                this.client.publish(this.dictionary.getValue('topic'), JSON.stringify(msgObj));
            }
        }.bind(this));
    }
});

module.exports = MQTTChannel;
