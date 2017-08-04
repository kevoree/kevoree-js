module.exports = (group, masterNode) => {
  const nets = {};

  if (group) {
    const node = group.findSubNodesByID(masterNode.name);
    if (node) {
      node.networkInformation.array.forEach((net) => {
        nets[net.name] = {};
        net.values.array.forEach((val) => {
          nets[net.name][val.name] = val.value;
        });
      });
    }
  }

  return nets;
};
