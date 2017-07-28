import { assert } from 'chai';
import { tdef } from '../../main';
import setUp from '../util/set-up';
import { logUserIn } from '../util/security';
const ServerMock = require('mock-http-server');

describe('TypeDefinitions', function() {
  this.slow(200);

  const server = new ServerMock({ host: 'localhost', port: 8080 });

  before('set up', setUp);
  before('start mock server', (done) => server.start(done));
  after('stop mock server', (done) => server.stop(done));

  it('retrieve all tdefs', () => {
    const expectedTdefs = [
      { id: 1, namespace: 'kevoree', name: 'Ticker', version: 1, model: '' },
      { id: 2, namespace: 'kevoree', name: 'Printer', version: 1, model: '' },
      { id: 3, namespace: 'kevoree', name: 'Ticker', version: 2, model: '' },
    ];

    server.on({
      method: 'GET',
      path: '/api/tdefs',
      reply: {
        status: 200,
        body: JSON.stringify(expectedTdefs),
      },
    });

    return tdef.all()
      .then((tdefs) => {
        assert.deepEqual(tdefs, expectedTdefs);
      });
  });

  it('retrieve all tdefs by namespace and name', () => {
    const expectedTdefs = [
      { id: 1, namespace: 'kevoree', name: 'Ticker', version: 1, model: '' },
      { id: 3, namespace: 'kevoree', name: 'Ticker', version: 2, model: '' },
    ];

    server.on({
      method: 'GET',
      path: '/api/namespaces/kevoree/tdefs/Ticker',
      reply: {
        status: 200,
        body: JSON.stringify(expectedTdefs),
      },
    });

    return tdef.getAllByNamespaceAndName('kevoree', 'Ticker')
      .then((tdefs) => {
        assert.deepEqual(tdefs, expectedTdefs);
      });
  });

  it('retrieve latest tdef by namespace and name', () => {
    const expectedTdef = { id: 3, namespace: 'kevoree', name: 'Ticker', version: 2, model: '' };

    server.on({
      method: 'GET',
      path: '/api/namespaces/kevoree/tdefs/Ticker/latest',
      reply: {
        status: 200,
        body: JSON.stringify(expectedTdef),
      },
    });

    return tdef.getLatestByNamespaceAndName('kevoree', 'Ticker')
      .then((typeDef) => {
        assert.equal(typeDef.id, expectedTdef.id);
        assert.equal(typeDef.name, expectedTdef.name);
        assert.equal(typeDef.model, expectedTdef.model);
        assert.equal(typeDef.version, expectedTdef.version);
        assert.equal(typeDef.namespace, expectedTdef.namespace);
      });
  });

  it('retrieve latest tdefs by namespace', () => {
    const expectedTdefs = [
      { id: 2, namespace: 'kevoree', name: 'Printer', version: 1, model: '' },
      { id: 3, namespace: 'kevoree', name: 'Ticker', version: 2, model: '' },
    ];

    server.on({
      method: 'GET',
      path: '/api/namespaces/kevoree/tdefs',
      reply: {
        status: 200,
        body: JSON.stringify(expectedTdefs),
      },
    });

    return tdef.getLatestsByNamespace('kevoree')
      .then((tdefs) => {
        assert.deepEqual(tdefs, expectedTdefs);
      });
  });

  it('retrieve a tdef by namespace, name and version', () => {
    const expectedTdef = { id: 3, namespace: 'kevoree', name: 'Ticker', version: 2, model: '' };

    server.on({
      method: 'GET',
      path: '/api/namespaces/kevoree/tdefs/Ticker/3',
      reply: {
        status: 200,
        body: JSON.stringify(expectedTdef),
      },
    });

    return tdef.getByNamespaceAndNameAndVersion('kevoree', 'Ticker', 3)
      .then((typeDef) => {
        assert.equal(typeDef.id, expectedTdef.id);
        assert.equal(typeDef.name, expectedTdef.name);
        assert.equal(typeDef.version, expectedTdef.version);
        assert.equal(typeDef.model, expectedTdef.model);
        assert.equal(typeDef.namespace, expectedTdef.namespace);
      });
  });

  it('create a new tdef', () => {
    const expectedTdef = {
      id: 4,
      namespace: 'kevoree',
      name: 'Foo',
      version: 1,
      model: JSON.stringify({
        class: 'org.kevoree.Component@Foo',
        name: 'Foo',
        version: 1,
        potato: 'foo',
      }),
    };

    server.on({
      method: 'POST',
      path: '/api/namespaces/kevoree/tdefs',
      reply: {
        status: 201,
        body: JSON.stringify(expectedTdef),
      },
    });

    logUserIn();

    return tdef.create('kevoree', expectedTdef)
      .then((typeDef) => {
        assert.equal(typeDef.id, expectedTdef.id);
        assert.equal(typeDef.name, expectedTdef.name);
        assert.equal(typeDef.version, expectedTdef.version);
        assert.equal(typeDef.model, expectedTdef.model);
        assert.equal(typeDef.namespace, expectedTdef.namespace);
      });
  });

  it('delete a tdef by namespace, name and version', () => {
    const expectedTdef = {
      id: 4,
      namespace: 'kevoree',
      name: 'Foo',
      version: 1,
      model: JSON.stringify({
        class: 'org.kevoree.Component@Foo',
        name: 'Foo',
        version: 1,
        potato: 'foo',
      }),
    };

    server.on({
      method: 'DELETE',
      path: '/api/namespaces/kevoree/tdefs/Foo/1',
      reply: {
        status: 200,
        body: JSON.stringify(expectedTdef),
      },
    });

    logUserIn();

    return tdef.deleteByNamespaceAndNameAndVersion('kevoree', 'Foo', 1);
  });
});
