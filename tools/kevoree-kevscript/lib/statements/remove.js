var kevoree = require('kevoree-library').org.kevoree;
var Kotlin = require('kevoree-kotlin');
var factory = kevoree.factory.DefaultKevoreeFactory();
var helper = require('../model-helper');

module.exports = function (model, statements, stmt, opts, cb) {
    var nameList = statements[stmt.children[0].type](model, statements, stmt.children[0], opts, cb);

    function doRemove1(nodeName, third) {
        var node = model.findNodesByID(nodeName);
        if (node) {
            if (third === '*') {
                // remove all components within this node
                var compz = node.components.iterator();
                while (compz.hasNext()) doRemove(compz.next());

            } else {
                var comp = node.findComponentsByID(third);
                if (comp) {
                    doRemove(comp);
                } else {
                    return cb(new Error('Unable to find component instance "'+third+'" in node instance "'+nodeName+'" in model (remove '+nameList.toString()+')'));
                }
            }
        } else {
            return cb(new Error('Unable to find node instance "'+nodeName+'" in model (remove '+nameList.toString()+')'));
        }
    }

    function doRemove(instance) {
        if (Kotlin.isType(instance, kevoree.ContainerNode)) {
            // remove groups fragment dictionary related to this node
            var groups = model.groups.iterator();
            while (groups.hasNext()) {
                var grp = groups.next();
                var dic = grp.findFragmentDictionaryByID(instance.name);
                if (dic) grp.removeFragmentDictionary(dic);
            }

            // remove channels fragment dictionary related to this node
            var hubs = model.hubs.iterator();
            while (hubs.hasNext()) {
                var hub = hubs.next();
                var dic = hub.findFragmentDictionaryByID(instance.name);
                if (dic) hub.removeFragmentDictionary(dic);
            }

            // remove bindings related to this node
            var comps = instance.components.iterator();
            while (comps.hasNext()) {
                var comp = comps.next();
                var provided = comp.provided.iterator();
                while (provided.hasNext()) {
                    var pPort = provided.next();
                    var bindings = pPort.bindings.iterator();
                    while (bindings.hasNext()) {
                        var binding = bindings.next();
                        binding.hub.removeBindings(binding);
                        model.removeMBindings(binding);
                    }
                }
                var required = comp.required.iterator();
                while (required.hasNext()) {
                    var rPort = required.next();
                    var bindings = rPort.bindings.iterator();
                    while (bindings.hasNext()) {
                        var binding = bindings.next();
                        binding.hub.removeBindings(binding);
                        model.removeMBindings(binding);
                    }
                }
            }

            // delete links with groups
            var groups = instance.groups.iterator();
            while (groups.hasNext()) groups.next().removeSubNodes(instance);

            // remove node itself
            if (instance.host) instance.host.removeHosts(instance);
            model.removeNodes(instance);

        } else if (Kotlin.isType(instance, kevoree.Group)) {
            // remove link between this group and nodes
            var nodes = instance.subNodes.iterator();
            while (nodes.hasNext()) nodes.next().removeGroups(instance);
            // remove group
            model.removeGroups(instance);

        } else if (Kotlin.isType(instance, kevoree.Channel)) {
            var bindings = model.mBindings.iterator();
            while (bindings.hasNext()) {
                var binding = bindings.next();
                if (binding.hub.name === instance.name) {
                    if (binding.port) binding.port.removeBindings(binding);
                    if (binding.hub)  binding.hub.removeBindings(binding);
                    model.removeMBindings(binding);
                }
            }
            model.removeHubs(instance);

        } else if (Kotlin.isType(instance, kevoree.ComponentInstance)) {
            function deleteBindings(ports) {
                while (ports.hasNext()) {
                    var bindings = ports.next().bindings.iterator();
                    while (bindings.hasNext()) {
                        var binding = bindings.next();
                        if (binding.port) binding.port.removeBindings(binding);
                        if (binding.hub)  binding.hub.removeBindings(binding);
                        model.removeMBindings(binding);
                    }
                }
            }

            deleteBindings(instance.provided.iterator());
            deleteBindings(instance.required.iterator());
            instance.eContainer().removeComponents(instance);

        } else {
            return cb(new Error('Unable to remove instance "'+names[i]+'" from current model. (Are you sure it is a node, group, chan, component?)'));
        }
    }

    for (var i in nameList) {
        nameList[i].expect(1, 3, function (err, first, second, third) {
            if (err) {
                err.message = ' (remove '+nameList.toString()+')';
                return cb(err);
            }

            if (first) {
                // TODO there is at least 3 parts in path so it must refer to a namespace 'first.second.third'
                return cb(new Error('Namespaces are not handled yet :/ Sorry (remove '+nameList.toString()+')'));

            } else {
                if (second) {
                    // two parts path: 'second.third'
                    if (second === '*') {
                        var nodes = model.nodes.iterator();
                        while (nodes.hasNext()) doRemove1(nodes.next().name, third);
                    } else {
                        doRemove1(second, third);
                    }
                } else {
                    // one part path: 'third'
                    if (third === '*') {
                        var nodes = model.nodes.iterator();
                        var groups = model.groups.iterator();
                        var hubs = model.hubs.iterator();

                        while (nodes.hasNext())  doRemove(nodes.next());
                        while (groups.hasNext()) doRemove(groups.next());
                        while (hubs.hasNext())   doRemove(hubs.next());

                    } else {
                        var instance = helper.findEntityByName(model, third);
                        if (instance)
                            doRemove(instance);
                        else
                            return cb(new Error('Unable to find instance "'+third+'" in model (remove '+nameList.toString()+')'));
                    }
                }
            }
        });
    }

    var names = [];

    if (stmt.children[0].type == 'nameList') {
        for (var i in stmt.children[0].children) {
            names.push(stmt.children[0].children[i].children.join(''));
        }
    } else {
        names.push(stmt.children[0].children.join(''));
    }

    for (var i in names) {
        var entity = helper.findEntityByName(model, names[i]);
        if (entity != null) {
            if (Kotlin.isType(entity, kevoree.ContainerNode)) {
                var groups = (model.groups) ? model.groups.iterator() : null;
                if (groups != null) {
                    while (groups.hasNext()) {
                        var group = groups.next();
                        var subNodes = group.subNodes.iterator();
                        while (subNodes.hasNext()) {
                            if (subNodes.next().name == entity.name) group.removeSubNodes(entity);
                        }
                        var values = group.dictionary.values.iterator();
                        while (values.hasNext()) {
                            var val = values.next();
                            if (val.targetNode.name == entity.name) group.dictionary.removeValues(val);
                        }
                    }
                }
                model.removeNodes(entity);

            } else if (Kotlin.isType(entity, kevoree.Group)) {
                model.removeGroups(entity);
            } else if (Kotlin.isType(entity, kevoree.Channel)) {
                model.removeHubs(entity);
            } else if (Kotlin.isType(entity, kevoree.ComponentInstance)) {
                entity.eContainer().removeComponents(entity);
            } else {
                return cb(new Error('Unable to remove instance "'+names[i]+'" from current model. (Are you sure it is a node, group, chan, component?)'));
            }
        }
    }

    cb();
};