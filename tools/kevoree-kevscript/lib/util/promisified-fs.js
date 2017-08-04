const fs = require('fs');
const mkdirp = require('mkdirp');

module.exports = {
	readFile: function promisifiedReadFile(path, encoding) {
		return new Promise((resolve, reject) => {
			fs.readFile(path, encoding, (err, data) => {
				if (err) {
					reject(err);
				} else {
					resolve(data);
				}
			});
		});
	},

	writeFile: function promisifiedWriteFile(path, data, encoding) {
		return new Promise((resolve, reject) => {
			fs.writeFile(path, data, encoding, (err) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
	},

	mkdirp: function promisifiedMkdir(path) {
		return new Promise((resolve, reject) => {
			mkdirp(path, (err) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
	}
};
