var AbstractGroup = require('kevoree-entities').AbstractGroup,
    SmartSocket   = require('smart-socket'),
    kevoree       = require('kevoree-library').org.kevoree;

var LOOP_BREAK = 5000,
    PUSH       = 'push/',
    PULL       = 'pull';

/**
 * Kevoree group
 * @type {RemoteWSGroup}
 */
var RemoteWSGroup = AbstractGroup.extend({
    toString: 'RemoteWSGroup',

    dic_host: { optional: false },
    dic_port: { optional: true, defaultValue: 80 },
    dic_path: { optional: true, defaultValue: '/' },

    /**
     * this method will be called by the Kevoree platform when your group has to start
     * @param done
     */
    start: function (done) {
        var host = this.dictionary.getString('host'),
            port = this.dictionary.getNumber('port', 80),
            path = this.dictionary.getString('path', '');

        if (!host) {
            done(new Error('"host" attribute is not specified'));
            return;
        }

        if (path.substr(0, 1) === '/') {
            path = path.substr(1, path.length-1);
        }

        var url = host+':'+port+'/'+path;
        this.ss = new SmartSocket({
            addresses: [ url ],
            loopBreak: LOOP_BREAK
        });

        this.ss.on('open', function () {
            this.log.info(this.toString(), 'Connected to '+url);
        }.bind(this));

        this.ss.on('message', function (ws, msg) {
            if (msg.type) {
                msg = msg.data;
            }

            try {
                var factory = new kevoree.factory.DefaultKevoreeFactory();
                if (msg.startsWith(PUSH)) {
                    this.log.info(this.toString(), '"'+this.getName()+'" received a push request');

                    var jsonLoader = factory.createJSONLoader();
                    var model = jsonLoader.loadModelFromString(msg.substr(PUSH.length, msg.length-1)).get(0);
                    this.kCore.deploy(model);

                } else if (msg === PULL) {
                    this.log.info(this.toString(), '"'+this.getName()+'" received a pull request');

                    var serializer = factory.createJSONSerializer();
                    var strModel = serializer.serialize(this.kCore.getCurrentModel());
                    ws.send(strModel);

                } else {
                    this.log.debug(this.toString(), '"'+this.getName()+'" unknown incoming message ('+msg.toString()+')');
                }
            } catch (err) {
                this.log.warn(this.toString(), '"'+this.getName()+'" unable to process incoming message ('+msg.toString()+')');
                this.log.error(this.toString(), err.stack);
            }
        }.bind(this));

        this.ss.on('close', function () {
            this.log.info(this.toString(), 'Connection lost with '+url+' (will retry every '+LOOP_BREAK+'ms until reconnected)');
        }.bind(this));

        this.ss.on('error', function () {
            this.log.info(this.toString(), 'Connection problem with '+url+' (will retry every '+LOOP_BREAK+'ms until connected)');
        }.bind(this));

        this.ss.start();

        // don't wait for this to successfully connect
        done();
    },

    /**
     * this method will be called by the Kevoree platform when your group has to stop
     * @param done
     */
    stop: function (done) {
        if (this.ss) {
            this.ss.close(true);
        }
        done();
    }
});

module.exports = RemoteWSGroup;
