module.exports = function findMasterNode(group) {
  if (group) {
    for (let i = 0; i < group.fragmentDictionary.array.length; i++) {
      const fDic = group.fragmentDictionary.array[i];
      const isMaster = fDic.findValuesByID('isMaster');
      if (isMaster && isMaster.value === 'true') {
        return group.findSubNodesByID(fDic.name);
      }
    }
  }
  return null;
};
