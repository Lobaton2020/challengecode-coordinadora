export interface ILogger {
  log(message: string): void;
  debug(message?: any): void;
  info(message?: any): void;
  warn(message?: any): void;
  error(message?: any): void;
}