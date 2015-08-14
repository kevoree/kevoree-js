import { LoggerImpl } from 'kevoree-logger';
import { Injector }   from 'ts-injector';
import { Core }       from '../main/Core';
import { org }        from 'kevoree-model'

var injector = new Injector();
var logger = new LoggerImpl('Runtime');
injector.register('Logger', logger);

var core = new Core();
injector.inject(core);

core.start('node0', (e: Error) => {
  if (e) {
    throw e;
  } else {
    var dm = org.kevoree.modeling.memory.manager.DataManagerBuilder.buildDefault();
    var kModel = new org.KevoreeModel(dm);
    var kView = kModel.universe(0).time(0);
    kModel.connect((e) => {
      if (e) {
        throw e;
      } else {
        var model = kView.createModel();

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
      }
    });

    core.on('stop', () => {
      logger.info('Quit');
    });
  }
});

process.on('SIGINT', () => {
  process.stdout.write('\033[0G'); // http://stackoverflow.com/a/9628935/906441
  if (core) {
    core.stop();
  } else {
    process.exit(0);
  }
});
