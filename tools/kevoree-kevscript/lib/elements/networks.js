'use strict';

module.exports = function (model) {
  var str = '';

  var nodes = model.nodes.iterator();
  while (nodes.hasNext()) {
    var node = nodes.next();
    var nets = node.networkInformation.iterator();
    while (nets.hasNext()) {
      var net = nets.next();
      var values = net.values.iterator();
      while (values.hasNext()) {
        var val = values.next();
        if (str.length !== 0) {
          str += '\n';
        }

        str += 'network ' + node.name + '.' + net.name + '.' + val.name + ' ' + val.value;
      }
    }
  }

  return str;
};
