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
            function inflateDictionary(instance) {
                var dicType = instance.typeDefinition.dictionaryType;
                if (dicType) {
                    var dic = factory.createDictionary();
                    var attrs = dicType.attributes.iterator();
                    while (attrs.hasNext()) {
                        var attr = attrs.next();
                        if (!attr.fragmentDependant && !attr.optional && typeof attr.defaultValue !== 'undefined') {
                            var val = factory.createValue();
                            val.name = attr.name;
                            val.value = attr.defaultValue;
                            dic.addValues(val);
                        }
                    }
                    if (dic.values.size() > 0) {
                        instance.dictionary = dic;
                    }
                }
            }

            // add node instance function
            function addNodeInstance(namespace, nodeName, parentNode) {
                if (nodeName !== '*') {
                    var node = factory.createContainerNode();
                    node.name = nodeName;
                    node.typeDefinition = model.findByPath(tDef.path());
                    node.started = true;
                    inflateDictionary(node);
                    model.addNodes(node);
                    if (parentNode) {
                        parentNode.addHosts(node);
                    }

                    if (namespace) {
                        if (opts.namespaces[namespace]) {
                            opts.namespaces[namespace][nodeName] = node;
                        } else {
                            done(new Error('Unable to find "'+namespace+'" namespace. Did you create it? (add '+nameList[i].toString()+' : '+getFQN(tDef)+')'));
                        }
                    }
                } else {
                    done(new Error('You cannot name a node instance "*" (add '+nameList[i].toString()+' : '+getFQN(tDef)+')'));
                }
            }

            // create proper entity according to the type
            if (Kotlin.isType(tDef, kevoree.NodeType)) {
                for (var i in nameList) {
                    nameList[i].expect(1, 3, function (err, namespace, parentName, childName) {
                        if (err) {
                            err.message += ' (add '+nameList[i].toString()+' : '+getFQN(tDef)+')';
                            done(err);
                            return;
                        }

                        if (namespace) {
                            // TODO handle namespaces
                            done(new Error('Namespaces are not handled yet'));
                        } else {
                            if (parentName) {
                                if (parentName === '*') {
                                    // parentName can't be '*' because each node name must be unique within a model so you can't
                                    // duplicate the same childName on each parentNode
                                    done(new Error('You can not refer to all node instances with \'*\' when adding child node instances. (add '+nameList[i].toString()+' : '+getFQN(tDef)+')'));
                                } else {
                                    var parentNode = model.findNodesByID(parentName);
                                    if (parentNode) {
                                        addNodeInstance(namespace, childName, parentNode);

                                    } else {
                                        done(new Error('Unable to find parent node instance "'+parentName+'" in model. Did you create it? (add '+nameList[i].toString()+' : '+getFQN(tDef)+')'));
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
                            done(err);
                            return;
                        }

                        if (instanceName !== '*') {
                            var group = factory.createGroup();
                            group.name = instanceName;
                            group.typeDefinition = model.findByPath(tDef.path());
                            group.started = true;
                            inflateDictionary(group);
                            model.addGroups(group);

                            if (namespace) {
                                if (opts.namespaces[namespace]) {
                                    opts.namespaces[namespace][instanceName] = group;
                                } else {
                                    done(new Error('Unable to find "'+namespace+'" namespace. Did you create it? (add '+nameList[i].toString()+' : '+getFQN(tDef)+')'));
                                }
                            }
                        } else {
                            done(new Error('You cannot name a node instance "*" (add '+nameList[i].toString()+' : '+getFQN(tDef)+')'));
                        }
                    });
                }

            } else if (Kotlin.isType(tDef, kevoree.ChannelType)) {
                for (var i in nameList) {
                    nameList[i].expect(1, 2, function (err, namespace, instanceName) {
                        if (err) {
                            err.message += ' (add '+nameList[i].toString()+' : '+getFQN(tDef)+')';
                            done(err);
                            return;
                        }

                        if (instanceName !== '*') {
                            var chan = factory.createChannel();
                            chan.name = instanceName;
                            chan.typeDefinition = model.findByPath(tDef.path());
                            chan.started = true;
                            inflateDictionary(chan);
                            model.addHubs(chan);

                            if (namespace) {
                                if (opts.namespaces[namespace]) {
                                    opts.namespaces[namespace][instanceName] = chan;
                                } else {
                                    done(new Error('Unable to find "'+namespace+'" namespace. Did you create it? (add '+nameList[i].toString()+' : '+getFQN(tDef)+')'));
                                }
                            }
                        } else {
                            done(new Error('You cannot name a node instance "*" (add '+nameList[i].toString()+' : '+getFQN(tDef)+')'));
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
                            done(new Error('Namespaces are not handled yet :/ Sorry'));

                        } else if (compName === '*') {
                            done(new Error('You cannot name a component instance "*" (add '+nameList[i].toString()+' : '+getFQN(tDef)+')'));

                        } else {
                            var comp;
                            if (nodeName === '*') {
                                // add compName instance to all nodes in the model
                                var nodes = model.nodes.iterator();
                                while (nodes.hasNext()) {
                                    comp = factory.createComponentInstance();
                                    comp.name = compName;
                                    comp.typeDefinition = model.findByPath(tDef.path());;
                                    comp.started = true;
                                    inflateDictionary(comp);
                                    nodes.next().addComponents(comp);
                                }

                            } else {
                                var node = model.findNodesByID(nodeName);
                                if (node) {
                                    comp = factory.createComponentInstance();
                                    comp.name = compName;
                                    comp.typeDefinition = model.findByPath(tDef.path());;
                                    comp.started = true;
                                    inflateDictionary(comp);
                                    node.addComponents(comp);

                                } else {
                                    done(new Error('Unable to find container node "'+nodeName+'" in current model (add '+nameList[i].toString()+' : '+getFQN(tDef)+')'));
                                }
                            }
                        }
                    });
                }

            } else {
                done(new Error('TypeDefinition "'+tDef.name+'/'+tDef.version+'" doesn\'t exist in current model. (Maybe you should add an "include" for it?)'));
                return;
            }
            done();
        }
    });
};