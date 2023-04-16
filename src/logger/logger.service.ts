import { Logger } from "tslog";

export class LoggerService {
  private logger: Logger;

  constructor() {
    this.logger = new Logger({
      displayInstanceName: false,
      displayLoggerName: false,
      displayFilePath: "hidden",
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
