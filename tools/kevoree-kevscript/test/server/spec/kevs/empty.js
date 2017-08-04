const assert = require('assert');
const readKevs = require('../../lib/readKevs');

describe('KevScript - empty', function mochaDescribe() {
  require('../../init')(this);

  it('simple.kevs', () => {
    const script = readKevs('empty/simple.kevs');
    return this.kevs.parse(script)
      .then(({ model }) => {
        assert.ok(model);
      });
  });
});
