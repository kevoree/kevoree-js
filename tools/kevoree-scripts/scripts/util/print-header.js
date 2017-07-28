const chalk = require('chalk');

function printHeader(msg, name, version) {
  let bar = '';
  for (let i = 0; i < ('# ' + msg + ' - ' + name + ' ' + version).length; i++) {
    bar += '=';
  }
  console.log('# ' + msg + ' - ' + chalk.cyan(name) + ' ' + chalk.yellow(version) + '\n' + bar);
}

module.exports = printHeader;
