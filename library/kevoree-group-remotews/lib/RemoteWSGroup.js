var AbstractGroup = require('kevoree-entities').AbstractGroup,
    SmartSocket   = require('smart-socket'),
    kevoree       = require('kevoree-library').org.kevoree;

var LOOP_TIMEOUT = 5000;

/**
 * Kevoree group
 * @type {RemoteWSGroup}
 */
var RemoteWSGroup = AbstractGroup.extend({
    toString: 'RemoteWSGroup',

    dic_host: { optional: false },
    dic_port: { optional: false, datatype: 'number' },
    dic_path: { optional: true },

    /**
     * this method will be called by the Kevoree platform when your group has to start
     * @param done
     */
    start: function (done) {
        this._super(function () {
            var host = this.dictionary.getValue('host'),
                port = this.dictionary.getValue('port'),
                path = this.dictionary.getValue('path');

            if (isNaN(parseInt(port))) {
                done(new Error(this.toString()+' error: attribute "port" is not a number ('+port+')'));
                return;
            }

            var address = host + ':' + port + processPath(path);

            this.ss = new SmartSocket({
                addresses: [ address ],
                loopBreak: LOOP_TIMEOUT,
                handlers: {
                    onopen: function (ws) {
                        this.log.info(this.toString(), 'Connected to ws://'+address);
                        ws.send(JSON.stringify({action: 'register', id: this.getPath()}));
                    }.bind(this),

                    onclose: function () {
                        this.log.info(this.toString(), 'Connection lost with ws://'+address+' (will retry every '+LOOP_TIMEOUT+'ms until reconnected)');
                    }.bind(this),

                    onerror: function (ws, err) {
                        this.log.info(this.toString(), 'Connection problem with ws://'+address+' (will retry every '+LOOP_TIMEOUT+'ms until connected)');
                    }.bind(this),

                    onmessage: function (ws, msg) {
                        if (msg.type) msg = msg.data;

                        try {
                            var factory = new kevoree.factory.DefaultKevoreeFactory();
                            msg = JSON.parse(msg);
                            switch (msg.action) {
                                case 'push':
                                    this.log.info(this.toString(), ws._socket.remoteAddress+":"+ws._socket.remotePort+" asked for a PUSH");

                                    var jsonLoader = factory.createJSONLoader();
                                    var model = jsonLoader.loadModelFromString(msg.model).get(0);
                                    this.kCore.deploy(model);
                                    break;

                                case 'pull':
                                    this.log.info(this.toString(), ws._socket.remoteAddress+":"+ws._socket.remotePort+" asked for a PULL");

                                    var serializer = factory.createJSONSerializer();
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

            // don't wait for this to successfully connect
            done();
        }.bind(this));
    },

    /**
     * this method will be called by the Kevoree platform when your group has to stop
     * @param done
     */
    stop: function (done) {
        this._super(function () {
            this.ss.close(true);
            done();
        }.bind(this));
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
