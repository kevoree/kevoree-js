module.exports = function shrink(str, length) {
	if (str && typeof str === 'string') {
		if (str.length > length) {
			return str.substr(0, length - 3) + '...';
		} else {
			return str.substr(0, length);
		}
	}
	return str;
};
