const events = require('events');

class LoggerService extends events.EventEmitter {

  constructor() {
    super();
    this.prevTime = Date.now();
  }

  info(msg) {
    this.emit('line', this.createLine('info', msg));
  }

  debug(msg) {
    this.emit('line', this.createLine('debug', msg));
  }

  warn(msg) {
    this.emit('line', this.createLine('warn', msg));
  }

  error(msg) {
    this.emit('line', this.createLine('error', msg));
  }

  createLine(level, message) {
    const curTime = Date.now();
    const line = {
      level,
      message: message ? message.toString() : null,
      ellapsed: curTime - this.prevTime
    };
    this.prevTime = curTime;
    return line;
  }

  clear() {
    this.emit('clear');
  }
}

module.exports = LoggerService;
