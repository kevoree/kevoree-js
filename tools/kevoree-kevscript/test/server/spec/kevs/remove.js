const assert = require('assert');
const readKevs = require('../../lib/readKevs');

describe('KevScript - remove', function () {
  require('../../init')(this);

  it('simple.kevs', () => {
    const script = readKevs('remove/simple.kevs');
    return this.kevs.parse(script)
      .then(({ model }) => {
        assert.equal(model.findNodesByID('node'), null);
      });
  });

  it('multiple.kevs', () => {
    const script = readKevs('remove/multiple.kevs');
    return this.kevs.parse(script)
      .then(({ model }) => {
        assert.equal(model.findNodesByID('node0'), null);
        assert.ok(model.findNodesByID('node1'));
        assert.equal(model.findNodesByID('node2'), null);
      });
  });

  it('wildcard0.kevs', () => {
    const script = readKevs('remove/wildcard0.kevs');
    return this.kevs.parse(script)
      .then(({ model }) => {
        assert.ok(model.findNodesByID('node0'));
        assert.ok(model.findNodesByID('node1'));
        assert.ok(model.findNodesByID('node2'));
        assert.ok(model.findNodesByID('node0').findComponentsByID('ticker'));
        assert.equal(model.findNodesByID('node1').findComponentsByID('ticker'), null);
        assert.ok(model.findNodesByID('node2').findComponentsByID('ticker'));
      });
  });

  it('wildcard1.kevs', () => {
    const script = readKevs('remove/wildcard1.kevs');
    return this.kevs.parse(script)
      .then(({ model }) => {
        assert.ok(model.findNodesByID('node0'));
        assert.ok(model.findNodesByID('node1'));
        assert.ok(model.findNodesByID('node2'));
        assert.equal(model.select('/nodes[]/components[]').array.length, 0);
      });
  });

  it('re-add.kevs', () => {
    const script = readKevs('remove/re-add.kevs');
    return this.kevs.parse(script)
      .then(({ model }) => {
        assert.ok(model.findNodesByID('node0'));
        assert.ok(model.findNodesByID('node0').findComponentsByID('ticker'));
      });
  });
});
