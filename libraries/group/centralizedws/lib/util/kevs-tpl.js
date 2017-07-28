module.exports = function kevsTpl(kevs, groupName, nodeName) {
	return kevs
		.replace(/{nodeName}/g, nodeName)
		.replace(/{groupName}/g, groupName);
};
