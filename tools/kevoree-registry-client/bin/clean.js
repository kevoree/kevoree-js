const rimraf = require('rimraf');

rimraf('build', () => {
	console.log('build folder deleted'); // eslint-disable-line
});
