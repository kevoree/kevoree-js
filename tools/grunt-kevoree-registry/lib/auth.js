const api = require('kevoree-registry-client');
const inquirer = require('inquirer');
const config = require('tiny-conf');

function askPassword(grunt) {
	const password = config.get('user.password');
	if (password) {
		return Promise.resolve();
	} else {
		grunt.log.ok('Login:    ' + config.get('user.login').blue);
		return inquirer.prompt([
			{
				type: 'password',
				name: 'password',
				message: 'Password',
				validate: (val) => val.length > 0
			}
		]).then((answers) => {
			config.set('user.password', answers.password);
		});
	}
}

function doAuth(grunt) {
	return api.auth.login()
		.then(() => {
			grunt.log.ok('Auth ok');
		})
		.catch((err) => {
			config.set('user.password', undefined);
			grunt.log.error(err.message || 'Authentication failed');
			throw err;
		});
}

function auth(grunt) {
	if (config.get('user.password')) {
		return doAuth(grunt);
	} else {
		return askPassword(grunt)
			.then(() => doAuth(grunt));
	}
}

module.exports = auth;
