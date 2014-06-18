var AbstractGroup = require('kevoree-entities').AbstractGroup,
    SmartSocket   = require('smart-socket'),
    kevoree       = require('kevoree-library').org.kevoree;

var TIMEOUT = 5000;

/**
 * Kevoree group
 * @type {RemoteWSGroup}
 */
var RemoteWSGroup = AbstractGroup.extend({
    toString: 'RemoteWSGroup',

    dic_host: {
        optional: false,
        update: function () {
            this.stop();
            this.start();
        }
    },

    dic_port: {
        optional: false,
        update: function () {
            this.stop();
            this.start();
        }
    },

    dic_path: {
        optional: true,
        update: function () {
            this.stop();
            this.start();
        }
    },

    /**
    * this method will be called by the Kevoree platform when your group has to start
    */
    start: function (_super) {
        _super.call(this);

        var host = this.dictionary.getValue('host'),
            port = this.dictionary.getValue('port'),
            path = this.dictionary.getValue('path');

        if (isNaN(parseInt(port))) {
            throw new Error(this.toString()+' error: attribute "port" is not a number ('+port+')');
        }

        var address = host + ':' + port + processPath(path);

        this.ss = new SmartSocket({
            addresses: [ address ],
            timeout: TIMEOUT,
            handlers: {
                onopen: function (ws) {
                    this.log.info(this.toString(), 'Connected to ws://'+address);
                    ws.send(JSON.stringify({action: 'register', id: this.getPath()}));
                }.bind(this),

                onclose: function () {
                    this.log.info(this.toString(), 'Connection lost with ws://'+address+' (will retry every '+TIMEOUT+'ms until reconnected)');
                }.bind(this),

                onmessage: function (ws, msg) {
                    if (msg.type) msg = msg.data;

                    try {
                        msg = JSON.parse(msg);
                        switch (msg.action) {
                            case 'push':
                                this.log.info(this.toString(), ws._socket.remoteAddress+":"+ws._socket.remotePort+" asked for a PUSH");

                                var jsonLoader = new kevoree.loader.JSONModelLoader();
                                var model = jsonLoader.loadModelFromString(msg.model).get(0);
                                this.kCore.deploy(model);
                                break;

                            case 'pull':
                                this.log.info(this.toString(), ws._socket.remoteAddress+":"+ws._socket.remotePort+" asked for a PULL");

                                var serializer = new kevoree.serializer.JSONModelSerializer();
                                var strModel = serializer.serialize(this.kCore.getCurrentModel());
                                ws.send(JSON.stringify({
                                    action: 'pullAnswer',
                                    id: msg.id,
                                    model: strModel
                                }));
                                break;
                        }
                    } catch (err) {
                        this.log.warn(this.toString(), '"'+this.getName()+'" unable to process incoming message ('+msg.toString()+')');
                    }
                }.bind(this)
            }
        });

        this.ss.start();
    },

    /**
    * this method will be called by the Kevoree platform when your group has to stop
    */
    stop: function () {
        this.ss.close(true);
    }
});

function processPath(path) {
    if (path) {
        if (path.startsWith('/')) {
            return path;
        } else {
            return '/' + path;
        }
    }
    return '';
}

module.exports = RemoteWSGroup;
