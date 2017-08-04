const AbstractGroup = require('kevoree-entities/lib/AbstractGroup');
const server = require('./server');
const client = require('./client');

function logger(log, tag) {
  return {
    info: (msg) => {
      log.info('CentralizedWSGroup', tag + ' ' + msg);
    },
    debug: (msg) => {
      log.debug('CentralizedWSGroup', tag + ' ' + msg);
    },
    warn: (msg) => {
      log.warn('CentralizedWSGroup', tag + ' ' + msg);
    },
    error: (msg) => {
      log.error('CentralizedWSGroup', tag + ' ' + msg);
    }
  };
}

const CentralizedWSGroup = AbstractGroup.extend({
  toString: 'CentralizedWSGroup',
  tdef_version: 2,

  dic_isMaster: {
    optional: false,
    defaultValue: false,
    fragmentDependant: true
  },
  dic_masterNet: {
    optional: false,
    defaultValue: 'lo.ipv4',
    fragmentDependant: true
  },
  dic_port: {
    optional: false,
    defaultValue: 9000
  },
  dic_onDisconnect: {
    defaultValue: ''
  },
  dic_reduceModel: {
    optional: false,
    defaultValue: true
  },

  start(done) {
    const isMaster = this.dictionary.getBoolean('isMaster', this.dic_isMaster.defaultValue);
    const masterNet = this.dictionary.getString('masterNet', this.dic_masterNet.defaultValue);
    const port = this.dictionary.getNumber('port', this.dic_port.defaultValue);

    const rMasterNet = masterNet.match(/^([a-z0-9A-Z]+)\.([a-z0-9A-Z]+)$/);
    if (rMasterNet && rMasterNet.length > 0) {
      if (isMaster) {
        this.fragment = server.create(logger(this.log, '[' + this.name + '][master]'), port, this);
        done();
      } else {
        try {
          this.fragment = client.create(logger(this.log, '[' + this.name + '][client]'), port, this, rMasterNet[1], rMasterNet[2]);
          done();
        } catch (err) {
          done(err);
        }
      }

      const self = this;
      this.dictionary.on('port', () => {
        if (isMaster) {
          this.fragment.broadcast(logger(this.log, '[' + this.name + '][master]'), this);
        }
        this.stop(() => {
          self.start(() => {});
        });
      });

    } else {
      done(new Error('"masterNet" param must comply with ' + /^[a-z0-9A-Z]+\.[a-z0-9A-Z]+$/));
    }
  },

  stop(done) {
    if (this.fragment) {
      this.fragment.close(this);
    }
    done();
  }
});

module.exports = CentralizedWSGroup;
