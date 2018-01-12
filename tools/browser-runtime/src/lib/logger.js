import { EventEmitter } from 'events';

function preprocess(msg) {
  if (msg instanceof Error) {
    return msg.stack;
  } else {
    return msg;
  }
}

export default class Logger extends EventEmitter {
  constructor(tag, name = 'root') {
    super();
    this.tag = tag;
    this.name = name;
  }

  info(msg) {
    msg = preprocess(msg);
    // console.log('[%s] %s', this.tag, msg);
    const log = { msg, level: 'info', tag: this.tag, name: this.name };
    this.emit('log', log);
  }

  debug(msg) {
    msg = preprocess(msg);
    // console.info('[%s] %s', this.tag, msg);
    const log = { msg, level: 'debug', tag: this.tag, name: this.name };
    this.emit('log', log);
  }

  warn(msg) {
    msg = preprocess(msg);
    // console.warn('[%s] %s', this.tag, msg);
    const log = { msg, level: 'warn', tag: this.tag, name: this.name };
    this.emit('log', log);
  }

  error(msg) {
    msg = preprocess(msg);
    console.error('[%s] %s', this.tag, msg);
    const log = { msg, level: 'error', tag: this.tag, name: this.name };
    this.emit('log', log);
  }

  off(evt, handler) {
    this.removeListener(evt, handler);
  }
}
