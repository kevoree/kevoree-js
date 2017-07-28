const assert = require('assert');
const readKevs = require('../../lib/readKevs');

describe('KevScript - add', function () {
  require('../../init')(this);

  it('simple.kevs', () => {
    const script = readKevs('add/simple.kevs');
    return this.kevs.parse(script)
      .then(({ model }) => {
        assert.ok(model.findNodesByID('node'));
      });
  });

  it('multiple.kevs', () => {
    const script = readKevs('add/multiple.kevs');
    return this.kevs.parse(script)
      .then(({ model }) => {
        assert.ok(model.findNodesByID('node0'));
        assert.ok(model.findNodesByID('node1'));
        assert.ok(model.findNodesByID('node2'));
      });
  });

  it('already-added.kevs', () => {
    const script = readKevs('add/already-added.kevs');
    return this.kevs.parse(script)
      .then(() => {
        throw new Error('already-added.kevs was supposed to fail');
      })
      .catch((err) => {
        assert.equal(err.message, 'Instance name "node0" is already used. Add failed');
        assert.deepEqual(err.pos, [44, 49]);
      });
  });

  it('already-added-comp.kevs', () => {
    const script = readKevs('add/already-added-comp.kevs');
    return this.kevs.parse(script)
      .then(() => {
        throw new Error('already-added-comp.kevs was supposed to fail');
      })
      .catch((err) => {
        assert.equal(err.message, 'Instance name "ticker" is already used in "node0". Add failed');
        assert.deepEqual(err.pos, [83, 95]);
      });
  });

  it('unknown.kevs', () => {
    const script = readKevs('add/unknown.kevs');
    return this.kevs.parse(script)
      .then(() => {
        throw new Error('unknown.kevs was supposed to fail');

      })
      .catch((err) => {
        assert.equal(err.message, 'Unable to find kevoree.UnknownType/LATEST in http://localhost:3000');
        assert.deepEqual(err.pos, [10, 21]);
      });
  });

  it('fail-add-comp.kevs', () => {
    const script = readKevs('add/fail-add-comp.kevs');
    return this.kevs.parse(script)
      .then(() => {
        throw new Error('fail-add-comp.kevs was supposed to fail');
      })
      .catch((err) => {
        assert.equal(err.message, 'Unable to find any node instance named "node" to host "ticker". Add failed');
        assert.deepEqual(err.pos, [4, 8]);
      });
  });
});
