import { LogLevel } from './LogLevel';
import { Logger } from './Logger';
import { LoggerImpl } from './LoggerImpl';

export class LoggerFactory {
  private static level = LogLevel.INFO;
  private static loggers: { [key: string]: Logger } = {};

  static createLogger(name: string): Logger {
    var id = name;
    if (!this.loggers[id]) {
      this.loggers[id] = new LoggerImpl(name, this.level);
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
