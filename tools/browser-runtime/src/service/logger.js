import { EventEmitter } from 'events';

import Logger from '../lib/logger';

export default class LoggerService extends EventEmitter {

  constructor() {
    super();
    this.logs = [];
    this.level = 'info';
  }

  create(tag, name) {
    const logger = new Logger(tag, name);
    logger.on('log', (log) => {
      this.logs.push(log);
      this.emit('log', log);
    });
    return logger;
  }

  clear() {
    this.logs.length = 0;
    this.emit('clear');
  }

  off(evt, handler) {
    this.removeListener(evt, handler);
  }

  delete(logger) {
    logger.removeAllListeners('log');
  }
}
