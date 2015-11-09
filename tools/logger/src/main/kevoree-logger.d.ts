declare module KevoreeLogger {
  interface Logger {
    info(...args: any[]): void;
    debug(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
    setLevel(level: LogLevel): void;
  }

  enum LogLevel {
    DEBUG, INFO, WARN, ERROR, QUIET
  }

  class LoggerFactory {
    private static level;
    private static loggers;
    static createLogger(tag: string, name: string): Logger;
    static setLevel(level: LogLevel): void;
  }
}

declare module 'kevoree-logger' {
  export = KevoreeLogger
}
