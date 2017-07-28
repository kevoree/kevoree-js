const config = require('tiny-conf');
const kConst = require('kevoree-const');
require('tiny-conf-plugin-file')(config, kConst.CONFIG_PATH);
require('tiny-conf-plugin-argv')(config);

config.set('node.name', 'node0');

module.exports = config;
