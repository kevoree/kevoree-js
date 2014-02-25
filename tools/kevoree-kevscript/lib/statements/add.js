var kevoree    = require('kevoree-library').org.kevoree;
var factory    = new kevoree.impl.DefaultKevoreeFactory();
var Kotlin     = require('kevoree-kotlin');

module.exports = function (model, statements, stmt, opts, cb) {
    var nameList = statements[stmt.children[0].type](model, statements, stmt.children[0], opts, cb);
    var typeDef  = statements[stmt.children[1].type](model, statements, stmt.children[1], opts, cb);

    // try to find TypeDefinition in model
    var tDef = model.findTypeDefinitionsByID(typeDef);

    // add node instance function
    function addNodeInstance(namespace, nodeName, parentNode) {
        if (nodeName !== '*') {
            var node = factory.createContainerNode();
            node.name = nodeName;
            node.typeDefinition = tDef;
            model.addNodes(node);
            if (parentNode) parentNode.addHosts(node);

            if (namespace) {
                if (opts.namespaces[namespace]) {
                    opts.namespaces[namespace][nodeName] = node;
                } else {
                    return cb(new Error('Unable to find "'+namespace+'" namespace. Did you create it? (add '+nameList[i].toString()+' : '+typeDef.toString()+')'));
                }
            }
        } else {
            return cb(new Error('You cannot name a node instance "*" (add '+nameList[i].toString()+' : '+typeDef.toString()+')'));
        }
    }

    // create proper entity according to the type
    if (Kotlin.isType(tDef, kevoree.impl.NodeTypeImpl)) {
        for (var i in nameList) {
            nameList[i].expect(1, 3, function (err, namespace, parentName, childName) {
                if (err) {
                    err.message += ' (add '+nameList[i].toString()+' : '+typeDef.toString()+')';
                    return cb(err);
                }

                if (namespace) {
                    // TODO handle namespaces
                    return cb(new Error());
                } else {
                    if (parentName) {
                        if (parentName === '*') {
                            // parentName can't be '*' because each node name must be unique within a model so you can't
                            // duplicate the same childName on each parentNode
                            return cb(new Error('You can not refer to all node instances with \'*\' when adding child node instances. (add '+nameList[i].toString()+' : '+typeDef.toString()+')'));
                        } else {
                            var parentNode = model.findNodesByID(parentName);
                            if (parentNode) {
                                addNodeInstance(namespace, childName, parentNode);

                            } else {
                                return cb(new Error('Unable to find parent node instance "'+parentName+'" in model. Did you create it? (add '+nameList[i].toString()+' : '+typeDef.toString()+')'));
                            }
                        }

                    } else {
                        addNodeInstance(namespace, childName);
                    }
                }
            });
        }

    } else if (Kotlin.isType(tDef, kevoree.impl.GroupTypeImpl)) {
        for (var i in nameList) {
            nameList[i].expect(1, 2, function (err, namespace, instanceName) {
                if (err) {
                    err.message += ' (add '+nameList[i].toString()+' : '+typeDef.toString()+')';
                    return cb(err);
                }

                if (instanceName !== '*') {
                    var group = factory.createGroup();
                    group.name = instanceName;
                    group.typeDefinition = tDef;
                    model.addGroups(group);

                    if (namespace) {
                        if (opts.namespaces[namespace]) {
                            opts.namespaces[namespace][instanceName] = group;
                        } else {
                            return cb(new Error('Unable to find "'+namespace+'" namespace. Did you create it? (add '+nameList[i].toString()+' : '+typeDef.toString()+')'));
                        }
                    }
                } else {
                    return cb(new Error('You cannot name a node instance "*" (add '+nameList[i].toString()+' : '+typeDef.toString()+')'));
                }
            });
        }

    } else if (Kotlin.isType(tDef, kevoree.impl.ChannelTypeImpl)) {
        for (var i in nameList) {
            nameList[i].expect(1, 2, function (err, namespace, instanceName) {
                if (err) {
                    err.message += ' (add '+nameList[i].toString()+' : '+typeDef.toString()+')';
                    return cb(err);
                }

                if (instanceName !== '*') {
                    var chan = factory.createChannel();
                    chan.name = instanceName;
                    chan.typeDefinition = tDef;
                    model.addHubs(chan);

                    if (namespace) {
                        if (opts.namespaces[namespace]) {
                            opts.namespaces[namespace][instanceName] = chan;
                        } else {
                            return cb(new Error('Unable to find "'+namespace+'" namespace. Did you create it? (add '+nameList[i].toString()+' : '+typeDef.toString()+')'));
                        }
                    }
                } else {
                    return cb(new Error('You cannot name a node instance "*" (add '+nameList[i].toString()+' : '+typeDef.toString()+')'));
                }
            });
        }

    } else if (Kotlin.isType(tDef, kevoree.impl.ComponentTypeImpl)) {
        for (var i in nameList) {
            nameList[i].expect(2, 3, function (err, namespace, nodeName, compName) {
                if (err) {
                    err.message += ' (add '+nameList[i].toString()+' : '+typeDef.toString()+')';
                    return cb(err);
                }

                if (namespace) {
                    // TODO handle namespace
                    return cb(new Error('Namespaces are not handled yet :/ Sorry'));

                } else if (compName === '*') {
                    return cb(new Error('You cannot name a component instance "*" (add '+nameList[i].toString()+' : '+typeDef.toString()+')'));

                } else {
                    if (nodeName === '*') {
                        // add compName instance to all nodes in the model
                        var nodes = model.nodes.iterator();
                        while (nodes.hasNext()) {
                            var comp = factory.createComponentInstance();
                            comp.name = compName;
                            comp.typeDefinition = tDef;
                            nodes.next().addComponents(comp);
                        }

                    } else {
                        var node = model.findNodesByID(nodeName);
                        if (node) {
                            var comp = factory.createComponentInstance();
                            comp.name = compName;
                            comp.typeDefinition = tDef;
                            node.addComponents(comp);

                        } else {
                            return cb(new Error('Unable to find container node "'+nodeName+'" in current model (add '+nameList[i].toString()+' : '+typeDef.toString()+')'));
                        }
                    }
                }
            });
        }

    } else {
        return cb(new Error('TypeDefinition "'+typeDef+'" doesn\'t exist in current model. (Maybe you should add an "include" for it?)'));
    }
    cb();
}