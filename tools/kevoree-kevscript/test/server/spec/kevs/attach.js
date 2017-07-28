const assert = require('assert');
const readKevs = require('../../lib/readKevs');

describe('KevScript - attach', function () {
  require('../../init')(this);

  it('simple.kevs', () => {
    const script = readKevs('attach/simple.kevs');
    return this.kevs.parse(script)
      .then(({ model }) => {
        const node = model.findNodesByID('node');
        const sync = model.findGroupsByID('sync');
        assert.equal(node.groups.array[0].name, sync.name);
        assert.equal(sync.subNodes.array[0].name, node.name);
      });
  });

  it('multiple.kevs', () => {
    const script = readKevs('attach/multiple.kevs');
    return this.kevs.parse(script)
      .then(({ model }) => {
        const node0 = model.findNodesByID('node0');
        const node1 = model.findNodesByID('node1');
        const node2 = model.findNodesByID('node2');
        const sync = model.findGroupsByID('sync');
        assert.equal(node0.groups.array[0].name, sync.name);
        assert.equal(node1.groups.array.length, 0);
        assert.equal(node2.groups.array[0].name, sync.name);
        assert.equal(
          sync.subNodes.array.map(n => n.name).sort().join(','), [node0.name, node2.name].sort().join(',')
        );
      });
  });

  it('wildcard.kevs', () => {
    const script = readKevs('attach/wildcard.kevs');
    return this.kevs.parse(script)
      .then(({ model }) => {
        const node0 = model.findNodesByID('node0');
        const node1 = model.findNodesByID('node1');
        const node2 = model.findNodesByID('node2');
        const sync = model.findGroupsByID('sync');
        assert.equal(node0.groups.array[0].name, sync.name);
        assert.equal(node1.groups.array[0].name, sync.name);
        assert.equal(node2.groups.array[0].name, sync.name);
        assert.equal(
          sync.subNodes.array.map(n => n.name).sort().join(','), [node0.name, node1.name, node2.name].sort().join(',')
        );
      });
  });
});
