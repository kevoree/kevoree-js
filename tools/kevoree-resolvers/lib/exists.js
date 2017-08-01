'use strict';

const path = require('path');
const kHash = require('kevoree-hash');
const npa = require('npm-package-arg');
const readFile = require('./read-file');

/**
 * @param  {string}  moduleName         eg. kevoree-node-javascript@5.5.0 or /home/user/dev/libs/kevoree-node-javascript
 * @param  {string}  modulePath         eg. /home/user/.kevoree/deploy_units/kevoree-node-javascript/5.5.0
 * @param  {string}  hashcode           eg. 1c37d627771bf40f3563b8a28ad325d8
 * @param  {boolean} skipIntegrityCheck eg. false
 * @return {Promise}                    returns { exists: <boolean>, hashes: { local: <string>, model: <string> } }
 */
function exists(moduleName, modulePath, hashcode, skipIntegrityCheck) {
  const parsed = npa(moduleName);
  if (parsed.type === 'local') {
    // module name is a path
    return readFile(path.resolve(moduleName, 'package.json'))
      .then((data) => {
        const localPkg = JSON.parse(data);
        return readFile(path.resolve(modulePath, 'node_modules', localPkg.name, 'package.json'))
          .then((data2) => {
            const installedPkg = JSON.parse(data2);
            return {
              exists: localPkg.version === installedPkg.version,
            };
          });
      })
      .catch((err) => {
        if (err.code === 'ENOENT') {
          return { exists: false };
        } else {
          throw err;
        }
      });
  } else {
    // module name looks "normal"
    let pkgJsonPath = [modulePath, 'node_modules'].concat(parsed.name.split('/')). // just in case module name is scoped
    concat(['package.json']);
    // using resolve.apply() because pkgJsonPath is an array here
    pkgJsonPath = path.resolve.apply(null, pkgJsonPath);
    return readFile(pkgJsonPath)
      .then((data) => {
        let exists, hashes;
        const hash = kHash(path.join(pkgJsonPath, '..'));
        const pkg = JSON.parse(data);
        if (!skipIntegrityCheck) {
          if (hash === hashcode) {
            exists = true;
          } else {
            exists = true;
            hashes = {
              local: hash.substr(0, 8),
              model: hashcode.substr(0, 8)
            };
          }
        } else {
          if (pkg.version === parsed.spec) {
            exists = true;
          } else {
            exists = false;
          }
        }

        return { exists, hashes };
      })
      .catch((err) => {
        if (err.code === 'ENOENT') {
          return false;
        } else {
          throw err;
        }
      });
  }
}

module.exports = exists;
