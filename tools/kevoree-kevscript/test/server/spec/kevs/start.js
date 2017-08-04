const assert = require('assert');
const readKevs = require('../../lib/readKevs');
const readModel = require('../../lib/readModel');

describe('KevScript - start', function mochaDescribe() {
  require('../../init')(this);

  it('simple.kevs', () => {
    const script = readKevs('start/simple.kevs');
    const model = readModel('start/simple.json');
    return this.kevs.parse(script, model)
      .then(({ model }) => {
        assert.ok(model.findNodesByID('node0'));
        assert.equal(model.findNodesByID('node0').started, true);
      });
  });

  it('multiple.kevs', () => {
    const script = readKevs('start/multiple.kevs');
    const model = readModel('start/multiple.json');
    return this.kevs.parse(script, model)
      .then(({ model }) => {
        assert.ok(model.findNodesByID('node0'));
        assert.ok(model.findNodesByID('node1'));
        assert.ok(model.findGroupsByID('sync'));
        assert.equal(model.findNodesByID('node0').started, true);
        assert.equal(model.findNodesByID('node1').started, true);
        assert.equal(model.findGroupsByID('sync').started, true);
      });
  });

  it('components.kevs', () => {
    const script = readKevs('start/components.kevs');
    const model = readModel('start/components.json');
    return this.kevs.parse(script, model)
      .then(({ model }) => {
        const node0 = model.findNodesByID('node0');
        const node1 = model.findNodesByID('node1');
        const sync = model.findGroupsByID('sync');
        assert.equal(node0.started, true);
        assert.equal(node1.started, true);
        assert.equal(sync.started, true);
        assert.equal(node0.findComponentsByID('ticker0').started, true);
        assert.equal(node0.findComponentsByID('ticker1').started, true);
        assert.equal(node1.findComponentsByID('ticker0').started, true);
        assert.equal(node1.findComponentsByID('ticker1').started, true);
      });
  });
});
