function attaches(model) {
  const grps = model.groups.iterator();

  let str = '';
  while (grps.hasNext()) {
    const grp = grps.next();
    if (grp.subNodes.size() > 0) {
      if (str.length !== 0) {
        str += '\n';
      }

      str += 'attach ';

      const subNodes = grp.subNodes.iterator();
      while (subNodes.hasNext()) {
        const subNode = subNodes.next();
        str += subNode.name;
        if (subNodes.hasNext()) {
          str += ', ';
        }
      }

      str += ' ' + grp.name;
    }
  }

  return str;
}

module.exports = attaches;
