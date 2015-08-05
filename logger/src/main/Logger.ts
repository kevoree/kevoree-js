import chalk = require('chalk')

export class Logger implements Logger {
  private tag: string

  constructor(tag?: string) {
    this.tag = tag || 'Logger';
  }

  info(tag: string, msg?: string): void {
    if (!msg) {
      msg = tag
      tag = this.tag
    }

    console.log(`${getTime() } ${info('INFO') }  ${processTag(tag) } ${info(msg) }`);
  }

  debug(tag: string, msg?: string): void {
    if (!msg) {
      msg = tag
      tag = this.tag
    }

    console.log(`${getTime() } ${debug('DEBUG') } ${processTag(tag) } ${debug(msg) }`);
  }

  warn(tag: string, msg?: string): void {
    if (!msg) {
      msg = tag
      tag = this.tag
    }

    console.log(`${getTime() } ${warn('WARN') }  ${processTag(tag) } ${warnMsg(msg) }`);
  }

  error(tag: string, msg?: string): void {
    if (!msg) {
      msg = tag
      tag = this.tag
    }

    console.log(`${getTime() } ${error('ERROR') } ${processTag(tag) } ${errorMsg(msg) }`);
  }
}

function getTime() {
  var time = new Date()
  var hours = (time.getHours().toString().length === 1) ? '0' + time.getHours() : time.getHours()
  var mins = (time.getMinutes().toString().length === 1) ? '0' + time.getMinutes() : time.getMinutes()
  var secs = (time.getSeconds().toString().length === 1) ? '0' + time.getSeconds() : time.getSeconds()
  var ms = (time.getMilliseconds().toString().length === 1) ? '00' + time.getMilliseconds() : (time.getMilliseconds().toString().length === 2) ? '0' + time.getMilliseconds() : time.getMilliseconds()
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