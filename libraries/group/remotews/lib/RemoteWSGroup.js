var AbstractGroup = require('kevoree-entities/lib/AbstractGroup');
var SmartSocket = require('smart-socket');
var kevoree = require('kevoree-library');

var LOOP_BREAK = 5000,
  PUSH = 'push/',
  PULL = 'pull';

/**
 * Kevoree group
 * @type {RemoteWSGroup}
 */
var RemoteWSGroup = AbstractGroup.extend({
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
  start: function (done) {
    var host = this.dictionary.getString('host'),
      port = this.dictionary.getNumber('port', 80),
      path = this.dictionary.getString('path', '');

    if (!host) {
      done(new Error('"host" attribute is not specified'));
      return;
    }

    if (path.substr(0, 1) === '/') {
      path = path.substr(1, path.length - 1);
    }

    var url = host + ':' + port + '/' + path;
    this.ss = new SmartSocket({
      addresses: [url],
      loopBreak: LOOP_BREAK
    });

    this.ss.on('open', function (client) {
      this.log.info('Connected to ' + url);
      this.getKevoreeCore().on('deployed', this.deployedHandler(client));
    }.bind(this));

    this.ss.on('message', function (ws, msg) {
      if (msg.type) {
        msg = msg.data;
      }

      try {
        var factory = new kevoree.factory.DefaultKevoreeFactory();
        if (msg.startsWith(PUSH)) {
          this.log.info('"' + this.getName() + '" received a push request');
          var model = factory.createJSONLoader().loadModelFromString(msg.substr(PUSH.length, msg.length - 1)).get(0);
          this.lock = true;
          try {
            this.getKevoreeCore().deploy(model, function () {
              this.lock = false;
            }.bind(this));
          } catch (ignore) {
            this.lock = false;
          }

        } else if (msg === PULL) {
          if (this.dictionary.getBoolean('answerPull', this.dic_answerPull.defaultValue)) {
            this.log.info('"' + this.getName() + '" received a pull request');

            var serializer = factory.createJSONSerializer();
            var strModel = serializer.serialize(this.getKevoreeCore().getCurrentModel());
            ws.send(strModel);
          } else {
            this.log.info('"' + this.getName() + '" received a pull request, but \'answerPull\' mode is false');
          }

        } else {
          if (msg.toString().length > 30) {
            msg = msg.toString().substr(0, 30) + '...';
          }
          this.log.debug('"' + this.getName() + '" unknown incoming message (' + msg + ')');
        }
      } catch (err) {
        if (msg.toString().length > 30) {
          msg = msg.toString().substr(0, 30) + '...';
        }
        this.log.warn('"' + this.getName() + '" unable to process incoming message (' + msg + ')');
        this.log.error(err.stack);
      }
    }.bind(this));

    this.ss.on('close', function () {
      this.log.info('Connection lost with ' + url + ' (will retry every ' + LOOP_BREAK + 'ms until reconnected)');
    }.bind(this));

    this.ss.on('error', function () {
      this.log.info('Connection problem with ' + url + ' (will retry every ' + LOOP_BREAK + 'ms until connected)');
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
    this.getKevoreeCore().off('deployed', this.deployedHandler());
    if (this.ss) {
      this.ss.close(true);
    }
    done();
  },

  update: function (done) {
    this.stop(function () {
      this.start(done);
    }.bind(this));
  },

  deployedHandler: function (client) {
    var core = this.getKevoreeCore();
    return function () {
      if (!this.lock && client && client.readyState === 1) {
        var factory = new kevoree.factory.DefaultKevoreeFactory();
        var serializer = factory.createJSONSerializer();
        var strModel = serializer.serialize(core.getCurrentModel());
        client.send(PUSH+strModel);
      }
    }.bind(this);
  }
});

module.exports = RemoteWSGroup;
