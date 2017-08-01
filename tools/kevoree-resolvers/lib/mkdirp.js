const mkdirp = require('mkdirp');

function promisifyMkdirp(path) {
  return new Promise((resolve, reject) => {
    mkdirp(path, (err) => err ? reject(err) : resolve());
  });
}

module.exports = promisifyMkdirp;
