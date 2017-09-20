const AbstractGroup = require('kevoree-entities/lib/AbstractGroup');
const SmartSocket = require('smart-socket');
const kevoree = require('kevoree-library');

const LOOP_BREAK = 5000;
const PUSH = 'push/';
const PULL = 'pull';

/**
 * Kevoree group
 * @type {RemoteWSGroup}
 */
const RemoteWSGroup = AbstractGroup.extend({
  toString: 'RemoteWSGroup',
  tdef_version: 1,

  dic_host: {
    optional: false
  },
  dic_port: {
    optional: true,
    defaultValue: 80
  },
  dic_path: {
    optional: true,
    defaultValue: '/'
  },
  dic_answerPull: {
    optional: false,
    fragmentDependant: true,
    defaultValue: true
  },

  /**
   * this method will be called by the Kevoree platform when your group has to start
   * @param done
   */
  start(done) {
    const host = this.dictionary.getString('host');
    const port = this.dictionary.getNumber('port', 80);
    let path = this.dictionary.getString('path', '');

    if (!host) {
      done(new Error('"host" attribute is not specified'));
      return;
    }

    if (path.substr(0, 1) === '/') {
      path = path.substr(1, path.length - 1);
    }

    const url = host + ':' + port + '/' + path;
    this.ss = new SmartSocket({
      addresses: [url],
      loopBreak: LOOP_BREAK
    });

    this.ss.on('open', (client) => {
      this.log.info('connected to ' + url);
      this.getKevoreeCore().on('deployed', this.deployedHandler(client));
    });

    this.ss.on('message', (ws, msg) => {
      if (msg.type) {
        msg = msg.data;
      }

      try {
        const factory = new kevoree.factory.DefaultKevoreeFactory();
        if (msg.startsWith(PUSH)) {
          this.log.info('received a push request');
          const model = factory.createJSONLoader().loadModelFromString(msg.substr(PUSH.length, msg.length - 1)).get(0);
          this.lock = true;
          const freeLock = () => {
            this.lock = false;
          };
          this.getKevoreeCore().deploy(model).then(freeLock, freeLock);
        } else if (msg === PULL) {
          if (this.dictionary.getBoolean('answerPull', this.dic_answerPull.defaultValue)) {
            this.log.info('received a pull request');

            const serializer = factory.createJSONSerializer();
            const strModel = serializer.serialize(this.getKevoreeCore().getCurrentModel());
            ws.send(strModel);
          } else {
            this.log.info('received a pull request, but \'answerPull\' mode is false');
          }

        } else {
          if (msg.toString().length > 30) {
            msg = msg.toString().substr(0, 30) + '...';
          }
          this.log.debug('unknown incoming message (' + msg + ')');
        }
      } catch (err) {
        if (msg.toString().length > 30) {
          msg = msg.toString().substr(0, 30) + '...';
        }
        this.log.warn('unable to process incoming message (' + msg + ')');
        this.log.error(err.stack);
      }
    });

    this.ss.on('close', () => {
      this.log.info('connection lost with ' + url + ' (will retry every ' + LOOP_BREAK + 'ms until reconnected)');
    });

    this.ss.on('error', () => {
      this.log.info('connection problem with ' + url + ' (will retry every ' + LOOP_BREAK + 'ms until connected)');
    });

    this.ss.start();

    // don't wait for this to successfully connect
    done();
  },

  /**
   * this method will be called by the Kevoree platform when your group has to stop
   * @param done
   */
  stop(done) {
    this.getKevoreeCore().off('deployed', this.deployedHandler());
    if (this.ss) {
      this.ss.close(true);
    }
    done();
  },

  update(done) {
    this.stop(() => {
      this.start(done);
    });
  },

  deployedHandler(client) {
    const core = this.getKevoreeCore();
    return () => {
      if (!this.lock && client && client.readyState === 1) {
        const factory = new kevoree.factory.DefaultKevoreeFactory();
        const serializer = factory.createJSONSerializer();
        const strModel = serializer.serialize(core.getCurrentModel());
        client.send(PUSH+strModel);
      }
    };
  }
});

module.exports = RemoteWSGroup;
