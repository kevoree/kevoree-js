module.exports = function (model, statements, stmt, opts, cb) {
    var nameList = statements[stmt.children[0].type](model, statements, stmt.children[0], opts);
    var groupName = statements[stmt.children[1].type](model, statements, stmt.children[1], opts);

    if (groupName.raw.length === 1) {
        groupName = groupName.toString();
        var group = model.findGroupsByID(groupName);
        if (group) {
            for (var i=0; i < nameList.length; i++) {
                if (nameList[i].raw.length === 1) {
                    var nodeName = nameList[i].toString();
                    var node = model.findNodesByID(nodeName);
                    if (node) {
                        node.removeGroups(group);
                        group.removeSubNodes(node);
                    } else {
                        cb(new Error('Unable to find node instance "'+nodeName+'" '+printLine(nameList, groupName)));
                        break;
                    }
                } else {
                    cb(new Error('Namespaces are not implemented yet '+printLine(nameList, groupName)));
                }
            }
            cb();
        } else {
            cb(new Error('Unable to find group instance "'+groupName+'" '+printLine(nameList, groupName)));
        }
    } else {
        cb(new Error('Namespaces are not implemented yet '+printLine(nameList, groupName)));
    }
};

function printLine(nameList, groupName) {
    return '(detach '+display(nameList)+' '+groupName.toString()+')';
}

function display(nameList) {
    return nameList.map(function (instancePath) {
        return instancePath.toString();
    }).join(', ');
}