var kevoree = require('kevoree-library').org.kevoree;
var factory = new kevoree.impl.DefaultKevoreeFactory();

module.exports = function (model, statements, stmt, opts, cb) {
  var nodePath  = statements[stmt.children[0].type](model, statements, stmt.children[0], opts, cb);
  var value = statements[stmt.children[1].type](model, statements, stmt.children[1], opts, cb);

  nodePath.expect(1, 2, function (err, namespace, name) {
    if (err) {
      err.message += ' (network '+nodePath.toString()+' '+value+')';
      return cb(err);
    }

    if (namespace) {
      // TODO
      return cb(new Error('Namespaces are not handled yet :/ Sorry (network '+nodePath.toString()+' '+value+')'));

    } else {
      if (nodePath === '*') {

      } else {
        var node = model.findNodesByID(name);
        if (node) {
          var net = factory.createNodeNetwork();
          net.target = node;
          net.initBy = node;
          var link = factory.createNodeLink();
          link.networkType = 'ip';
          link.estimatedRate = 99;
          net.addLink(link);
          var prop = factory.createNetworkProperty();
          prop.name = 'ip';
          prop.value = value;
          link.addNetworkProperties(prop);
          model.addNodeNetworks(net);

        } else {
          return cb(new Error('Unable to find node instance "'+name+'" in model (network '+nodePath.toString()+' '+value+')'));
        }
      }
    }
  });

  cb();
}