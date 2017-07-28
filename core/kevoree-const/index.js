const path = require('path');

const userpath = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
const config = {};

config.GLOBAL_PATH = path.resolve(userpath, '.kevoree');
config.CONFIG_PATH = path.resolve(config.GLOBAL_PATH, 'config.json');
config.DUS_PATH    = path.resolve(config.GLOBAL_PATH, 'deploy_units');

module.exports = config;
