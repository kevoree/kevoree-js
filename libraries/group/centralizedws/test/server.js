const assert = require('assert');
const kevoree = require('kevoree-library');
const WebSocket = require('ws');

const serverFactory = require('../lib/server');
const InstanceMock = require('./util/InstanceMock');
const Protocol = require('../lib/protocol/Protocol');
const RegisterMessage = require('../lib/protocol/RegisterMessage');
const RegisteredMessage = require('../lib/protocol/RegisteredMessage');

const PORT = 9000;

// setup
function noop() { /*noop*/ }
const logger = {
  info: noop,
  debug: noop,
  warn: console.warn, // eslint-disable-line
  error: console.error // eslint-disable-line
};

describe('server.create(logger, port, kCore)', function mochaDescribe() {
  this.timeout(500);
  this.slow(100);

  let server;
  let iMock;

  before('create instance mock', () => {
    iMock = new InstanceMock('node0', 'sync');
  });

  beforeEach('create server on port ' + PORT, () => {
    server = serverFactory.create(logger, PORT, iMock);
  });

  afterEach('close server', () => {
    iMock.currentModel = null;
    server.close(iMock);
  });

  it('server is reachable', (done) => {
    const client = new WebSocket('ws://localhost:' + PORT);
    client.on('open', () => {
      client.close();
      done();
    });
  });

  it('registered client is stored and receives "registered" ack', (done) => {
    this.slow(350);

    const simpleClientModelStr = JSON.stringify(require('./fixtures/model/simple-client.json'));
    const factory = new kevoree.factory.DefaultKevoreeFactory();
    const loader = factory.createJSONLoader();
    const model = loader.loadModelFromString(simpleClientModelStr).get(0);
    iMock.currentModel = model;

    const client = new WebSocket('ws://localhost:' + PORT);
    client.on('open', () => {
      const rMsg = new RegisterMessage('node1', simpleClientModelStr);
      client.send(rMsg.toRaw());
    });

    client.on('message', (msg) => {
      const pMsg = Protocol.parse(msg);
      if (pMsg.getType() === RegisteredMessage.TYPE) {
        assert.equal(Object.keys(serverFactory.client2name).length, 1);
        assert.equal(serverFactory.client2name[Object.keys(serverFactory.client2name)[0]], 'node1');
        client.close();
        done();
      }
    });
  });

  it('client closed is removed from registered store', (done) => {
    this.slow(500);

    const simpleClientModelStr = JSON.stringify(require('./fixtures/model/simple-client.json'));
    const factory = new kevoree.factory.DefaultKevoreeFactory();
    const loader = factory.createJSONLoader();
    const model = loader.loadModelFromString(simpleClientModelStr).get(0);
    iMock.currentModel = model;

    const client = new WebSocket('ws://localhost:' + PORT);
    client.on('open', () => {
      const rMsg = new RegisterMessage('node1', simpleClientModelStr);
      client.send(rMsg.toRaw());

      // give the server the time to process the request
      setTimeout(() => {
        client.close();
        setTimeout(() => {
          assert.equal(Object.keys(serverFactory.client2name).length, 0);
          done();
        }, 100);
      }, 100);
    });
  });

  it('unpingable client should be unregistered', () => {
    // TODO this is not easily testable ? (maybe by unblackboxing the register/pull/push commands)
  });
});
