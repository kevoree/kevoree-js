var fs = require('fs');
var mkdirp = require('mkdirp');

module.exports = {
	readFile: function promisifiedReadFile(path, encoding) {
		return new Promise(function (resolve, reject) {
			fs.readFile(path, encoding, function (err, data) {
				if (err) {
					reject(err);
				} else {
					resolve(data);
				}
			});
		});
	},

	writeFile: function promisifiedWriteFile(path, data, encoding) {
		return new Promise(function (resolve, reject) {
			fs.writeFile(path, data, encoding, function (err) {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
	},

	mkdirp: function promisifiedMkdir(path) {
		return new Promise(function (resolve, reject) {
			mkdirp(path, function (err) {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
	}
};
