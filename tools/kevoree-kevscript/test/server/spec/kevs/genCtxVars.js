const assert = require('assert');
const readKevs = require('../../lib/readKevs');

describe('KevScript - genCtxVars', function mochaDescribe() {
  require('../../init')(this);

  it('simple.kevs', () => {
    const script = readKevs('genCtxVars/simple.kevs');
    const ctxVars = {};
    return this.kevs.parse(script, null, ctxVars)
      .then(({ model }) => {
        assert.ok(model.findNodesByID(ctxVars.node));
      });
  });

  it('set.kevs', () => {
    const script = readKevs('genCtxVars/set.kevs');
    const ctxVars = {};
    return this.kevs.parse(script, null, ctxVars)
      .then(({ model }) => {
        const node = model.findNodesByID(ctxVars.node);
        assert.ok(node);
        assert.equal(node.dictionary.findValuesByID('logLevel').value, 'DEBUG');
      });
  });

  it('set-val.kevs', () => {
    const script = readKevs('genCtxVars/set-val.kevs');
    const ctxVars = {};
    return this.kevs.parse(script, null, ctxVars)
      .then(({ model }) => {
        const node = model.findNodesByID('node');
        assert.ok(node);
        assert.equal(node.dictionary.findValuesByID('logLevel').value, ctxVars.logLevel);
      });
  });
});
