import { assert } from 'chai';
import { auth, IConfigUser } from '../../main';
import setUp from '../util/set-up';
const config = require('tiny-conf');
const ServerMock = require('mock-http-server');

describe('Auth', function() {
  this.slow(200);

  const server = new ServerMock({ host: 'localhost', port: 8080 });

  before('set up', setUp);

  before('start mock server', (done) => server.start(done));
  after('stop mock server', (done) => server.stop(done));

  it('auth.login("username", "password") should define access_token, refresh_token and expires_at', () => {
    const expectedAuth = {
      access_token: 'foo',
      refresh_token: 'bar',
      expires_in: 3600,
    };

    server.on({
      method: 'POST',
      path: '/oauth/token',
      reply: {
        status: 200,
        body: JSON.stringify(expectedAuth),
      },
    });

    return auth.login('kevoree', 'password')
      .then(() => {
        const user: IConfigUser = config.get('user');
        assert.equal(user.login, 'kevoree');
        assert.equal(user.access_token, expectedAuth.access_token);
        assert.equal(user.refresh_token, expectedAuth.refresh_token);
        assert.isAtLeast(user.expires_at!, Date.now());
      });
  });

  it('auth.ensureLogin() should try to refresh token if expired', () => {
    const expectedAuth = {
      access_token: 'new-foo',
      refresh_token: 'new-bar',
      expires_in: 3600,
    };

    server.on({
      method: 'POST',
      path: '/oauth/token',
      reply: {
        status: 200,
        body: JSON.stringify(expectedAuth),
      },
    });

    // define user data as expired
    config.set('user.expires_at', Date.now() - (1000 * 60 * 10)); // 10min old

    return auth.ensureLogin()
      .then(() => {
        const user: IConfigUser = config.get('user');
        assert.equal(user.login, 'kevoree');
        assert.equal(user.access_token, expectedAuth.access_token);
        assert.equal(user.refresh_token, expectedAuth.refresh_token);
        assert.isAtLeast(user.expires_at!, Date.now());
      });
  });
});
