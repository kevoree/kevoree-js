import { LogLevel } from './LogLevel';

export interface Logger {
  info(msg: string): void;
  debug(msg: string): void;
  warn(msg: string): void;
  error(msg: string): void;
  error(msg: string, err: Error): void;
  setLevel(level: LogLevel): void;
}
