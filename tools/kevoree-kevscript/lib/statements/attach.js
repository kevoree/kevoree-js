module.exports = function (model, statements, stmt, opts, cb) {
  var nameList = statements[stmt.children[0].type](model, statements, stmt.children[0], opts, cb);
  var target   = statements[stmt.children[1].type](model, statements, stmt.children[1], opts, cb);

  function addNodeToGroup(group) {
    for (var i=0; i < nameList.length; i++) {
      nameList[i].expect(1, 2, function (err, namespace, nodeName) {
        if (err) {
          err.message += ' (attach '+nameList.toString()+' '+target.toString()+')';
          return cb(err);
        }

        if (namespace) {
          // TODO
          return cb(new Error('Namespaces are not handled yet :/ Sorry (attach '+nameList.toString()+' '+target.toString()+')'));

        } else {
          if (nodeName === '*') {
            // attach all nodes to group
            var nodes = model.nodes.iterator();
            while (nodes.hasNext()) group.addSubNodes(nodes.next());

          } else {
            var node = model.findNodesByID(nodeName);
            if (node) {
              group.addSubNodes(node);
            } else {
              return cb(new Error('Unable to find node "'+nodeName+'" in model (attach '+nameList.toString()+' '+target.toString()+')'));
            }
          }
        }
      });
    }
  }

  target.expect(1, 2, function (err, namespace, name) {
    if (err) {
      err.message += ' (attach '+nameList.toString()+' '+target.toString()+')';
      return cb(err);
    }

    if (namespace) {
      // TODO
      return cb(new Error('Namespaces are not handled yet :/ Sorry (attach '+nameList.toString()+' '+target.toString()+')'));

    } else {
      if (name === '*') {
        var groups = model.groups.iterator();
        while (groups.hasNext()) addNodeToGroup(groups.next());

      } else {
        var group = model.findGroupsByID(name);
        if (group) {
          addNodeToGroup(group);

        } else {
          return cb(new Error('Unable to find group "'+name+'" in model (attach '+nameList.toString()+' '+target.toString()+')'));
        }
      }
    }
  });

  cb();
}