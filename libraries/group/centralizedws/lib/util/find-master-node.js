module.exports = function findMasterNode(group) {
	if (group) {
		for (var i=0; i < group.fragmentDictionary.array.length; i++) {
			var fDic = group.fragmentDictionary.array[i];
			var isMaster = fDic.findValuesByID('isMaster');
			if (isMaster && isMaster.value === 'true') {
				return group.findSubNodesByID(fDic.name);
			}
		}
	}
	return null;
};
