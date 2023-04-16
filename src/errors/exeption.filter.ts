import { NextFunction, Request, Response } from "express";
import { LoggerService } from "../logger/logger.service";
import { IExeptionFilter } from "./exeption.filter.interface";
import { HTTPError } from "./http-error.class";

export class ExeptionFilter implements IExeptionFilter {
  private logger: LoggerService;

  constructor(logger: LoggerService) {
    this.logger = logger;
  }

  public catch(
    error: HTTPError | Error,
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    if (error instanceof HTTPError) {
      this.logger.error(
        `[${error.context}] Ошибка ${error.statusCode}: ${error.message}`
      );
      response.status(error.statusCode).send({ error: error.message });
    } else {
      this.logger.error(`${error.message}`);
      response.status(500).send({ error: error.message });
    }
  }
}
