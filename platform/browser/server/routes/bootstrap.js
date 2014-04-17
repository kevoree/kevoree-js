/**
 * Created by leiko on 12/03/14.
 */
var http       = require('http'),
    kevoree    = require('kevoree-library').org.kevoree,
    modelSync  = require('kevoree-model-sync'),
    config     = require('./../config.js');

var serializer = new kevoree.serializer.JSONModelSerializer();
var factory    = new kevoree.impl.DefaultKevoreeFactory();

module.exports = function (model) {
    return function (req, res) {
        var serverNode = model.findNodesByID(config.nodeJSPlatform.nodeName);
        if (serverNode) {
            // let's be really cautious about given name
            var nodename = req.body.nodename || 'node'+parseInt(Math.random()*1e10); // name from request or random generated
            var nodeInst = model.findNodesByID(nodename);
            if (nodeInst) nodename = 'node'+parseInt(Math.random()*1e10); // this name was already taken server-side: roll the dices again to find a new name

            // create a node instance for the new client
            var nodeInstance = factory.createContainerNode();
            nodeInstance.name = nodename;
            nodeInstance.typeDefinition = serverNode.typeDefinition;
            // create a default network information
            var net = factory.createNetworkInfo();
            net.name = 'lan';
            var prop = factory.createNetworkProperty();
            prop.name = 'ip';
            prop.value = '127.0.0.1';
            net.addValues(prop);
            nodeInstance.addNetworkInformation(net);

            // add this instance to model
            model.addNodes(nodeInstance);

            // connect this node to server-side group
            var groupInstance = model.findGroupsByID(config.nodeJSPlatform.groupName); // FIXME if people mess up with server-side group name, we are doomed
            groupInstance.addSubNodes(nodeInstance);

            // push new created model to server-side platform
            var dic = groupInstance.findFragmentDictionaryByID(config.nodeJSPlatform.nodeName);
            var val = dic.findValuesByID('port');

            modelSync.push({model: model, host: '127.0.0.1', port: val.value}, function (err) {
                if (err) return res.jsonp(JSON.parse(new Error('Unable to push model to "server-node" :/')));

                var modelStr = serializer.serialize(model);
                return res.jsonp({model: modelStr});
            });
        } else {
            return res.jsonp(JSON.parse(new Error('"server-node" is not reachable. Something crashed server-side obviously :/')));
        }
    }
}