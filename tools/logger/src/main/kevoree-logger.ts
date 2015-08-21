import * as chalk from 'chalk';

const TAG_MAX = 15;
const NAME_MAX = 8;

export enum LogLevel {
  DEBUG, INFO, WARN, ERROR, QUIET
}

export declare interface Logger {
  info(...args: any[]): void;
  debug(...args: any[]): void;
  warn(...args: any[]): void;
  error(...args: any[]): void;
  setLevel(level: LogLevel): void;
}

export class LoggerFactory {
  private static level: LogLevel = LogLevel.INFO;
  private static loggers: { [key: string]: Logger } = {};

  static createLogger(tag: string, name: string): Logger {
    var id = tag+'_'+name;
    if (!this.loggers[id]) {
      this.loggers[id] = new LoggerImpl(tag, name, this.level);
    }

    return this.loggers[id];
  }

  static setLevel(level: LogLevel): void {
    this.level = level;
    for (var id in this.loggers) {
      this.loggers[id].setLevel(level);
    }
  }
}

export class LoggerImpl implements Logger {
  private tag: string;
  private name: string;
  private level: LogLevel;

  constructor(tag: string, name: string, level: LogLevel) {
    this.tag = tag;
    this.name = name;
    this.level = level;
  }

  debug(...args: any[]): void {
    if (this.level < LogLevel.INFO) {
      var prepend = `${chalk.cyan('D')}  ${getTime()}  ${processTag(this.tag)}  ${processName(this.name)}`;
      var msg = args.join(' ');
      msg.split(/[\n\r]/g).forEach(split => {
        console.log(`${prepend}  ${chalk.cyan(split)}`);
      });
    }
  }

  info(...args: any[]): void {
    if (this.level < LogLevel.WARN) {
      var prepend = `${chalk.grey('I')}  ${getTime()}  ${processTag(this.tag)}  ${processName(this.name)}`;
      var msg = args.join(' ');
      msg.split(/[\n\r]/g).forEach(split => {
        console.log(`${prepend}  ${chalk.grey(split)}`);
      });
    }
  }

  warn(...args: any[]): void {
    if (this.level < LogLevel.ERROR) {
      var prepend = `${chalk.grey.bgYellow('W')}  ${getTime()}  ${processTag(this.tag)}  ${processName(this.name)}`;
      var msg = args.join(' ');
      msg.split(/[\n\r]/g).forEach(split => {
        console.log(`${prepend}  ${chalk.yellow(split)}`);
      });
    }
  }

  error(...args: any[]): void {
    if (this.level < LogLevel.QUIET) {
      var prepend = `${chalk.white.bgRed('E')}  ${getTime()}  ${processTag(this.tag)}  ${processName(this.name)}`;
      var msg = args.join(' ');
      msg.split(/[\n\r]/g).forEach(split => {
        console.log(`${prepend}  ${chalk.red(split)}`);
      });
    }
  }

  setLevel(level: LogLevel): void {
    this.level = level;
  }
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
  if (tag.length >= TAG_MAX) {
    tag = tag.substr(0, TAG_MAX - 1) + '.';
  } else {
    var spaces = '';
    for (var i = 0; i < TAG_MAX - tag.length; i++) {
      spaces += ' ';
    }
    tag += spaces;
  }

  return chalk.magenta(tag);
}

function processName(name: string) {
  if (name.length >= NAME_MAX) {
    name = name.substr(0, NAME_MAX - 1) + '.';
  } else {
    var spaces = '';
    for (var i = 0; i < NAME_MAX - name.length; i++) {
      spaces += ' ';
    }
    name += spaces;
  }

  return chalk.blue(name);
}
