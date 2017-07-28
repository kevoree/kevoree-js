const util = require('util');
const readline = require('readline');
const KevoreeCore = require('kevoree-core');
const Bootstrapper = require('kevoree-commons').Bootstrapper;
const kevoree = require('kevoree-library');
const bootstrapHelper = require('./bootstrapHelper');
const path = require('path');
const os = require('os');
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
	this.modulesPath = modulesPath;
	this.log = logger;
	this.kevs = kevs;
	this.kCore = new KevoreeCore(kevs, this.modulesPath, this.log);
	this.bootstrapper = new Bootstrapper(this.log, resolver);
	this.nodename = 'node0'; // default nodename
	this.groupname = 'sync'; // default groupname
	this.groupport = 9000; // default grouport
	this.loglevel = 'info'; // default loglevel
	this.model = null;

	this.kCore.setBootstrapper(this.bootstrapper);
	const self = this;

	this.kCore.on('deploying', function () {
		deploying = true;
	});

	// kevoree core deployed event listener
	this.kCore.on('deployed', function (model) {
		deploying = false;
		firstSIGINT = true;
		if (wannaStop) {
			wannaStop = false;
			self.kCore.stop();
		}
		self.emit('deployed', model);
	});

	// kevoree core error event listener
	this.kCore.on('error', function () {
		deploying = false;
	});

	this.kCore.on('rollbackSucceed', function () {
		deploying = false;
		firstSIGINT = true;
		if (wannaStop) {
			wannaStop = false;
			self.kCore.stop();
		}
		self.emit('rollbackSucceed');
	});

	this.kCore.on('stopped', function () {
		coreStarted = false;
		self.emit('stopped');
	});
}

util.inherits(NodeJSRuntime, EventEmitter);

NodeJSRuntime.prototype.start = function (nodename, groupname, groupport, loglevel) {
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
};

NodeJSRuntime.prototype.stop = function () {
	this.kCore.stop();
};

NodeJSRuntime.prototype.deploy = function (model) {
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

	bootstrapHelper(this.kevs, options, function (err, bootstrapModel) {
		if (err) {
			this.log.error(err.message);
			process.exit(1);
		} else {
			// bootstrap node network
			const node = bootstrapModel.findNodesByID(options.nodeName);
			const factory = new kevoree.factory.DefaultKevoreeFactory();
			const ifaces = os.networkInterfaces();
			Object.keys(ifaces).forEach(function (ifname) {
				const net = factory.createNetworkInfo();
				net.name = ifname;
				ifaces[ifname].forEach(function (iface) {
					const val = factory.createValue();
					val.name = iface.family.toLowerCase();
					val.value = iface.address;
					net.addValues(val);
					this.log.debug('Set default node network: ' + node.name + '.' + net.name + '.' + val.name + ' ' + val.value);
				}.bind(this));
				node.addNetworkInformation(net);
			}.bind(this));

			// deploy model
			this.kCore.deploy(bootstrapModel, function (err) {
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
			}.bind(this));
		}
	}.bind(this));
};

NodeJSRuntime.prototype.off = function (event, listener) {
	this.removeListener(event, listener);
};

NodeJSRuntime.prototype.toString = function () {
	return 'NodeJSRuntime';
};

module.exports = NodeJSRuntime;
