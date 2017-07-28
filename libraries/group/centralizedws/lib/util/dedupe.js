module.exports = function dedupe(arr) {
	var obj = {};
	var deduped = [];
	for (var i = 0; i < arr.length; i++) {
		obj[arr[i]] = true;
	}
	for (var key in obj) {
		deduped.push(key);
	}
	return deduped;
};
