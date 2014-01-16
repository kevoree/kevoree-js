var kevoree   = require('kevoree-library').org.kevoree,
    modelSync = require('kevoree-model-sync'),
    config    = require('./../config'),
    path      = require('path');

var compare    = new kevoree.compare.DefaultModelCompare();
var loader     = new kevoree.loader.JSONModelLoader();
var serializer = new kevoree.serializer.JSONModelSerializer();
var factory    = new kevoree.impl.DefaultKevoreeFactory();

/**
 * GET /bootstrap
 * Returns a Kevoree bootstrap model for browser platform
 * @param req
 * @param res
 */
module.exports = function (req, res) {
  // retrieve server-side platform current model (this model is automatically written to server's root folder
  // everytime a new model is deployed on it (take a look at 'lib/nodeJSPlatform.js')
  var model = loader.loadModelFromString(JSON.stringify(require('./../model.json'))).get(0);

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

    // add this instance to model
    model.addNodes(nodeInstance);

    // connect this node to server-side group
    var groupInstance = model.findGroupsByID(config.nodeJSPlatform.groupName); // FIXME if people mess up with server-side group name, we are doomed
    groupInstance.addSubNodes(nodeInstance);
    
    // push new created model to server-side platform
    var dic = groupInstance.findFragmentDictionaryByID(config.nodeJSPlatform.nodeName);
    var val = dic.findValuesByID('port');
    
    modelSync.push({model: model, host: '127.0.0.1', port: val.value}, function (err) {
      if (err) return res.send(500, 'Unable to push model to "server-node" :/');
      
      var modelStr = serializer.serialize(model);
      return res.json({model: modelStr});
    });
  } else {
    return res.send(5000, '"server-node" is not reachable. Something crashed server-side obviously :/');
  }
}