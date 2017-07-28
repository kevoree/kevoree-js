var spawn = require('child_process').spawn;

/**
 * @param {string}   cmd      - command to execute
 * @param {array}    args     - list of string arguments for the command
 * @param {object}   options  - child_process.spawn options (optional)
 * @param {function} callback - function called when done (first param is the error if any)
 */
function exec(cmd, args, options, callback) {
	if (typeof cmd === 'undefined') {
		callback(new Error('exec "cmd" param must be defined'));
	} else {
		if (typeof callback === 'undefined') {
			callback = options;
			options = {};
		}
		if (args === null || typeof args === 'undefined') {
			args = [];
		}

		if (/^win/.test(process.platform)) {
			args.unshift(cmd);
			args.unshift('/c');
			cmd = process.env.comspec;
		}

		try {
			var program = spawn(cmd, args, {
				cwd: options.cwd || process.cwd,
				env: options.env || process.env,
				stdio: options.stdio || 'pipe',
				detached: (typeof options.detached === 'undefined') ? false : options.detached,
				uid: (typeof options.uid === 'number') ? options.uid : undefined,
				gid: (typeof options.uid === 'number') ? options.gid : undefined
			});

			var error;
			program.on('close', function(code) {
				switch (code) {
					case -2:
						errorHandler(cmd, error, callback);
						break;

					case 0:
						callback();
						break;

					default:
						if (/^win/.test(process.platform)) {
							callback(new Error(args[0]+' ' + args.join(' ')));
						} else {
							callback(new Error(cmd+' ' + args.join(' ')));
						}
						break;
				}

				program.unref();
			});

			program.on('error', function(err) {
				error = err;
			});
		} catch (err) {
			errorHandler(cmd, err, callback);
		}
	}
}

function errorHandler(cmd, err, callback) {
	switch (err.code) {
		case 'EACCES':
			callback(new Error('Unable to execute "'+cmd+'" - please check the permissions'));
			return;

		case 'ENOENT':
			callback(new Error('Unable to find "'+cmd+'" in the PATH - did you installed "'+cmd+'"?'));
			return;

		default:
			callback(new Error('Is "'+cmd+'" in the PATH and with proper executable rights?'));
			return;
	}
}

module.exports = exec;
