/**
 * Created by leiko on 10/04/14.
 */
module.exports = function (model) {
    var grps = model.groups.iterator();

    var str = '';
    while (grps.hasNext()) {
        var grp = grps.next();
        if (grp.subNodes.size() > 0) {
            if (str.length !== 0) {
                str += '\n';
            }

            str += 'attach ';

            var subNodes = grp.subNodes.iterator();
            while (subNodes.hasNext()) {
                var subNode = subNodes.next();
                str += subNode.name;
                if (subNodes.hasNext()) {
                    str += ', ';
                }
            }

            str += ' '+grp.name;
        }
    }

    return str;
};