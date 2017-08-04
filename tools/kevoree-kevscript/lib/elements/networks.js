function networks(model) {
  let str = '';

  const nodes = model.nodes.iterator();
  while (nodes.hasNext()) {
    const node = nodes.next();
    const nets = node.networkInformation.iterator();
    while (nets.hasNext()) {
      const net = nets.next();
      const values = net.values.iterator();
      while (values.hasNext()) {
        const val = values.next();
        if (str.length !== 0) {
          str += '\n';
        }

        str += 'network ' + node.name + '.' + net.name + '.' + val.name + ' ' + val.value;
      }
    }
  }

  return str;
}

module.exports = networks;
