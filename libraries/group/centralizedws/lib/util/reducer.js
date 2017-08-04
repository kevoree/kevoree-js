const kevoree = require('kevoree-library');
const dedupe = require('./dedupe');

function isChannelRelated(chan, master, client) {
  if (chan) {
    return chan.bindings.array.some((binding) => {
      if (binding.port && binding.port.eContainer()) {
        const node = binding.port.eContainer().eContainer();
        if (node.name === master || node.name === client) {
          return true;
        }
      }
      return false;
    });
  }

  return false;
}

function isBindingRelated(binding, master, client) {
  if (binding) {
    if (isChannelRelated(binding.hub, master, client)) {
      return true;
    }
    if (binding.port && binding.port.eContainer()) {
      const node = binding.port.eContainer().eContainer();
      if (node.name === master || node.name === client) {
        return true;
      }
      binding.port.bindings.array.some((b) => {
        if (binding.path() !== b.path()) {
          return isBindingRelated(b, master, client);
        }
        return false;
      });
    }
  }
}

function isPortRelated(port, master, client) {
  return port.bindings.array.some((binding) => {
    if (isBindingRelated(binding, master, client)) {
      return true;
    }
    return false;
  });
}

function isComponentRelated(comp, master, client) {
  const inputRelated = comp.provided.array.some((port) => {
    if (isPortRelated(port, master, client)) {
      return true;
    }
    return false;
  });

  if (inputRelated) {
    return true;
  }

  return comp.required.array.some((port) => {
    if (isPortRelated(port, master, client)) {
      return true;
    }
    return false;
  });
}

function getRootPkgName(elem) {
  return /^\/packages\[([\w]+)\]/.exec(elem.typeDefinition.path())[1];
}

function getRelatedRootPackages(node) {
  const packages = [];

  packages.push(getRootPkgName(node));

  node.components.array.forEach((comp) => {
    packages.push(getRootPkgName(comp));
  });

  node.hosts.array.forEach((node) => {
    packages.push(getRootPkgName(node));
  });

  node.groups.array.forEach((group) => {
    packages.push(getRootPkgName(group));
  });

  return packages;
}

function reduceNodes(model, master, client) {
  model.nodes.array.forEach((node) => {
    if (node.name !== master && node.name !== client) {
      const isRelated = node.components.array.some((comp) => {
        if (isComponentRelated(comp, master, client)) {
          return true;
        }
        return false;
      });

      if (!isRelated) {
        node.delete();
      }
    }
  });
}

function reduceBindings(model, master, client) {
  model.mBindings.array.forEach((binding) => {
    // only check channel for bindings because the port will be checked by components
    if (!isChannelRelated(binding.hub, master, client)) {
      binding.delete();
    }
  });
}

function reduceChannels(model, master, client) {
  model.hubs.array.forEach((chan) => {
    if (chan.bindings.array.length === 0) {
      chan.delete();
    } else {
      if (!isChannelRelated(chan, master, client)) {
        chan.delete();
      }
    }
  });
}

function reduceGroups(model, master, client) {
  model.groups.array.forEach((group) => {
    let node = group.findSubNodesByID(master);
    if (!node) {
      node = group.findSubNodesByID(client);
      if (!node) {
        group.delete();
      }
    }
  });
}

function reducePackages(model, master, client) {
  let usedPackages = [];
  const masterNode = model.findNodesByID(master);
  const clientNode = model.findNodesByID(client);

  if (masterNode) {
    usedPackages = usedPackages.concat(getRelatedRootPackages(masterNode));
  }
  if (clientNode) {
    usedPackages = usedPackages.concat(getRelatedRootPackages(clientNode));
  }

  usedPackages = dedupe(usedPackages);

  model.packages.array.forEach((pkg) => {
    if (usedPackages.indexOf(pkg.name) === -1) {
      pkg.delete();
    }
  });
}

/**
 * Reduces a clone of the given model to only the given "master"
 * and "client" nodes (and their attached groups & bindings/channels)
 *
 * @param {Object} model    a Kevoree model
 * @param {String} master   a Kevoree node name (eg. master node)
 * @param {String} client   a Kevoree node name (eg. client node)
 */
function reducer(model, master, client) {
  const factory = new kevoree.factory.DefaultKevoreeFactory();
  const cloner = factory.createModelCloner();

  const clonedModel = cloner.clone(model);

  reduceNodes(clonedModel, master, client);

  reduceBindings(clonedModel, master, client);

  reduceChannels(clonedModel, master, client);

  reduceGroups(clonedModel, master, client);

  reducePackages(clonedModel, master, client);

  return clonedModel;
}

module.exports = reducer;
