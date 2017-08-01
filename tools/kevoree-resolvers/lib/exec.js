const spawn = require('child_process').spawn;

/**
 * @param  {string}   moduleName     - the module to install (ie. kevoree-node-javascript@1.2.3)
 * @param  {string}   whereToInstall - where to execute the command (ie. /path/to/somewhere)
 * @return {Promise}                 - promise
 */
function exec(moduleName, whereToInstall) {
  let cmd = 'npm';
  const args = ['install', moduleName];

  if (/^win/.test(process.platform)) {
    args.unshift(cmd);
    args.unshift('/c');
    cmd = process.env.comspec;
  }

  return new Promise((resolve, reject) => {
    const program = spawn(cmd, args, {
      cwd: whereToInstall,
      stdio: 'pipe',
    });

    let stdout = '';
    let stderr = '';

    program.stdout.on('data', (data) => stdout += data);
    program.stderr.on('data', (data) => stderr += data);

    program.on('close', (code) => {
      if (code === 0) {
        resolve(stdout);
      } else {
        const err = new Error(cmd + ' ' + args.join(' ') + ' failed');
        err.stdout = stdout;
        err.stderr = stderr;
        reject(err);
      }
    });
  });
}

module.exports = exec;
