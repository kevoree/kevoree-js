const fs = require('fs');
const path = require('path');
const kevoree = require('kevoree-library');

module.exports = function readModel(modelFile) {
	const factory = new kevoree.factory.DefaultKevoreeFactory();
	const loader = factory.createJSONLoader();
	const modelPath = path.join('test', 'fixtures', 'model', modelFile);
	const modelStr = fs.readFileSync(modelPath, { encoding: 'utf8' });
	return loader.loadModelFromString(modelStr).get(0);
};
