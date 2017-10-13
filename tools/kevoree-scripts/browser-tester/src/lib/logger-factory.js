/* eslint no-console: 0 */

class Logger {
  constructor(tag) {
    this.tag = tag;
  }

  info(msg) {
    console.log('[%s] %s', this.tag, msg);
  }

  debug(msg) {
    console.info('[%s] %s', this.tag, msg);
  }

  warn(msg) {
    console.warn('[%s] %s', this.tag, msg);
  }

  error(msg) {
    console.error('[%s] %s', this.tag, msg);
  }
}

export default {
  create(tag) {
    return new Logger(tag);
  }
};
