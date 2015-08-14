declare interface Logger {
    info(tag: string, msg?: string): void;
    debug(tag: string, msg?: string): void;
    warn(tag: string, msg?: string): void;
    error(tag: string, msg?: string): void;
}
declare class LoggerImpl implements Logger {
    private tag;
    constructor(tag?: string);
    info(tag: string, msg?: string): void;
    debug(tag: string, msg?: string): void;
    warn(tag: string, msg?: string): void;
    error(tag: string, msg?: string): void;
}

declare module 'kevoree-logger' {
  export { LoggerImpl }
}
