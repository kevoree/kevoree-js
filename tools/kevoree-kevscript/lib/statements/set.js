var kevoree = require('kevoree-library').org.kevoree;
var factory = new kevoree.impl.DefaultKevoreeFactory();
var helper  = require('../model-helper');

module.exports = function (model, statements, stmt, opts, cb) {
    var attr  = null,
        node  = null,
        value = null;

    function processAttribute(dic, attrName) {
        var dicValue = dic.findValuesByID(attrName);
        if (dicValue) {
            // update value
            dicValue.value = value;
        } else {
            // dictionary value for attribute named attrName does not exist yet: create it and add it if possible
            var attrs = dic.eContainer().typeDefinition.dictionaryType.attributes.iterator();
            while (attrs.hasNext()) {
                // by doing this, we will kinda fail silently if you are trying to set an inexisting
                // attribute value in one of the instances
                if (attrs.next().name === attrName) {
                    dicValue = factory.createDictionaryValue();
                    dicValue.name = attrName;
                    dicValue.value = value;
                    dic.addValues(dicValue);
                    break;
                }
            }
        }
    }

    function processNodeAndHostsAttribute(node, hostName, attrName) {
        if (hostName === '*') {
            var comps = node.components.iterator();
            while (comps.hasNext()) processInstanceAttribute(comps.next(), attrName);

        } else {
            var host = node.findComponentsByID(hostName);
            if (!host) {
                host = node.findHostsByID(hostName);
                if (!host) {
                    return cb(new Error('Unable to find instance "'+hostName+'" in "'+node.name+'" model (set '+attr.toString()+' = "'+value+'")'));
                }
            }
            processInstanceAttribute(host, attrName);
        }
    }

    function processInstanceAttribute(instance, attrName) {
        if (node) {
            // fragment dependant attribute
            var dic = instance.findFragmentDictionaryByID(node.toString());
            if (!dic) {
                // there is no fragmentDependant dictionary for this instance and fragment yet: create one
                dic = factory.createFragmentDictionary();
                dic.name = node.toString();
                instance.addFragmentDictionary(dic);
            }
            processAttribute(dic, attrName);

        } else {
            // non-fragment dependant attribute
            if (!instance.dictionary) instance.dictionary = factory.createDictionary();
            processAttribute(instance.dictionary, attrName);
        }
    }

    if (stmt.children.length === 2) {
        // set statement looks like: set an.instance.path = 'aValue'
        attr  = statements[stmt.children[0].type](model, statements, stmt.children[0], opts, cb);
        value = statements[stmt.children[1].type](model, statements, stmt.children[1], opts, cb);

        attr.expect(2, 4, function (err, ns, two, three, four) {
            if (err) {
                err.message += ' (set '+attr.toString()+' = "'+value+'")';
                return cb(err);
            }

            if (ns) {
                // TODO
                return cb(new Error('Namespaces are not handled yet :/ Sorry (set '+attr.toString()+' = "'+value+'")'));

            } else {
                if (two) {
                    // statement looks like foo.bar.baz = '42'
                    if (two === '*') {
                        // TODO handle namespaces too when using '*' ?
                        var nodes = model.nodes.iterator();
                        while (nodes.hasNext()) processNodeAndHostsAttribute(nodes.next(), three, four);

                    } else {
                        // check whether "two" is a namespace or a node name
                        var nodeInstance = model.findNodesByID(two);
                        if (nodeInstance) {
                            processNodeAndHostsAttribute(nodeInstance, three, four);

                        } else {
                            // TODO
                            return cb(new Error('Namespaces are not handled yet :/ Sorry (set '+attr.toString()+' = "'+value+'")'));
                        }
                    }

                } else {
                    // statement looks like foo.bar = '42'
                    var instance = helper.findEntityByName(model, three);
                    if (instance) {
                        processInstanceAttribute(instance, four);

                    } else {
                        return cb(new Error('Unable to find instance "'+two+'" in model (set '+attr.toString()+' = "'+value+'")'));
                    }
                }
            }
        });

    } else if (stmt.children.length === 3) {
        // set statement looks like: set an.instance.path/aNode = 'aValue'
        attr  = statements[stmt.children[0].type](model, statements, stmt.children[0], opts, cb);
        node  = statements[stmt.children[1].type](model, statements, stmt.children[1], opts, cb);
        value = statements[stmt.children[2].type](model, statements, stmt.children[2], opts, cb);

        attr.expect(2, 3, function (err, ns, instanceName, attrName) {
            if (err) {
                err.message += ' (set '+attr.toString()+'/'+node.toString()+' = "'+value+'")';
                return cb(err);
            }

            if (ns) {
                // TODO
                return cb(new Error('Namespaces are not handled yet :/ Sorry (set '+attr.toString()+'/'+node.toString()+' = "'+value+'")'));

            } else {
                if (instanceName === '*') {
                    var groups = model.groups.iterator();
                    while (groups.hasNext()) processInstanceAttribute(groups.next(), attrName);
                    var hubs = model.hubs.iterator();
                    while (hubs.hasNext()) processInstanceAttribute(hubs.next(), attrName);

                } else {
                    // instance is whether a group or a channel
                    var groups = model.groups.iterator();
                    while (groups.hasNext()) {
                        var grp = groups.next();
                        if (grp.name === instanceName) {
                            return processInstanceAttribute(grp, attrName);
                        }
                    }

                    var chans = model.hubs.iterator();
                    while (chans.hasNext()) {
                        var hub = chans.next();
                        if (hub.name === instanceName) {
                            return processInstanceAttribute(hub, attrName);
                        }
                    }
                }
            }
        });
    }

    cb();
}