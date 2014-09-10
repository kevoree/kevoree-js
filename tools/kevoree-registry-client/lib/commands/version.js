// Created by leiko on 10/09/14 14:17
var pkg = require('../../package.json');

function version(argv, callback) {
    process.stdout.write(pkg.version+'\n');
    callback(null);
}

module.exports = version;