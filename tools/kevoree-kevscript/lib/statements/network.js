var kevoree = require('kevoree-library').org.kevoree;
var factory = new kevoree.factory.DefaultKevoreeFactory();

module.exports = function (model, statements, stmt, opts, cb) {
    var networkPath  = statements[stmt.children[0].type](model, statements, stmt.children[0], opts, cb);
    var value = statements[stmt.children[1].type](model, statements, stmt.children[1], opts, cb);

    networkPath.expect(3, 4, function (err, namespace, nodeName, netName, propName) {
        if (err) {
            err.message += ' (network '+networkPath.toString()+' '+value+')';
            return cb(err);
        }

        function addProp(net, propName) {
            if (propName === '*') {
                var props = net.values.iterator();
                while (props.hasNext()) {
                    props.next().value = value;
                }

            } else {
                var prop = net.findValuesByID(propName);
                if (prop) {
                    prop.value = value;
                } else {
                    prop = factory.createValue();
                    prop.name = propName;
                    prop.value = value;
                    net.addValues(prop);
                }
            }
        }

        function addNet(node, netName, propName) {
            if (netName === '*') {
                var nets = node.networkInformation.iterator();
                while (nets.hasNext()) addProp(nets.next(), propName);

            } else {
                var net = node.findNetworkInformationByID(netName);
                if (net) {
                    addProp(net, propName);
                } else {
                    net = factory.createNetworkInfo();
                    net.name = netName;
                    node.addNetworkInformation(net);
                    addProp(net, propName);
                }
            }
        }

        if (namespace) {
            // TODO
            return cb(new Error('Namespaces are not handled yet :/ Sorry (network '+networkPath.toString()+' '+value+')'));

        } else {
            // networkPath looks like "network node.foo.bar 0.0.0.0"
            if (nodeName === '*') {
                var nodes = model.nodes.iterator();
                while (nodes.hasNext()) addNet(nodes.next(), netName, propName);

            } else {
                var node = model.findNodesByID(nodeName);
                if (node) {
                    addNet(node, netName, propName);
                } else {
                    return cb(new Error('Unable to find node instance "'+nodeName+'" (network '+networkPath.toString()+' '+value+')'));
                }
            }
        }
    });

    cb();
};