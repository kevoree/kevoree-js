'use strict';

const path = require('path');
const async = require('async');
const chalk = require('chalk');
const os = require('os');
const ora = require('ora');
const readline = require('readline');

module.exports = function (grunt) {
	const spinner = ora();

	function log(txt) {
		spinner.text = txt;
	}

	function newLog(txt) {
		readline.clearLine(process.stdout);
		readline.cursorTo(process.stdout, 0);
		grunt.log.writeln(txt);
	}

	grunt.registerMultiTask('exec', 'Exec the given command in the specified src directories', function () {
		const done = this.async();

		const options = this.options({
			cmd: null,
			args: []
		});

		if (!options.cmd || !options.cmd.trim().length) {
			grunt.fail.fatal(new Error('options.cmd must be set (current: ' + options.cmd + ')'));
		} else {
			let cmd = options.cmd;
			const args = options.args;
			if (/^win/.test(process.platform)) {
				cmd = process.env.comspec;
				args.unshift(options.cmd);
				args.unshift('/c');
			}

			grunt.log.ok('Executing: ' + chalk.gray(options.cmd + ' ' + args.join(' ')));

			spinner.start();
			async.parallelLimit(this.filesSrc.filter(function (path) {
				return grunt.file.isDir(path);
			}).map(function (projectPath) {
				return function (cb) {
					let relPath = path.relative(__dirname, projectPath);
					log(chalk.cyan(relPath) + ' running...');
					grunt.util.spawn({
						cmd: cmd,
						args: args,
						opts: {
							cwd: projectPath,
							stdio: ['ignore', 'pipe', 'pipe']
						}
					}, function (err, result) {
						if (err) {
							const stdLogs = `.exec-logs/${options.cmd}/${args.join('_')}/${relPath.replace(/\//g, '-')}`;
							newLog(chalk.red('✘') + ' ' + chalk.cyan(relPath) + ' ' + chalk.grey('(' + stdLogs + ')'));
							const now = Date.now();
							grunt.file.write(`${stdLogs}/stdout.${now}.log`, result.stdout);
							grunt.file.write(`${stdLogs}/stderr.${now}.log`, result.stderr);
							cb();
						} else {
							newLog(chalk.green('✔') + ' ' + chalk.cyan(relPath));
							cb();
						}
					});
				};
			}), os.cpus().length, function (err) {
				spinner.stop();
				done(err);
			});
		}
	});
};
