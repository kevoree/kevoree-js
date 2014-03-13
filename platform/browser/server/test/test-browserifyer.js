var browserifyer = require('../lib/browserifyer');
var path = require('path');

var name = 'kevoree-comp-fakeconsole';

var options = {
	installDir: path.resolve(__dirname, 'installDir'),
	npmInstallDir: path.resolve(__dirname, '..', 'node_modules'),
	external: {
		'kevoree-library': path.resolve(__dirname, '..', 'node_modules', 'kevoree-library')
	}
};

browserifyer(name, options, function (err, zip) {
	if (err) throw err;

	console.log('Done zip', zip.location);
});