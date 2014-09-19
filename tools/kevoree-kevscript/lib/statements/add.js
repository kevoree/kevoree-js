var kevoree = require('kevoree-library').org.kevoree;
var factory = new kevoree.factory.DefaultKevoreeFactory();
var Kotlin  = require('kevoree-kotlin');
var getFQN  = require('../getFQN');

module.exports = function (model, statements, stmt, opts, done) {
    var nameList = statements[stmt.children[0].type](model, statements, stmt.children[0], opts);
    statements[stmt.children[1].type](model, statements, stmt.children[1], opts, function (err, tDef) {
        if (err) {
            done(err);
        } else {
            // add node instance function
            function addNodeInstance(namespace, nodeName, parentNode) {
                if (nodeName !== '*') {
                    var node = factory.createContainerNode();
                    node.name = nodeName;
                    node.typeDefinition = tDef;
                    node.started = true;
                    model.addNodes(node);
                    if (parentNode) parentNode.addHosts(node);

                    if (namespace) {
                        if (opts.namespaces[namespace]) {
                            opts.namespaces[namespace][nodeName] = node;
                        } else {
                            return done(new Error('Unable to find "'+namespace+'" namespace. Did you create it? (add '+nameList[i].toString()+' : '+getFQN(tDef)+')'));
                        }
                    }
                } else {
                    return done(new Error('You cannot name a node instance "*" (add '+nameList[i].toString()+' : '+getFQN(tDef)+')'));
                }
            }

            // create proper entity according to the type
            if (Kotlin.isType(tDef, kevoree.NodeType)) {
                for (var i in nameList) {
                    nameList[i].expect(1, 3, function (err, namespace, parentName, childName) {
                        if (err) {
                            err.message += ' (add '+nameList[i].toString()+' : '+getFQN(tDef)+')';
                            return done(err);
                        }

                        if (namespace) {
                            // TODO handle namespaces
                            return done(new Error());
                        } else {
                            if (parentName) {
                                if (parentName === '*') {
                                    // parentName can't be '*' because each node name must be unique within a model so you can't
                                    // duplicate the same childName on each parentNode
                                    return done(new Error('You can not refer to all node instances with \'*\' when adding child node instances. (add '+nameList[i].toString()+' : '+getFQN(tDef)+')'));
                                } else {
                                    var parentNode = model.findNodesByID(parentName);
                                    if (parentNode) {
                                        addNodeInstance(namespace, childName, parentNode);

                                    } else {
                                        return done(new Error('Unable to find parent node instance "'+parentName+'" in model. Did you create it? (add '+nameList[i].toString()+' : '+getFQN(tDef)+')'));
                                    }
                                }

                            } else {
                                addNodeInstance(namespace, childName);
                            }
                        }
                    });
                }

            } else if (Kotlin.isType(tDef, kevoree.GroupType)) {
                for (var i in nameList) {
                    nameList[i].expect(1, 2, function (err, namespace, instanceName) {
                        if (err) {
                            err.message += ' (add '+nameList[i].toString()+' : '+getFQN(tDef)+')';
                            return done(err);
                        }

                        if (instanceName !== '*') {
                            var group = factory.createGroup();
                            group.name = instanceName;
                            group.typeDefinition = tDef;
                            group.started = true;
                            model.addGroups(group);

                            if (namespace) {
                                if (opts.namespaces[namespace]) {
                                    opts.namespaces[namespace][instanceName] = group;
                                } else {
                                    return done(new Error('Unable to find "'+namespace+'" namespace. Did you create it? (add '+nameList[i].toString()+' : '+getFQN(tDef)+')'));
                                }
                            }
                        } else {
                            return done(new Error('You cannot name a node instance "*" (add '+nameList[i].toString()+' : '+getFQN(tDef)+')'));
                        }
                    });
                }

            } else if (Kotlin.isType(tDef, kevoree.ChannelType)) {
                for (var i in nameList) {
                    nameList[i].expect(1, 2, function (err, namespace, instanceName) {
                        if (err) {
                            err.message += ' (add '+nameList[i].toString()+' : '+getFQN(tDef)+')';
                            return done(err);
                        }

                        if (instanceName !== '*') {
                            var chan = factory.createChannel();
                            chan.name = instanceName;
                            chan.typeDefinition = tDef;
                            chan.started = true;
                            model.addHubs(chan);

                            if (namespace) {
                                if (opts.namespaces[namespace]) {
                                    opts.namespaces[namespace][instanceName] = chan;
                                } else {
                                    return done(new Error('Unable to find "'+namespace+'" namespace. Did you create it? (add '+nameList[i].toString()+' : '+getFQN(tDef)+')'));
                                }
                            }
                        } else {
                            return done(new Error('You cannot name a node instance "*" (add '+nameList[i].toString()+' : '+getFQN(tDef)+')'));
                        }
                    });
                }

            } else if (Kotlin.isType(tDef, kevoree.ComponentType)) {
                for (var i in nameList) {
                    nameList[i].expect(2, 3, function (err, namespace, nodeName, compName) {
                        if (err) {
                            done(new Error('Component instances must be added to Node instances (add '+nameList[i].toString()+' : '+getFQN(tDef)+')'));
                            return;
                        }

                        if (namespace) {
                            // TODO handle namespace
                            return done(new Error('Namespaces are not handled yet :/ Sorry'));

                        } else if (compName === '*') {
                            return done(new Error('You cannot name a component instance "*" (add '+nameList[i].toString()+' : '+getFQN(tDef)+')'));

                        } else {
                            var comp;
                            if (nodeName === '*') {
                                // add compName instance to all nodes in the model
                                var nodes = model.nodes.iterator();
                                while (nodes.hasNext()) {
                                    comp = factory.createComponentInstance();
                                    comp.name = compName;
                                    comp.typeDefinition = tDef;
                                    comp.started = true;
                                    nodes.next().addComponents(comp);
                                }

                            } else {
                                var node = model.findNodesByID(nodeName);
                                if (node) {
                                    comp = factory.createComponentInstance();
                                    comp.name = compName;
                                    comp.typeDefinition = tDef;
                                    comp.started = true;
                                    node.addComponents(comp);

                                } else {
                                    return done(new Error('Unable to find container node "'+nodeName+'" in current model (add '+nameList[i].toString()+' : '+getFQN(tDef)+')'));
                                }
                            }
                        }
                    });
                }

            } else {
                return done(new Error('TypeDefinition "'+tDef.name+'/'+tDef.version+'" doesn\'t exist in current model. (Maybe you should add an "include" for it?)'));
            }
            done();
        }
    });
};