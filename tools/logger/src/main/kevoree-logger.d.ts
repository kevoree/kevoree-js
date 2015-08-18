declare interface Logger {
    info(tag: string, msg?: string): void;
    debug(tag: string, msg?: string): void;
    warn(tag: string, msg?: string): void;
    error(tag: string, msg?: string): void;
    setLevel(level: LogLevel): void;
}
declare enum LogLevel {
  DEBUG, INFO, WARN, ERROR, QUIET
}
declare class LoggerImpl implements Logger {
    private tag;
    constructor(tag?: string);
    info(tag: string, msg?: string): void;
    debug(tag: string, msg?: string): void;
    warn(tag: string, msg?: string): void;
    error(tag: string, msg?: string): void;
    setLevel(level: LogLevel): void;
}

declare module 'kevoree-logger' {
  export { LoggerImpl, LogLevel }
}
