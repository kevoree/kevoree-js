const TinyConf = require('tiny-conf');
const rimraf = require('rimraf');

const initKevscript = require('./lib/initKevscript');
const initRegistry = require('./lib/initRegistry');

module.exports = (test) => {
	test.timeout(1000);
	test.slow(300);

	before('create a Kevoree Registry mock', () => {
		return initRegistry().then(server => {
			this.server = server;
		});
	});

	before('create KevScript engine', () => {
		test.kevs = initKevscript();
	});

	after('stop Kevoree Registry mock', () => {
		if (this.server) {
			this.server.close();
		}
	});

	after('clean Kevoree test cache', (done) => {
		if (!process.env.NO_RM) {
			rimraf(TinyConf.get('cache.root'), done);
		} else {
			done();
		}
	});

	if (process.env.DEBUG) {
		beforeEach(function () {
			console.log('--------------------------'); // eslint-disable-line
		});
	}
};
