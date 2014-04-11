/**
 * Created by leiko on 10/04/14.
 */
function lexValue(value) {
    if (value) {
        var escaped = false;
        for (var i=0; i < value.length; i++) {
            if (value[i] === '"' && !escaped) {
                return '\''+value+'\'';
            }

            if (value[i] === '\'' && !escaped) {
                return '"'+value+'"';
            }

            escaped = (value[i] === '\\');
        }
        return '\''+value+'\'';
    } else {
        return '\'\'';
    }
}

module.exports = function (model) {
    var str = '';

    function processDictionary(instanceName, values, fragName) {
        while (values.hasNext()) {
            var val = values.next();
            if (str.length !== 0) {
                str += '\n';
            }

            if (fragName) {
                str += 'set '+instanceName+'.'+val.name+'/'+fragName+' = '+lexValue(val.value);
            } else {
                str += 'set '+instanceName+'.'+val.name+' = '+lexValue(val.value);
            }
        }
    }

    function processInstance(instance) {
        if (instance.dictionary) {
            processDictionary(instance.name, instance.dictionary.values.iterator());
        }

        var fDics = instance.fragmentDictionary.iterator();
        while (fDics.hasNext()) {
            var dic = fDics.next();
            if (dic) {
                processDictionary(instance.name, dic.values.iterator(), dic.name);
            }
        }
    }

    var nodes = model.nodes.iterator();
    while (nodes.hasNext()) {
        var node = nodes.next();
        processInstance(node);

        var subNodes = node.hosts.iterator();
        while (subNodes.hasNext()) {
            processInstance(subNodes.next());
        }

        var comps = node.components.iterator();
        while (comps.hasNext()) {
            processInstance(comps.next());
        }
    }

    var groups = model.groups.iterator();
    while (groups.hasNext()) {
        processInstance(groups.next());
    }

    var hubs = model.hubs.iterator();
    while (hubs.hasNext()) {
        processInstance(hubs.next());
    }

    return str;
};