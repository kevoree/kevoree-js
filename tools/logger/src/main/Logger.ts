import chalk = require('chalk');

export declare interface Logger {
  info(tag: string, msg?: string): void;
  debug(tag: string, msg?: string): void;
  warn(tag: string, msg?: string): void;
  error(tag: string, msg?: string): void;
  setLevel(level: LogLevel): void;
}

export class LoggerImpl implements Logger {
  private tag: string;
  private level: LogLevel;

  constructor(tag?: string) {
    this.tag = tag || 'Logger';
    this.level = LogLevel.INFO;
  }

  debug(tag: string, msg?: string): void {
    if (this.level < LogLevel.INFO) {
      if (!msg) {
        msg = tag;
        tag = this.tag
      }

      var prepend = `${getTime() } ${debug('DEBUG') } ${processTag(tag) }`;
      msg = msg.replace(/[\n\r]/g, '\n'+prepend);
      console.log(`${prepend} ${debug(msg)}`);
    }
  }

  info(tag: string, msg?: string): void {
    if (this.level < LogLevel.WARN) {
      if (!msg) {
        msg = tag;
        tag = this.tag
      }

      var prepend = `${getTime() } ${info('INFO') } ${processTag(tag) }`;
      msg = msg.replace(/[\n\r]/g, '\n'+prepend);
      console.log(`${prepend} ${info(msg)}`);
    }
  }

  warn(tag: string, msg?: string): void {
    if (this.level < LogLevel.ERROR) {
      if (!msg) {
        msg = tag;
        tag = this.tag
      }

      var prepend = `${getTime() } ${warn('WARN') } ${warnMsg(tag) }`;
      msg = msg.replace(/[\n\r]/g, '\n'+prepend);
      console.log(`${prepend} ${warnMsg(msg)}`);
    }
  }

  error(tag: string, msg?: string): void {
    if (this.level < LogLevel.QUIET) {
      if (!msg) {
        msg = tag;
        tag = this.tag
      }

      var prepend = `${getTime() } ${error('ERROR') } ${processTag(tag) }`;
      msg = msg.replace(/[\n\r]/g, '\n'+prepend);
      console.log(`${prepend} ${errorMsg(msg)}`);
    }
  }

  setLevel(level: LogLevel): void {
    this.level = level;
  }
}

export enum LogLevel {
  DEBUG, INFO, WARN, ERROR, QUIET
}

function getTime() {
  var time = new Date();
  var hours = (time.getHours().toString().length === 1) ? '0' + time.getHours() : time.getHours();
  var mins = (time.getMinutes().toString().length === 1) ? '0' + time.getMinutes() : time.getMinutes();
  var secs = (time.getSeconds().toString().length === 1) ? '0' + time.getSeconds() : time.getSeconds();
  var ms = (time.getMilliseconds().toString().length === 1) ?
    '00' + time.getMilliseconds() : (time.getMilliseconds().toString().length === 2) ?
      '0' + time.getMilliseconds() : time.getMilliseconds();
  return chalk.grey(hours + ':' + mins + ':' + secs + ':' + ms)
}

function processTag(tag: string) {
  if (tag.length >= 15) {
    tag = tag.substr(0, 14) + '.';
  } else {
    var spaces = '';
    for (var i = 0; i < 15 - tag.length; i++) spaces += ' ';
    tag += spaces;
  }

  return chalk.magenta(tag)
}

var info = chalk.grey,
  warn = chalk.grey.bgYellow,
  warnMsg = chalk.yellow,
  error = chalk.white.bgRed,
  errorMsg = chalk.red,
  debug = chalk.cyan;
