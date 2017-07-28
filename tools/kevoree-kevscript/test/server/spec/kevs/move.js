const assert = require('assert');
const readKevs = require('../../lib/readKevs');

describe('KevScript - move', function () {
  require('../../init')(this);

  it('simple.kevs', () => {
    const script = readKevs('move/simple.kevs');
    return this.kevs.parse(script)
      .then(({ model }) => {
        assert.ok(model.findNodesByID('node0'));
        assert.ok(model.findNodesByID('node1'));
        assert.equal(model.select('/nodes[node0]/components[ticker]').array.length, 0);
        assert.equal(model.select('/nodes[node1]/components[ticker]').array.length, 1);
      });
  });

  it('exchange.kevs', () => {
    const script = readKevs('move/exchange.kevs');
    return this.kevs.parse(script)
      .then(({ model }) => {
        assert.ok(model.findNodesByID('node0'));
        assert.ok(model.findNodesByID('node1'));
        assert.ok(model.findNodesByID('node0').findComponentsByID('tickerFrom1'));
        assert.ok(model.findNodesByID('node1').findComponentsByID('tickerFrom0'));
      });
  });

  it('simple-fail.kevs', () => {
    const script = readKevs('move/simple-fail.kevs');
    return this.kevs.parse(script)
      .then(() => {
        throw new Error('simple-fail.kevs is supposed to fail...');
      })
      .catch((err) => {
        assert.equal(err.message, 'Unable to find any node instance named "sync". Move failed');
      });
  });

  it('fail-already-exists.kevs', () => {
    const script = readKevs('move/fail-already-exists.kevs');
    return this.kevs.parse(script)
      .then(() => {
        throw new Error('fail-already-exists.kevs is supposed to fail');
      })
      .catch((err) => {
        assert.equal(err.message, 'There is already a component named "ticker" in "node1". Move failed');
        assert.deepEqual(err.pos, [94, 100]);
      });
  });
});
