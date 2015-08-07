import { Core } from '../main/Core';
import { Logger } from 'kevoree-logger';
import * as kevoree from 'kevoree-library'

var logger = new Logger('Runtime');
var core = new Core(logger);
core.start('node0');

var factory = new kevoree.factory.DefaultKevoreeFactory();
var model = factory.createContainerRoot();

core.deploy(model, (err: Error, update: boolean) => {
  if (err) {
    logger.error(`Deploy error: ${err.message}`);
  } else {
    if (update) {
      logger.info(`deploy success`);
    } else {
      logger.info(`deploy failed`);
    }
  }
});

core.on('stop', () => {
  logger.info('Quit');
});

process.on('SIGINT', () => {
  process.stdout.write('\033[0G'); // http://stackoverflow.com/a/9628935/906441
  core.stop();
});
