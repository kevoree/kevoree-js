

const kevoree = require('kevoree-library');
const KevScriptError = require('../KevScriptError');
const modelHelper = require('../util/model-helper');
const dedupeDeployUnits = require('../util/dedupe-deployunits');

function inflateDictionary(instance) {
  const factory = new kevoree.factory.DefaultKevoreeFactory();
  const dicType = instance.typeDefinition.dictionaryType;
  if (dicType) {
    const dic = factory.createDictionary().withGenerated_KMF_ID('0.0');
    dicType.attributes.array.forEach((attr) => {
      if (!attr.fragmentDependant) {
        const dicEntry = factory.createValue();
        dicEntry.name = attr.name;
        dicEntry.value = attr.defaultValue;
        dic.addValues(dicEntry);
      }
    });
    instance.dictionary = dic;
  }
}

function createPorts(comp) {
  const factory = new kevoree.factory.DefaultKevoreeFactory();
  comp.typeDefinition.provided.array.forEach((portType) => {
    const port = factory.createPort();
    port.name = portType.name;
    port.portTypeRef = portType;
    comp.addProvided(port);
  });

  comp.typeDefinition.required.array.forEach((portType) => {
    const port = factory.createPort();
    port.name = portType.name;
    port.portTypeRef = portType;
    comp.addRequired(port);
  });
}

module.exports = (model, expressions, stmt, opts) => {
  if (!stmt.instances) {
    stmt.instances = {};
  }

  const nameList = expressions[stmt.children[0].type](model, expressions, stmt.children[0], opts);
  const tdefExpr = expressions[stmt.children[1].type](model, expressions, stmt.children[1], opts);

  return Promise.resolve()
    .then(() => {
      // resolve TypeDefinition
      opts.logger.debug('Trying to resolve ' + tdefExpr);
      return opts.resolver.resolve(tdefExpr, model)
        .then((tdef) => {
          if (tdef) {
            return tdef;
          } else {
            throw new KevScriptError('Unable to resolve ' + tdefExpr);
          }
        })
        .catch((err) => {
          err.pos = stmt.children[1].pos;
          throw err;
        });
    })
    .then(dedupeDeployUnits)
    .then((tdef) => {
      const factory = new kevoree.factory.DefaultKevoreeFactory();
      nameList.forEach((instancePath, i) => {
        let instance;
        if (instancePath.length === 1) {
          if (opts.identifiers.indexOf(instancePath[0]) === -1) {
            // node / chan / group
            if (tdef.metaClassName() === 'org.kevoree.NodeType') {
              instance = model.findNodesByID(instancePath[0]) || factory.createContainerNode();
              instance.name = instancePath[0];
              instance.started = true;
              instance.typeDefinition = tdef;
              inflateDictionary(instance);
              model.addNodes(instance);
              stmt.instances[instance.path()] = stmt.children[0].children[i].pos;
            } else if (tdef.metaClassName() === 'org.kevoree.GroupType') {
              instance = model.findGroupsByID(instancePath[0]) || factory.createGroup();
              instance.name = instancePath[0];
              instance.started = true;
              instance.typeDefinition = tdef;
              inflateDictionary(instance);
              model.addGroups(instance);
              stmt.instances[instance.path()] = stmt.children[0].children[i].pos;
            } else if (tdef.metaClassName() === 'org.kevoree.ChannelType') {
              instance = model.findHubsByID(instancePath[0]) || factory.createChannel();
              instance.name = instancePath[0];
              instance.started = true;
              instance.typeDefinition = tdef;
              inflateDictionary(instance);
              model.addHubs(instance);
              stmt.instances[instance.path()] = stmt.children[0].children[i].pos;
            } else {
              throw new KevScriptError('Components must be added in nodes (eg. "add aNode.' + instancePath[0] + ': ' + tdef.name + '"). "' + instancePath + '" is not valid', stmt.children[0].children[i].pos);
            }
            // save instance name to identifiers map
            opts.identifiers.push(instancePath[0]);
          } else {
            throw new KevScriptError('Instance name "' + instancePath[0] + '" is already used. Add failed', stmt.children[0].children[i].pos);
          }
        } else if (instancePath.length === 2) {
          // component/subNode
          if (tdef.metaClassName() === 'org.kevoree.NodeType') {
            if (instancePath[0] === '*') {
              throw new KevScriptError('Add statement with "*" only works for component type', stmt.children[0].children[i].pos);
            } else {
              // add a subNode to a node
              const hostNode = model.findNodesByID(instancePath[0]);
              if (hostNode) {
                instance = model.findNodesByID(instancePath[1]) || factory.createContainerNode();
                instance.name = instancePath[1];
                instance.started = true;
                instance.typeDefinition = tdef;
                inflateDictionary(instance);
                hostNode.addHosts(instance);
                instance.host = hostNode;
                model.addNodes(instance);
                stmt.instances[instance.path()] = instancePath.pos;
              } else {
                throw new KevScriptError('Unable to add node "' + instancePath[1] + '" to "' + instancePath[0] + '". "' + instancePath[0] + '" does not exist', stmt.children[0].children[i].children[0].pos);
              }
            }
          } else if (tdef.metaClassName() === 'org.kevoree.ComponentType') {
            const nodes = model.select('/nodes[' + instancePath[0] + ']').array;

            if (nodes.length === 0) {
              if (instancePath[0] === '*') {
                throw new KevScriptError('Unable to find any node instance to host "' + instancePath[1] + '". Add failed', stmt.children[0].children[i].children[0].pos);
              } else {
                throw new KevScriptError('Unable to find any node instance named "' + instancePath[0] + '" to host "' + instancePath[1] + '". Add failed', stmt.children[0].children[i].children[0].pos);
              }
            }
            // add component to all non-hosted nodes
            nodes.forEach((node) => {
              if (!node.host) {
                if (opts.identifiers.indexOf(node.name + '.' + instancePath[1]) === -1) {
                  if (modelHelper.isCompatible(tdef, node)) {
                    instance = node.findComponentsByID(instancePath[1]) || factory.createComponentInstance();
                    instance.name = instancePath[1];
                    instance.started = true;
                    instance.typeDefinition = tdef;
                    inflateDictionary(instance);
                    createPorts(instance);
                    node.addComponents(instance);
                    stmt.instances[instance.path()] = stmt.children[0].children[i].pos;
                  } else {
                    throw new KevScriptError('Unable to add \'' + instancePath[1] + '\' (' + tdef.name + '/' + tdef.version + ') to \'' + node.name + '\' (' + node.typeDefinition.name + '/' + node.typeDefinition.version + '), no available \'' + modelHelper.getPlatforms(node.typeDefinition)[0] + '\' platform', instancePath[1].pos);
                  }
                  opts.identifiers.push(node.name + '.' + instancePath[1]);
                } else {
                  throw new KevScriptError('Instance name "' + instancePath[1] + '" is already used in "' + instancePath[0] + '". Add failed', stmt.children[0].children[i].pos);
                }
              }
            });
          } else {
            throw new KevScriptError('Instance "' + instancePath[1] + '" of type ' + tdef.metaClassName() + ' cannot be added to a node', stmt.children[0].children[i].pos);
          }
        } else {
          throw new KevScriptError('Instance path for "add" statements must be "name" or "hostName.childName". Instance path "' + instancePath + '" is not valid', stmt.children[0].children[i].pos);
        }
      });
    });
};
