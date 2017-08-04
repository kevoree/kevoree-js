#!/usr/bin/env node

const spawn = require('cross-spawn');
const chalk = require('chalk');
const script = process.argv[2];
const args = process.argv.slice(3);

function noop() {}

switch (script) {
  case 'build':
  case 'start':
  case 'publish':
  case 'test':
    {
      ['SIGINT', 'SIGTERM'].forEach((sig) => {
        process.on(sig, noop);
      });
      const result = spawn(
        'node',
        [require.resolve('../scripts/' + script)].concat(args),
        { stdio: 'inherit' }
      );
      result.on('close', (code) => {
        process.exit(code);
      });
      break;
    }

  default:
    console.log(chalk.yellow('Unknown script "' + script + '".'));
    console.log('Perhaps you need to update kevoree-scripts?');
    break;
}
