var kevoree = require('kevoree-library').org.kevoree;
var Kotlin = require('kevoree-kotlin');
var factory = kevoree.impl.DefaultKevoreeFactory();
var helper = require('../model-helper');

module.exports = function (model, statements, stmt, opts, cb) {
  var nameList = statements[stmt.children[0].type](model, statements, stmt.children[0], opts, cb);

  function doRemove1(nodeName, third) {
    var node = model.findNodesByID(nodeName);
    if (node) {
      if (third === '*') {
        // remove all components within this node
        var compz = node.components.iterator();
        while (compz.hasNext()) doRemove(compz.next());

      } else {
        var comp = node.findComponentsByID(third);
        if (comp) {
          doRemove(comp);
        } else {
          return cb(new Error('Unable to find component instance "'+third+'" in node instance "'+nodeName+'" in model (remove '+nameList.toString()+')'));
        }
      }
    } else {
      return cb(new Error('Unable to find node instance "'+nodeName+'" in model (remove '+nameList.toString()+')'));
    }
  }

  function doRemove(instance) {
    if (Kotlin.isType(instance.typeDefinition, kevoree.impl.NodeTypeImpl)) {
      var groups = model.groups.iterator();
      while (groups.hasNext()) {
        var group = groups.next();
        var subNodes = group.subNodes.iterator()
        while (subNodes.hasNext()) {
          if (subNodes.next().name == instance.name) group.removeSubNodes(instance);
        }
        var dics = group.fragmentDictionary.iterator();
        while (dics.hasNext()) {
          var dic = dics.next();
          if (dic.name === instance.name) {
            group.removeFragmentDictionary(dic);
          }
        }
      }
      var networks = model.nodeNetworks.iterator();
      while (networks.hasNext()) {
        var net = networks.next();
        if (net.target.name === instance.name) {
          model.removeNodeNetworks(net);
        }
      }
      model.removeNodes(instance);

    } else if (Kotlin.isType(instance.typeDefinition, kevoree.impl.GroupTypeImpl)) {
      model.removeGroups(instance);
    } else if (Kotlin.isType(instance.typeDefinition, kevoree.impl.ChannelTypeImpl)) {
      var bindings = model.mBindings.iterator();
      while (bindings.hasNext()) {
        var binding = bindings.next();
        if (binding.hub.name === instance.name) {
          model.removeMBindings(binding);
        }
      }
      model.removeHubs(instance);
    } else if (Kotlin.isType(instance.typeDefinition, kevoree.impl.ComponentTypeImpl)) {
      instance.eContainer().removeComponents(instance);
    } else {
      return cb(new Error('Unable to remove instance "'+names[i]+'" from current model. (Are you sure it is a node, group, chan, component?)'));
    }
  }

  for (var i in nameList) {
    nameList[i].expect(1, 3, function (err, first, second, third) {
      if (err) {
        err.message = ' (remove '+nameList.toString()+')';
        return cb(err);
      }

      if (first) {
        // TODO there is at least 3 parts in path so it must refer to a namespace 'first.second.third'
        return cb(new Error('Namespaces are not handled yet :/ Sorry (remove '+nameList.toString()+')'));

      } else {
        if (second) {
          // two parts path: 'second.third'
          if (second === '*') {
            var nodes = model.nodes.iterator();
            while (nodes.hasNext()) doRemove1(nodes.next().name, third);
          } else {
            doRemove1(second, third);
          }
        } else {
          // one part path: 'third'
          if (third === '*') {
            var nodes = model.nodes.iterator();
            var groups = model.groups.iterator();
            var hubs = model.hubs.iterator();

            while (nodes.hasNext())  doRemove(nodes.next());
            while (groups.hasNext()) doRemove(groups.next());
            while (hubs.hasNext())   doRemove(hubs.next());

          } else {
            var instance = helper.findEntityByName(model, third);
            if (instance)
              doRemove(instance);
            else
              return cb(new Error('Unable to find instance "'+third+'" in model (remove '+nameList.toString()+')'));
          }
        }
      }
    });
  }

  var names = [];

  if (stmt.children[0].type == 'nameList') {
    for (var i in stmt.children[0].children) {
      names.push(stmt.children[0].children[i].children.join(''));
    }
  } else {
    names.push(stmt.children[0].children.join(''));
  }

  for (var i in names) {
    var entity = helper.findEntityByName(model, names[i]);
    if (entity != null) {
      if (Kotlin.isType(entity.typeDefinition, kevoree.impl.NodeTypeImpl)) {
        var groups = (model.groups) ? model.groups.iterator() : null;
        if (groups != null) {
          while (groups.hasNext()) {
            var group = groups.next();
            var subNodes = group.subNodes.iterator()
            while (subNodes.hasNext()) {
              if (subNodes.next().name == entity.name) group.removeSubNodes(entity);
            }
            var values = group.dictionary.values.iterator();
            while (values.hasNext()) {
              var val = values.next();
              if (val.targetNode.name == entity.name) group.dictionary.removeValues(val);
            }
          }
        }
        model.removeNodes(entity);

      } else if (Kotlin.isType(entity.typeDefinition, kevoree.impl.GroupTypeImpl)) {
        model.removeGroups(entity);
      } else if (Kotlin.isType(entity.typeDefinition, kevoree.impl.ChannelTypeImpl)) {
        model.removeHubs(entity);
      } else if (Kotlin.isType(entity.typeDefinition, kevoree.impl.ComponentTypeImpl)) {
        entity.eContainer().removeComponents(entity);
      } else {
        return cb(new Error('Unable to remove instance "'+names[i]+'" from current model. (Are you sure it is a node, group, chan, component?)'));
      }
    }
  }

  cb();
}