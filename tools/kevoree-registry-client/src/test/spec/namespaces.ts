import { assert } from 'chai';
import { namespace } from '../../main';
import setUp from '../util/set-up';
import { logUserIn } from '../util/security';
const ServerMock = require('mock-http-server');

describe('Namespaces', function() {
  this.slow(200);

  const server = new ServerMock({ host: 'localhost', port: 8080 });

  before('set up', setUp);
  before('start mock server', (done) => server.start(done));
  after('stop mock server', (done) => server.stop(done));

  it('retrieve all namespaces', () => {
    const expectedNs = [
      { name: 'kevoree' }, { name: 'leiko' },
    ];

    server.on({
      method: 'GET',
      path: '/api/namespaces',
      reply: {
        status: 200,
        body: JSON.stringify(expectedNs),
      },
    });

    return namespace.all()
      .then((namespaces) => {
        assert.deepEqual(namespaces, expectedNs);
      });
  });

  it('retrieve a namespace by name', () => {
    const expectedNs = { name: 'kevoree', owner: 'kevoree' };

    server.on({
      method: 'GET',
      path: '/api/namespaces/kevoree',
      reply: {
        status: 200,
        body: JSON.stringify(expectedNs),
      },
    });

    return namespace.get('kevoree')
      .then((ns) => {
        assert.equal(ns.name, 'kevoree');
        assert.equal(ns.owner, 'kevoree');
      });
  });

  it('create a new namespace', () => {
    const expectedNs = { name: 'newnamespace', owner: 'kevoree' };

    server.on({
      method: 'POST',
      path: '/api/namespaces',
      reply: {
        status: 201,
        body: JSON.stringify(expectedNs),
      },
    });

    logUserIn();

    return namespace.create('newnamespace')
      .then((ns) => {
        assert.equal(ns.name, 'newnamespace');
        assert.equal(ns.owner, 'kevoree');
      });
  });

  it('delete a namespace', () => {
    const expectedNs = { name: 'newnamespace', owner: 'kevoree' };

    server.on({
      method: 'DELETE',
      path: '/api/namespaces/newnamespace',
      reply: {
        status: 200,
        body: JSON.stringify(expectedNs),
      },
    });

    logUserIn();

    return namespace.delete('newnamespace');
  });

  it('add a member', () => {
    const expectedNs = {
      name: 'kevoree',
      owner: 'kevoree',
      members: ['kevoree', 'user'],
    };

    server.on({
      method: 'POST',
      path: '/api/namespaces/kevoree/members',
      reply: {
        status: 200,
        body: JSON.stringify(expectedNs),
      },
    });

    logUserIn();

    return namespace.addMember('kevoree', 'user')
      .then((ns) => {
        assert.equal(ns.name, expectedNs.name);
        assert.deepEqual(ns.members, expectedNs.members);
      });
  });

  it('delete a namespace member', () => {
    const expectedNs = {
      name: 'kevoree',
      owner: 'kevoree',
      members: ['kevoree'],
    };

    server.on({
      method: 'DELETE',
      path: '/api/namespaces/kevoree/members/user',
      reply: {
        status: 200,
        body: JSON.stringify(expectedNs),
      },
    });

    logUserIn();

    return namespace.removeMember('kevoree', 'user');
  });

  it('delete a namespace not owned should fail', () => {
    server.on({
      method: 'DELETE',
      path: '/api/namespaces/newnamespace',
      reply: {
        status: 403,
        body: '{}',
      },
    });

    logUserIn();

    return namespace.delete('newnamespace')
      .catch((err) => {
        assert.ok(err);
        assert.equal(err.statusCode, 403);
      });
  });
});
