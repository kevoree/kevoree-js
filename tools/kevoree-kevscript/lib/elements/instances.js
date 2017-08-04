const modelHelper = require('../util/model-helper');

function instances(model) {
  let str = '';

  function process(elems) {
    const map = {};
    while (elems.hasNext()) {
      const elem = elems.next();
      const fqn = modelHelper.getFQN(elem.typeDefinition);
      const list = map[fqn] || [];
      list.push(elem.name);
      map[fqn] = list;
    }

    for (const tdef in map) {
      if (map.hasOwnProperty(tdef)) {
        if (str.length !== 0) {
          str += '\n';
        }
        str += 'add ' + map[tdef].join(', ') + ': ' + tdef;
      }
    }
  }

  function processRootNodes(elems) {
    const map = {};
    while (elems.hasNext()) {
      const elem = elems.next();
      const fqn = modelHelper.getFQN(elem.typeDefinition);
      const list = map[fqn] || [];

      if (!elem.host) {
        list.push(elem.name);
      }

      map[fqn] = list;
    }

    for (const tdef in map) {
      if (map.hasOwnProperty(tdef)) {
        if (map[tdef].length > 0) {
          if (str.length !== 0) {
            str += '\n';
          }
          str += 'add ' + map[tdef].join(', ') + ': ' + tdef;
        }
      }
    }
  }

  function processHostedNodesAndComps(elems) {
    const compsMap = {};
    const subnodesMap = {};
    let list;
    while (elems.hasNext()) {
      const elem = elems.next();
      let fqn;

      if (elem.host) {
        // elem is a subNode
        fqn = modelHelper.getFQN(elem.typeDefinition);
        list = subnodesMap[fqn] || [];
        list.push(elem.host.name + '.' + elem.name);
        subnodesMap[fqn] = list;
      }

      const comps = elem.components.iterator();
      while (comps.hasNext()) {
        const comp = comps.next();
        fqn = modelHelper.getFQN(comp.typeDefinition);
        list = compsMap[fqn] || [];
        list.push(elem.name + '.' + comp.name);
        compsMap[fqn] = list;
      }
    }

    let tdef;
    for (tdef in compsMap) {
      if (compsMap.hasOwnProperty(tdef)) {
        if (compsMap[tdef].length > 0) {
          if (str.length !== 0) {
            str += '\n';
          }
          str += 'add ' + compsMap[tdef].join(', ') + ': ' + tdef;
        }
      }
    }

    for (tdef in subnodesMap) {
      if (subnodesMap.hasOwnProperty(tdef)) {
        if (subnodesMap[tdef].length > 0) {
          if (str.length !== 0) {
            str += '\n';
          }
          str += 'add ' + subnodesMap[tdef].join(', ') + ': ' + tdef;
        }
      }
    }
  }

  processRootNodes(model.nodes.iterator());
  processHostedNodesAndComps(model.nodes.iterator());
  process(model.groups.iterator());
  process(model.hubs.iterator());

  return str.replace(/kevoree\./g, '');
}

module.exports = instances;
