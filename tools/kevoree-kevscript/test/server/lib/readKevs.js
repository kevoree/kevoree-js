const fs = require('fs');
const path = require('path');

module.exports = (kevsFile) => {
	const p = path.join('test', 'fixtures', 'kevs', kevsFile);
	return fs.readFileSync(p, { encoding: 'utf8' });
};
