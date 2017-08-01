const fs = require('fs');

function promisifyWriteFile(path, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, 'utf-8', (err) => err ? reject(err) : resolve());
  });
}

module.exports = promisifyWriteFile;
