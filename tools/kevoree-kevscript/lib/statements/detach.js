var kevoree = require('kevoree-library').org.kevoree;
var factory = kevoree.impl.DefaultKevoreeFactory();

module.exports = function (model, statements, stmt, opts, cb) {
  var names = [];
  var group = null;
  var target = stmt.children[1].children.join('');

  if (stmt.children[0].type == 'nameList') {
    var nodeList = stmt.children[0].children;
    for (var i in nodeList) {
      names.push(nodeList[i].children.join(''));
    }

  } else if (stmt.children[0] == '*') {
    group = model.findGroupsByID(target);
    if (typeof(group) != 'undefined') {
      var nodes = group.subNodes.iterator();
      while (nodes.hasNext()) names.push(nodes.next().name);
    } else {
      return cb(new Error('Unable to find group instance "'+target+'" in current model. (detach * '+target+')'));
    }
  } else {
    names.push(stmt.children[0].children.join(''));
  }

  for (var i in names) {
    group = model.findGroupsByID(target);
    if (typeof(group) != 'undefined') {
      var node = model.findNodesByID(names[i]);
      if (typeof(node) != 'undefined') {
        group.removeSubNodes(node);
      }
    }
  }

  cb();
}