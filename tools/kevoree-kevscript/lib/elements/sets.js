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

    function processDictionary(instanceName, values, fragName, dicType) {
        while (values.hasNext()) {
            var val = values.next();
            var attr = dicType.findAttributesByID(val.name);
            if (attr.defaultValue !== val.value) {
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
    }

    function processInstance(instance, host) {
        var instanceName = (host) ? (host+'.'+instance.name) : (instance.name);

        if (instance.dictionary) {
            processDictionary(instanceName, instance.dictionary.values.iterator(), null, instance.typeDefinition.dictionaryType);
        }

        var fDics = instance.fragmentDictionary.iterator();
        while (fDics.hasNext()) {
            var dic = fDics.next();
            if (dic) {
                processDictionary(instanceName, dic.values.iterator(), dic.name, instance.typeDefinition.dictionaryType);
            }
        }
    }

    var nodes = model.nodes.iterator();
    while (nodes.hasNext()) {
        var node = nodes.next();
        if (!node.host) {
            // only process nodes that are not hosted (hosted nodes will be processed as subNodes later)
            processInstance(node);
        }

        var subNodes = node.hosts.iterator();
        while (subNodes.hasNext()) {
            processInstance(subNodes.next(), node.name);
        }

        var comps = node.components.iterator();
        while (comps.hasNext()) {
            processInstance(comps.next(), node.name);
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