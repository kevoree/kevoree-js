export interface LoggerService {
  info(tag: string, msg?: string): void;
  debug(tag: string, msg?: string): void;
  warn(tag: string, msg?: string): void;
  error(tag: string, msg?: string): void;
}
