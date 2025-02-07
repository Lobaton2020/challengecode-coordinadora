import { injectable } from "inversify";
import { ILogger } from "../../modules/common/domain/repositories/ILogger";
import { logger } from "./adapter";


@injectable()
export class LoggerWinston implements ILogger {
  debug(message?: any): void {
    logger.debug(message);
  }
  info(message?: any): void {
    logger.info(message);
  }
  warn(message?: any): void {
    logger.warn(message);
  }
  error(message?: any): void {
    logger.error(message);
  }
  log(message: string): void {
    logger.info(message);
  }
}
