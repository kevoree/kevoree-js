const util = require('util');
const readline = require('readline');
const KevoreeCore = require('kevoree-core');
const kevoree = require('kevoree-library');
const bootstrapHelper = require('./bootstrapHelper');
const path = require('path');
const os = require('os');
const loggerFactory = require('kevoree-logger');
const fs = require('fs');
const EventEmitter = require('events').EventEmitter;

let firstSIGINT = true;
let coreStarted = false;
let deploying = false;
let wannaStop = false;

function NodeJSRuntime(modulesPath, logger, resolver, kevs) {
  if (!kevs) {
    throw new Error('You must give a KevScript engine to the runtime');
  }
  if (!modulesPath) {
    throw new Error('You must give a modulesPath to the runtime');
  }
  if (!logger) {
    throw new Error('You must give a logger to the runtime');
  }
  this.log = logger;
  this.kevs = kevs;
  this.kCore = new KevoreeCore(resolver, kevs, loggerFactory);
  this.nodename = 'node0'; // default nodename
  this.groupname = 'sync'; // default groupname
  this.groupport = 9000; // default grouport
  this.loglevel = 'info'; // default loglevel
  this.model = null;

  this.kCore.on('deploying', () => {
    deploying = true;
  });

  // kevoree core deployed event listener
  this.kCore.on('deployed', (model) => {
    deploying = false;
    firstSIGINT = true;
    if (wannaStop) {
      wannaStop = false;
      this.kCore.stop();
    }
    this.emit('deployed', model);
  });

  // kevoree core error event listener
  this.kCore.on('error', () => {
    deploying = false;
  });

  this.kCore.on('rollbackSucceed', () => {
    deploying = false;
    firstSIGINT = true;
    if (wannaStop) {
      wannaStop = false;
      this.kCore.stop();
    }
    this.emit('rollbackSucceed');
  });

  this.kCore.on('stopped', () => {
    coreStarted = false;
    this.emit('stopped');
  });
}

NodeJSRuntime.prototype = {
  start(nodename, groupname, groupport, loglevel) {
    // TODO add some verification over given names (no spaces & stuff like that)
    this.nodename = nodename || this.nodename;
    this.groupname = groupname || this.groupname;
    this.groupport = groupport || this.groupport;
    this.loglevel = loglevel || this.loglevel;

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const exitProcess = (sig) => () => {
      process.stdout.write('\x1b[0G'); // http://stackoverflow.com/a/9628935/906441
      if (!coreStarted) {
        this.log.warn(`Got ${sig}.  Shutting down Kevoree`);
        process.exit(0);
      } else {
        if (!firstSIGINT) {
          if (!deploying) {
            this.log.warn('Force quit.');
          } else {
            this.log.warn('Force quit while deploying. ' + path.resolve(this.modulesPath, 'node_modules') + ' might be corrupted.');
          }
          process.exit(0);
        } else {
          firstSIGINT = false;
          if (!deploying) {
            this.log.warn(`Got ${sig}.  Shutting down Kevoree gracefully... (^C again to force quit)`);
            try {
              this.kCore.stop();
            } catch (err) {
              this.log.error(err.stack);
              process.exit(0);
            }
          } else {
            this.log.warn(`Got ${sig}.  Will shutdown Kevoree gracefully once deploy process finished. (^C again to force quit)`);
            wannaStop = true;
          }
        }
      }
    };

    rl.on('SIGINT', exitProcess('SIGINT'));
    process.on('SIGTERM', exitProcess('SIGTERM'));

    this.kCore.start(this.nodename);
    coreStarted = true;
    this.emit('started');
  },

  stop() {
    this.kCore.stop();
  },

  deploy(model) {
    deploying = true;
    // deploy default bootstrap model
    const options = {
      model: model,
      bootstrapper: this.bootstrapper,
      nodeName: this.nodename,
      groupName: this.groupname,
      groupPort: this.groupport,
      logLevel: this.loglevel,
      modulesPath: this.modulesPath,
      logger: this.log
    };

    bootstrapHelper(this.kevs, options, (err, bootstrapModel) => {
      if (err) {
        this.log.error(err.message);
        process.exit(1);
      } else {
        // bootstrap node network
        const node = bootstrapModel.findNodesByID(options.nodeName);
        const factory = new kevoree.factory.DefaultKevoreeFactory();
        const ifaces = os.networkInterfaces();
        Object.keys(ifaces).forEach((ifname) => {
          const net = factory.createNetworkInfo();
          net.name = ifname;
          ifaces[ifname].forEach((iface) => {
            const val = factory.createValue();
            val.name = iface.family.toLowerCase();
            val.value = iface.address;
            net.addValues(val);
            this.log.debug('Set default node network: ' + node.name + '.' + net.name + '.' + val.name + ' ' + val.value);
          });
          node.addNetworkInformation(net);
        });

        // deploy model
        this.kCore.deploy(bootstrapModel, (err) => {
          if (err) {
            try {
              const timestamp = Date.now();
              const currModelPath = path.join(os.tmpdir(), 'model-' + this.nodename + '-' + timestamp + '.curr.json');
              const deplModelPath = path.join(os.tmpdir(), 'model-' + this.nodename + '-' + timestamp + '.depl.json');
              const factory = new kevoree.factory.DefaultKevoreeFactory();
              const serializer = factory.createJSONSerializer();
              const currModelStr = JSON.stringify(JSON.parse(serializer.serialize(this.kCore.currentModel)), null, 2);
              const deplModelStr = JSON.stringify(JSON.parse(serializer.serialize(bootstrapModel)), null, 2);
              fs.writeFileSync(currModelPath, currModelStr, 'utf8');
              fs.writeFileSync(deplModelPath, deplModelStr, 'utf8');
              this.kCore.log.info('Current & deploy models dumped in ' + os.tmpdir());
            } catch (err) {
              console.log(err);
            }
          }
        });
      }
    });
  },

  off(event, listener) {
    this.removeListener(event, listener);
  },

  toString() {
    return 'NodeJSRuntime';
  }
};

util.inherits(NodeJSRuntime, EventEmitter);

module.exports = NodeJSRuntime;
