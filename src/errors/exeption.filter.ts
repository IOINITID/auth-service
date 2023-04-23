import { NextFunction, Request, Response } from 'express';
import { IExeptionFilter } from './exeption.filter.interface';
import { HTTPError } from './http-error.class';
import { inject, injectable } from 'inversify';
import { ILoggerService } from '../logger/logger.service.interface';
import { Types } from '../types';
import 'reflect-metadata';

@injectable()
export class ExeptionFilter implements IExeptionFilter {
  constructor(@inject(Types.ILoggerService) private logger: ILoggerService) {}

  public catch(error: HTTPError | Error, request: Request, response: Response, next: NextFunction): void {
    if (error instanceof HTTPError) {
      this.logger.error(`[${error.context}] Ошибка ${error.statusCode}: ${error.message}`);
      response.status(error.statusCode).send({ error: error.message });
    } else {
      this.logger.error(`${error.message}`);
      response.status(500).send({ error: error.message });
    }
  }
}
