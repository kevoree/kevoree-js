var getFQN = require('../getFQN');

/**
 * Created by leiko on 10/04/14.
 */
module.exports = function (model) {
    var str = '';

    function process(elems) {
        var map = {};
        while (elems.hasNext()) {
            var elem = elems.next();
            var fqn = getFQN(elem.typeDefinition);
            var list = map[fqn] || [];
            list.push(elem.name);
            map[fqn] = list;
        }

        for (var tdef in map) {
            if (map.hasOwnProperty(tdef)) {
                if (str.length !== 0) {
                    str += '\n';
                }
                str += 'add '+map[tdef].join(', ')+' : '+tdef;
            }
        }
    }

    function processRootNodes(elems) {
        var map = {};
        while (elems.hasNext()) {
            var elem = elems.next();
            var fqn = getFQN(elem.typeDefinition);
            var list = map[fqn] || [];

            if (!elem.host) {
                list.push(elem.name);
            }

            map[fqn] = list;
        }

        for (var tdef in map) {
            if (map.hasOwnProperty(tdef)) {
                if (map[tdef].length > 0) {
                    if (str.length !== 0) {
                        str += '\n';
                    }
                    str += 'add '+map[tdef].join(', ')+' : '+tdef;
                }
            }
        }
    }

    function processHostedNodesAndComps(elems) {
        var compsMap = {};
        var subnodesMap = {};
        var list;
        while (elems.hasNext()) {
            var elem = elems.next(), fqn;

            if (elem.host) {
                // elem is a subNode
                fqn = getFQN(elem.typeDefinition);
                list = subnodesMap[fqn] || [];
                list.push(elem.host.name+'.'+elem.name);
                subnodesMap[fqn] = list;
            }

            var comps = elem.components.iterator();
            while (comps.hasNext()) {
                var comp = comps.next();
                fqn = getFQN(comp.typeDefinition);
                list = compsMap[fqn] || [];
                list.push(elem.name+'.'+comp.name);
                compsMap[fqn] = list;
            }
        }

        var tdef;
        for (tdef in compsMap) {
            if (compsMap.hasOwnProperty(tdef)) {
                if (compsMap[tdef].length > 0) {
                    if (str.length !== 0) {
                        str += '\n';
                    }
                    str += 'add '+compsMap[tdef].join(', ')+' : '+tdef;
                }
            }
        }

        for (tdef in subnodesMap) {
            if (subnodesMap.hasOwnProperty(tdef)) {
                if (subnodesMap[tdef].length > 0) {
                    if (str.length !== 0) {
                        str += '\n';
                    }
                    str += 'add '+subnodesMap[tdef].join(', ')+' : '+tdef;
                }
            }
        }
    }

    processRootNodes(model.nodes.iterator());
    processHostedNodesAndComps(model.nodes.iterator());
    process(model.groups.iterator());
    process(model.hubs.iterator());

    return str;
};