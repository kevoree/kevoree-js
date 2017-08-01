const fs = require('fs');

function promisifyReadFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => err ? reject(err) : resolve(data));
  });
}

module.exports = promisifyReadFile;
