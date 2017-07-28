const assert = require('assert');
const readKevs = require('../../lib/readKevs');

describe('KevScript - repo (deprecated)', function () {
  require('../../init')(this);

  it('simple.kevs', () => {
    const script = readKevs('repo/simple.kevs');
    return this.kevs.parse(script)
      .then(({ model, warnings }) => {
        assert.ok(model);
        assert.equal(warnings[0].message, '"repo" statement is deprecated');
      });
  });
});
