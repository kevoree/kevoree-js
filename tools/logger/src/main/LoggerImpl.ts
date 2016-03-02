import * as chalk from 'chalk';
import { Logger } from './Logger';
import { LogLevel } from './LogLevel';

const NAME_MAX = 12;

export class LoggerImpl implements Logger {
    private name: string;
    private level: LogLevel;

    constructor(name: string, level: LogLevel) {
        this.name = name;
        this.level = level;
    }

    debug(msg: string): void {
        if (this.level < LogLevel.INFO) {
            var prepend = `${getTime() }  ${processName(this.name) }`;
            msg.split(/[\n\r]/g).forEach(split => {
                console.log(`${prepend}  ${chalk.cyan(split) }`);
            });
        }
    }

    info(msg: string): void {
        if (this.level < LogLevel.WARN) {
            var prepend = `${getTime() }  ${processName(this.name) }`;
            msg.split(/[\n\r]/g).forEach(split => {
                console.log(`${prepend}  ${chalk.grey(split) }`);
            });
        }
    }

    warn(msg: string): void {
        if (this.level < LogLevel.ERROR) {
            var prepend = `${getTime() }  ${processName(this.name) }`;
            msg.split(/[\n\r]/g).forEach(split => {
                console.log(`${prepend}  ${chalk.yellow(split) }`);
            });
        }
    }

    error(msg: string, error?: Error): void {
        if (this.level < LogLevel.QUIET) {
            var prepend = `${getTime() }  ${processName(this.name) }`;
            if (error) {
                error.message = msg;
                var err = <any> error;
                err.stack.split(/[\n\r]/g).forEach((split: any) => {
                    console.log(`${prepend}  ${chalk.red(split) }`);
                });
            } else {
                msg.split(/[\n\r]/g).forEach(split => {
                    console.log(`${prepend}  ${chalk.red(split) }`);
                });
            }
        }
    }

    setLevel(level: LogLevel): void {
        this.level = level;
    }
}

function getTime(): string {
  var time = new Date();
  var hours = (time.getHours().toString().length === 1) ? '0' + time.getHours() : time.getHours();
  var mins = (time.getMinutes().toString().length === 1) ? '0' + time.getMinutes() : time.getMinutes();
  var secs = (time.getSeconds().toString().length === 1) ? '0' + time.getSeconds() : time.getSeconds();
  var ms = (time.getMilliseconds().toString().length === 1) ?
    '00' + time.getMilliseconds() : (time.getMilliseconds().toString().length === 2) ?
      '0' + time.getMilliseconds() : time.getMilliseconds();
  return chalk.grey(hours + ':' + mins + ':' + secs + ':' + ms) + '';
}

function processName(name: string): string {
  if (name.length >= NAME_MAX) {
    name = name.substr(0, NAME_MAX - 1) + '.';
  } else {
    var spaces = '';
    for (var i = 0; i < NAME_MAX - name.length; i++) {
      spaces += ' ';
    }
    name += spaces;
  }

  return chalk.blue(name) + '';
}
