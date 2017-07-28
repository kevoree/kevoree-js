const fs = require('fs');
const path = require('path');
const kevoree = require('kevoree-library');

const factory = new kevoree.factory.DefaultKevoreeFactory();
const loader = factory.createJSONLoader();

module.exports = (modelFile) => {
	const p = path.join('test', 'fixtures', 'model', modelFile);
	const modelStr = fs.readFileSync(p, { encoding: 'utf8' });
	return loader.loadModelFromString(modelStr).get(0);
};
