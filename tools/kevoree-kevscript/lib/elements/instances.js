/**
 * Created by leiko on 10/04/14.
 */
module.exports = function (model) {
    var str = '';

    function process(elems) {
        var map = {};
        while (elems.hasNext()) {
            var elem = elems.next();
            var list = map[elem.typeDefinition.name] || [];
            list.push(elem.name);
            map[elem.typeDefinition.name] = list;
        }

        for (var tdef in map) {
            if (str.length !== 0) {
                str += '\n';
            }
            str += 'add '+map[tdef].join(', ')+' : '+tdef;
        }
    }

    function processRootNodes(elems) {
        var map = {};
        while (elems.hasNext()) {
            var elem = elems.next();
            var list = map[elem.typeDefinition.name] || [];

            if (!elem.host) {
                list.push(elem.name);
            }

            map[elem.typeDefinition.name] = list;
        }

        for (var tdef in map) {
            if (map[tdef].length > 0) {
                if (str.length !== 0) {
                    str += '\n';
                }
                str += 'add '+map[tdef].join(', ')+' : '+tdef;
            }
        }
    }

    function processHostedNodesAndComps(elems) {
        var compsMap = {};
        while (elems.hasNext()) {
            var elem = elems.next();

            if (elem.host) {
                if (str.length !== 0) {
                    str += '\n';
                }
                str += 'add '+elem.host.name+'.'+elem.name+' : '+elem.typeDefinition.name;
            } else {
                var comps = elem.components.iterator();
                while (comps.hasNext()) {
                    var comp = comps.next();
                    var list = compsMap[comp.typeDefinition.name] || [];
                    list.push(elem.name+'.'+comp.name);
                    compsMap[comp.typeDefinition.name] = list;
                }
            }
        }

        for (var tdef in compsMap) {
            if (compsMap[tdef].length > 0) {
                if (str.length !== 0) {
                    str += '\n';
                }
                str += 'add '+compsMap[tdef].join(', ')+' : '+tdef;
            }
        }
    }

    processRootNodes(model.nodes.iterator());
    processHostedNodesAndComps(model.nodes.iterator());
    process(model.groups.iterator());
    process(model.hubs.iterator());

    return str;
};