function sets(model) {
  let str = '';

  function processDictionary(instanceName, values, fragName, dicType) {
    values.array.forEach((val) => {
      const attr = dicType.findAttributesByID(val.name);
      if (attr.defaultValue !== val.value) {
        if (str.length !== 0) {
          str += '\n';
        }

        if (fragName) {
          str += 'set ' + instanceName + '.' + val.name + '/' + fragName + ' = ' + lexValue(val.value);
        } else {
          str += 'set ' + instanceName + '.' + val.name + ' = ' + lexValue(val.value);
        }
      }
    });
  }

  function processInstance(instance, host) {
    const instanceName = (host) ? (host + '.' + instance.name) : (instance.name);

    if (instance.dictionary) {
      processDictionary(instanceName, instance.dictionary.values.iterator(), null, instance.typeDefinition.dictionaryType);
    }

    const fDics = instance.fragmentDictionary.iterator();
    while (fDics.hasNext()) {
      const dic = fDics.next();
      if (dic) {
        processDictionary(instanceName, dic.values.iterator(), dic.name, instance.typeDefinition.dictionaryType);
      }
    }
  }

  const nodes = model.nodes.iterator();
  while (nodes.hasNext()) {
    const node = nodes.next();
    if (!node.host) {
      // only process nodes that are not hosted (hosted nodes will be processed as subNodes later)
      processInstance(node);
    }

    const subNodes = node.hosts.iterator();
    while (subNodes.hasNext()) {
      processInstance(subNodes.next(), node.name);
    }

    const comps = node.components.iterator();
    while (comps.hasNext()) {
      processInstance(comps.next(), node.name);
    }
  }

  const groups = model.groups.iterator();
  while (groups.hasNext()) {
    processInstance(groups.next());
  }

  const hubs = model.hubs.iterator();
  while (hubs.hasNext()) {
    processInstance(hubs.next());
  }

  return str;
}

function lexValue(value) {
  if (value) {
    let escaped = false;
    for (let i = 0; i < value.length; i++) {
      if (value[i] === '"' && !escaped) {
        return '\'' + value + '\'';
      }

      if (value[i] === '\'' && !escaped) {
        return '"' + value + '"';
      }

      escaped = (value[i] === '\\');
    }
    return '\'' + value + '\'';
  } else {
    return '\'\'';
  }
}

module.exports = sets;
