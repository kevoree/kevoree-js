var kevoree = require('kevoree-library');
var serverFactory = require('../../lib/server');
var InstanceMock = require('../util/InstanceMock');

var PORT = 9000;

// setup
function noop() {/*noop*/}
var logger = {
	info: noop,
	debug: noop,
	warn: console.warn, // eslint-disable-line
	error: console.error // eslint-disable-line
};

var iMock = new InstanceMock('node0', 'sync');

var simpleClientModelStr = JSON.stringify(require('../fixtures/model/simple-client.json'));
var factory = new kevoree.factory.DefaultKevoreeFactory();
var loader = factory.createJSONLoader();
var model = loader.loadModelFromString(simpleClientModelStr).get(0);
iMock.currentModel = model;

serverFactory.create(logger, PORT, iMock);
