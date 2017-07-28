import { assert } from 'chai';
import { baseUrl, isTokenExpired, clientAuthorization, token } from '../../main/util/config';
import setUp from '../util/set-up';
const conf = require('tiny-conf');

describe('Config', function() {
  this.slow(200);

  before('set up', setUp);

  afterEach('reset conf', () => {
    conf.set({
      registry: {
        host: 'localhost',
        port: 8080,
        ssl: false,
        oauth: {
          client_id: 'kevoree_registryapp',
          client_secret: 'kevoree_registryapp_secret',
        },
      },
      user: {
        login: 'kevoree',
        password: 'kevoree',
      },
    });
  });

  it('baseUrl() should return the valid base URL', () => {
    assert.equal(baseUrl(), 'http://localhost:8080');
  });

  it('isTokenExpired() should return true when expired', () => {
    assert.isTrue(isTokenExpired());
  });

  it('isTokenExpired() should return false if valid', () => {
    conf.set('user.access_token', 'foo');
    conf.set('user.expires_at', Date.now() + 1000);
    assert.isFalse(isTokenExpired());
  });

  it('clientAuthorization() should return the b64 of oauth client id:secret', () => {
    assert.equal(clientAuthorization(), 'a2V2b3JlZV9yZWdpc3RyeWFwcDprZXZvcmVlX3JlZ2lzdHJ5YXBwX3NlY3JldA==');
  });

  it('token() should throw when no token', () => {
    assert.throw(token);
  });

  it('isTokenExpired() should return true when valid', () => {
    conf.set('user.access_token', 'foo');
    conf.set('user.expires_at', Date.now() + 1000);
    assert.isFalse(isTokenExpired());
  });

  it('token() should return current user token', () => {
    conf.set('user.access_token', 'foo');
    conf.set('user.expires_at', Date.now() + 1000);
    assert.equal(token(), 'foo');
  });
});
