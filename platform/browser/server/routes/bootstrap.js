/**
 * Created by leiko on 12/03/14.
 */
var kevoree    = require('kevoree-library').org.kevoree,
    pushModel  = require('../lib/pushModel'),
    config     = require('./../config.js');

var NAME_PATTERN = /^[\w-]+$/;

var serializer = new kevoree.serializer.JSONModelSerializer();
var factory    = new kevoree.impl.DefaultKevoreeFactory();

module.exports = function (model) {
    return function (req, res) {
        if (req.body.nodename.match(NAME_PATTERN)) {
            var serverNode = model.findNodesByID(config.serverPlatform.nodeName);
            if (serverNode) {
                // let's be really cautious about given name
                var node = model.findNodesByID(req.body.nodename);
                if (!node) {
                    // this node name is available
                    // create a node instance for the new client
                    var clientNode = factory.createContainerNode();
                    clientNode.name = req.body.nodename;
                    clientNode.typeDefinition = serverNode.typeDefinition;

                    // add this instance to model
                    model.addNodes(clientNode);

                    // connect this node to server-side group
                    var groupInstance = model.findGroupsByID(config.serverPlatform.groupName); // FIXME if people mess up with server-side group name, we are doomed
                    groupInstance.addSubNodes(clientNode);

                    // push new created model to server-side platform
                    try {
                        var modelStr = serializer.serialize(model);

                        var options = {
                            host:   config.serverPlatform.serverHost,
                            port:   config.serverPlatform.groupPort,
                            path:   config.serverPlatform.groupPath
                        };

                        pushModel(options, modelStr, function (err) {
                            if (err) {
                                res.json({error: 'Unable to push model to "'+config.serverPlatform.nodeName+'" ('+err.message+')'});
                                return;
                            }

                            res.json({model: modelStr});
                        });
                    } catch (err) {
                        // model serialization error
                        res.json({error: 'Unable to serialize model. Bootstrap failed.'});
                    }
                } else {
                    // node name unavailable
                    return res.json({error: '"'+req.body.nodename+'" node name is not available. Please choose another one.'});
                }

            } else {
                return res.json({error: '"'+config.serverPlatform.nodeName+'" is not reachable. Something crashed server-side obviously :/'});
            }
        } else {
            return res.json({error: '"'+req.body.nodename+'" node name is not valid. Valid name must match this regex '+NAME_PATTERN.toString()});
        }
    };
};