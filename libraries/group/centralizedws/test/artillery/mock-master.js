const kevoree = require('kevoree-library');
const serverFactory = require('../../lib/server');
const InstanceMock = require('../util/InstanceMock');

const PORT = 9000;

// setup
function noop() {/*noop*/}
const logger = {
	info: noop,
	debug: noop,
	warn: console.warn, // eslint-disable-line
	error: console.error // eslint-disable-line
};

const iMock = new InstanceMock('node0', 'sync');

const simpleClientModelStr = JSON.stringify(require('../fixtures/model/simple-client.json'));
const factory = new kevoree.factory.DefaultKevoreeFactory();
const loader = factory.createJSONLoader();
const model = loader.loadModelFromString(simpleClientModelStr).get(0);
iMock.currentModel = model;

serverFactory.create(logger, PORT, iMock);
