var fs = require('fs');
var path = require('path');
var kevoree = require('kevoree-library');

module.exports = function readModel(modelFile) {
	var factory = new kevoree.factory.DefaultKevoreeFactory();
	var loader = factory.createJSONLoader();
	var modelPath = path.join('test', 'fixtures', 'model', modelFile);
	var modelStr = fs.readFileSync(modelPath, { encoding: 'utf8' });
	return loader.loadModelFromString(modelStr).get(0);
};
