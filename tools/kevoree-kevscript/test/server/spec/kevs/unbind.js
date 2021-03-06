const assert = require('assert');
const readKevs = require('../../lib/readKevs');
const readModel = require('../../lib/readModel');

describe('KevScript - unbind', function mochaDescribe() {
  require('../../init')(this);

  it('simple.kevs', () => {
    const script = readKevs('unbind/simple.kevs');
    const model = readModel('unbind/simple.json');
    return this.kevs.parse(script, model)
      .then(({ model }) => {
        const node0 = model.findNodesByID('node0');
        const ticker = node0.findComponentsByID('ticker');
        const chan = model.findHubsByID('chan');
        assert.equal(ticker.findRequiredByID('tick').bindings.array.length, 0);
        assert.equal(chan.bindings.array.length, 0);
        assert.equal(model.mBindings.array.length, 0);
      });
  });
});
