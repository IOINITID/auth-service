import { injectable } from 'inversify';
import { Logger } from 'tslog';
import { ILoggerService } from './logger.service.interface';
import 'reflect-metadata';

@injectable()
export class LoggerService implements ILoggerService {
  private logger: Logger;

  constructor() {
    this.logger = new Logger({
      displayInstanceName: false,
      displayLoggerName: false,
      displayFilePath: 'hidden',
      displayFunctionName: false,
    });
  }

  public log(...args: unknown[]): void {
    this.logger.info(...args);
  }

  public warn(...args: unknown[]): void {
    this.logger.warn(...args);
  }

  public error(...args: unknown[]): void {
    this.logger.error(...args);
  }
}
