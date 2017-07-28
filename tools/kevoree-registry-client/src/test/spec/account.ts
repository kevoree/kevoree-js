import { assert } from 'chai';
import { account } from '../../main';
import setUp from '../util/set-up';
import { logUserIn } from '../util/security';
const ServerMock = require('mock-http-server');

describe('Account', function() {
  this.slow(200);

  const server = new ServerMock({ host: 'localhost', port: 8080 });

  before('init conf', setUp);
  before('start mock server', (done) => server.start(done));
  after('stop mock server', (done) => server.stop(done));

  it('retrieve account', () => {
    server.on({
      method: 'GET',
      path: '/api/account',
      reply: {
        status: 200,
        body: JSON.stringify({
          id: 1234,
          login: 'kevoree',
          namespaces: ['kevoree'],
        }),
      },
    });

    logUserIn();

    return account.get()
      .then((user) => {
        assert.ok(user.id);
        assert.equal(user.login, 'kevoree');
        assert.deepEqual(user.namespaces, ['kevoree']);
      });
  });
});
