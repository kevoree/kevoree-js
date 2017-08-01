const chalk = require('chalk');
const winston = require('winston');

function LoggerFactory() {
  this.transports = ['console'];
  this.loggers = [];
}

let previousTs = Date.now(); // timestamp marker of the previous log

LoggerFactory.prototype = {
  create(tag, instance) {
    if (!instance) {
      instance = 'root';
    }

    const logger = new winston.Logger({
      level: 'debug',
      colorize: true,
      exitOnError: false,
      prettyPrint: true,
      transports: [],
    });

    const consoleTransport = {
      timestamp: () => {
        const d = new Date();
        return ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2) + ':' + ('0' + d.getSeconds()).slice(-2);
      },
      colorize: (level, msg) => {
        switch (level) {
          case 'info':
            return chalk.gray(msg);
          case 'debug':
            return chalk.cyan(msg);
          case 'warn':
            return chalk.yellow(msg);
          case 'error':
            return chalk.red(msg);
          default:
            return msg;
        }
      },
      formatter: (options) => {
        let msg;
        if (options.meta.stack) {
          if (options.message && options.message.length > 0) {
            msg = options.message + '\n' + options.meta.stack;
          } else {
            msg = options.meta.stack;
          }
        } else if (options.message instanceof Object) {
          msg = JSON.stringify(options.message, null, 2);
        } else {
          msg = options.message;
        }

        if (!options.meta.tag) {
          options.meta.tag = tag;
        }
        if (!options.meta.instance) {
          options.meta.instance = instance;
        }
        options.meta.tag = options.meta.tag.substr(0, 12);

        const now = Date.now();
        const ellapsed = ((now - previousTs) > 30000) ? '>30s' : '+' + (now - previousTs) + 'ms';
        previousTs = now;

        return chalk.gray(options.timestamp())
          + '  ' + chalk.magenta(truncate(options.meta.tag, 12))
          + '  ' + chalk.blue(truncate(options.meta.instance, 8))
          + '  ' + options.colorize(options.level, msg)
          + ' '  + ellapsed;
      }
    };

    this.transports.forEach((transport) => {
      switch (transport) {
        case 'console':
          logger.add(winston.transports.Console, consoleTransport);
          break;
      }
    });

    this.loggers.push(logger);
    return logger;
  },

  remove(transport) {
    this.transports.splice(this.transports.indexOf(transport), 1);
    this.loggers.forEach((logger) => {
      try { logger.remove(transport); } catch (ignore) {/**/}
    });
  },

  add(transport) {
    if (this.transports.indexOf(transport) === -1) {
      this.transports.push(transport);
    }
    this.loggers.forEach((logger) => logger.add(transport));
  },

  delete(logger) {
    this.loggers.splice(this.loggers.indexOf(logger), 1);
  }
};

function truncate(str, length) {
  str = str || '';

  if (str.length >= length) {
    str = str.substr(0, length - 1) + '.';
  } else {
    let spaces = '';
    for (let i = 0; i < length - str.length; i++) {
      spaces += ' ';
    }
    str += spaces;
  }

  return str;
}

module.exports = new LoggerFactory();
