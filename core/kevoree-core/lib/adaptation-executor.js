const promisify = require('./promisify');

module.exports = function adaptationExecutor(core, model, adaptations, resolve, reject) {
	const start = new Date().getTime();
	const executedCmds = [];

	return promisify(adaptations)
		.reduce((previousCmd, next, index, adaptations) => {
			return previousCmd.then(() => {
				if (index > 0) {
					executedCmds.unshift(adaptations[index - 1]);
				}
				return next.execute();
			}).catch((err) => {
				if (core.stopping) {
					// if core is stopping, just log error and keep on adapting
					core.log.error('Adaptation error while stopping core...\n' + err.stack);
				} else {
					throw err;
				}
			});
		}, Promise.resolve())
		.then(() => {
			// === All adaptations executed successfully :)
			// set current model
			core.currentModel = model;
			// reset deployModel
			core.deployModel = null;
			// adaptations succeed : woot
			core.log.info((core.stopping ? 'Stop model' : 'Model') + ' deployed successfully: ' + adaptations.length + ' adaptations (' + (new Date().getTime() - start) + 'ms)');
			// all good :)
			// process script queue if any
			core.processScriptQueue();
			core.firstBoot = false;
			try {
				core.emitter.emit('deployed');
				resolve();
			} catch (err) {
				core.log.error('Error catched\n' + err.stack);
			}
		})
		.catch((err) => {
			// === At least one adaptation failed
			err.message = 'Something went wrong while executing adaptations.\n' + err.message;
			core.log.error(err.stack);

			if (core.firstBoot) {
				// === If adaptations failed on startup then it is bad => exit
				core.log.warn('Shutting down Kevoree because bootstrap failed...');
				core.deployModel = null;
				core.stop();
				process.nextTick(() => {
					reject(err);
				});
			} else {
				// === If not firstBoot => try to rollback...
				executedCmds
					.reduce((previous, next) => {
						return previous.then(() => {
							return next.undo();
						});
					}, Promise.resolve())
					.then(() => {
						// === Rollback success :)
						core.log.info('Rollback succeed: ' + executedCmds.length + ' adaptations (' + (new Date().getTime() - start) + 'ms)');
						core.deployModel = null;
						core.emitter.emit('rollbackSucceed');
						resolve();
					})
					.catch((err) => {
						// === Rollback failed => cannot recover from this...
						err.message = 'Something went wrong while rollbacking. Process will exit.\n' + err.message;
						core.log.error(err.stack);
						// stop everything :(
						core.deployModel = null;
						core.stop();
						reject(err);
						core.emitter.emit('error', err);
					});
			}
		});
};
