import { assert } from 'chai';
import { auth } from '../../main';
import setUp from '../util/set-up';
const conf = require('tiny-conf');

describe('Errors', function() {
  this.slow(200);

  before('set up', setUp);

  before('', () => {
    conf.set('registry.host', 'unknown-host.fail');
  });

  it('auth should fail when host is unreachable', () => {
    return auth.login('username', 'password')
      .catch((err) => {
        assert.ok(err);
      });
  });
});
