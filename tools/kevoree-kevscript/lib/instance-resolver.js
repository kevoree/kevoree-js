/**
 * Created by leiko on 19/06/14.
 */
module.exports.resolve = function resolve(model, stmt) {
    var instances, i, nodes;

    switch (stmt.type) {
        case 'instancePath':
            var children = [];
            for (i=0; i < stmt.children.length; i++) {
                children.push(stmt.children[i].children.join(''));
            }
            if (children.length < 3) {
                if (children.length === 2) {
                    // instance path with two segments => components or subnodes
                    nodes = [];
                    var subs = [];
                    if (children[0] === '*') {
                        var kNodes = model.nodes.iterator();
                        while (kNodes.hasNext()) {
                            nodes.push(kNodes.next());
                        }
                    } else {
                        var kNode = model.findNodesByID(children[0]);
                        if (kNode) {
                            nodes.push(kNode);
                        }
                    }

                    if (nodes.length > 0) {
                        for (i=0; i < nodes.length; i++) {
                            var comps = nodes[i].components.iterator();
                            while (comps.hasNext()) {
                                subs.push(comps.next());
                            }
                            var hosts = nodes[i].hosts.iterator();
                            while (hosts.hasNext()) {
                                subs.push(hosts.next());
                            }
                        }

                        if (subs.length > 0) {
                            return subs;
                        } else {
                            throw new Error('Unable to find '+children[1]+' in '+children[0]);
                        }
                    } else {
                        throw new Error('Unable to find node '+children[0]);
                    }
                } else {
                    // instance path with one segment
                    instances = [];
                    if (children[0] === '*') {
                        nodes = model.nodes.iterator();
                        while (nodes.hasNext()) {
                            instances.push(nodes.next());
                        }
                        var groups = model.groups.iterator();
                        while (groups.hasNext()) {
                            instances.push(groups.next());
                        }
                        var hubs = model.hubs.iterator();
                        while (hubs.hasNext()) {
                            instances.push(hubs.next());
                        }

                    } else {
                        var instance = model.findNodesByID(children[0]);
                        if (!instance) {
                            instance = model.findGroupsByID(children[0]);
                        }
                        if (!instance) {
                            instance = model.findHubsByID(children[0]);
                        }
                        if (instance) {
                            instances.push(instance);
                        }
                    }

                    if (instances.length > 0) {
                        return instances;
                    } else {
                        throw new Error('Unable to find instance '+children[0]);
                    }
                }
            } else {
                throw new Error('Namespaces are not implemented yet ('+children.join('.')+')');
            }
            break;

        case 'nameList':
            instances = [];
            for (i=0; i < stmt.children.length; i++) {
                var resolved = resolve(model, stmt.children[i]);
                for (var j=0; j < resolved.length; j++) {
                    instances.push(resolved[j]);
                }
            }
            return instances;

        default:
            throw new Error('Unknown statement type '+stmt.type);
    }
};