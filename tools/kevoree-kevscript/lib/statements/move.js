var Kotlin = require('kevoree-kotlin');
var kevoree = require('kevoree-library').org.kevoree;

module.exports = function (model, statements, stmt, opts, cb) {
  // instances to move
  var nameList = statements[stmt.children[0].type](model, statements, stmt.children[0], opts, cb);
  // target node to move instances to
  var target   = statements[stmt.children[1].type](model, statements, stmt.children[1], opts, cb);

  function processNameList(targetNode) {
    for (var i in nameList) {
      nameList[i].expect(2, 3, function (err, namespace, nodeName, compName) {
        if (err) {
          err.message += ' (move '+nameList.toString()+' '+target.toString()+')';
          return cb(err);
        }

        if (namespace) {
          // TODO
          return cb(new Error('Namespaces are not handled yet :/ Sorry (move '+nameList.toString()+' '+target.toString()+')'));

        } else {
          if (nodeName === '*') {
            if (compName === '*') {
              // move *.* fooNode
              var nodes = model.nodes.iterator();
              while (nodes.hasNext()) {
                var fromNode = nodes.next();
                var comps = fromNode.components.iterator();
                while (comps.hasNext()) {
                  var comp = comps.next();
                  fromNode.removeComponents(comp);
                  targetNode.addComponents(comp);
                }
              }

            } else {
              // move *.fooComp fooNode
              var nodes = model.nodes.iterator();
              while (nodes.hasNext()) {
                var fromNode = nodes.next();
                var comp = fromNode.findComponentsByID(compName);
                if (comp) {
                  fromNode.removeComponents(comp);
                  targetNode.addComponents(comp);
                }
              }
            }

          } else {
            if (compName === '*') {
              // move fooNode.* barNode
              var fromNode = model.findNodesByID(nodeName);
              if (fromNode) {
                var comps = fromNode.components.iterator();
                while (comps.hasNext()) {
                  var comp = comps.next();
                  fromNode.removeComponents(comp);
                  targetNode.addComponents(comp);
                }

              } else {
                return cb(new Error('Unable to find node "'+nodeName+'" in model (move '+nameList.toString()+' '+target.toString()+')'));
              }

            } else {
              // move fooNode.fooComp barNode
              var node = model.findNodesByID(nodeName);
              if (node) {
                var comp = node.findComponentsByID(compName);
                if (comp) {
                  node.removeComponents(comp);
                  targetNode.addComponents(comp);
                }

              } else {
                return cb(new Error('Unable to find node "'+nodeName+'" in model (move '+nameList.toString()+' '+target.toString()+')'));
              }
            }
          }
        }
      });
    }
  }

  // process target instancePath
  target.expect(1, 2, function (err, namespace, name) {
    if (err) {
      err.message += ' (move '+nameList.toString()+' '+target.toString()+')';
      return cb(err);
    }

    if (namespace) {
      // TODO
      return cb(new Error('Namespaces are not handled yet :/ Sorry (move '+nameList.toString()+' '+target.toString()+')'));
//      if (opts.namespaces[namespace]) {
//        var instance = opts.namespaces[namespace][name];
//        if (Kotlin.isType(instance.typeDefinition, kevoree.impl.NodeTypeImpl)) {
//          // target node exists
//          processNameList(instance);
//
//        } else {
//          return cb(new Error('Matched entity in namespace "'+[namespace, name].join('.')+'" must be a NodeType.'));
//        }
//
//      } else {
//        return cb(new Error('Unable to find namespace "'+namespace+'"'));
//      }

    } else {
      if (name === '*') {
        return cb(new Error('You must specify one and only node target (move '+nameList.toString()+' '+target.toString()+')'));

      } else {
        // check if the target exists
        var targetNode = model.findNodesByID(name);
        if (targetNode) {
          // target node exists
          processNameList(targetNode);

        } else {
          // node does not exist in current model
          return cb(new Error('Unable to find target node "'+target.toString()+'" in current model (move '+nameList.toString()+' '+target.toString()+')'));
        }
      }
    }
  });

  cb();
}