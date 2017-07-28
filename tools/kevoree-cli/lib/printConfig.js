const util = require('util');

module.exports = function printConfig(json) {
	const clonedJson = JSON.parse(JSON.stringify(json));
	console.log(util.inspect(clonedJson, {
		depth: null,
		colors: true
	}));
};
