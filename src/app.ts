import express, { Express } from 'express';
import { Server } from 'node:http';
import { ILoggerService } from './logger/logger.service.interface';
import { inject, injectable } from 'inversify';
import { Types } from './types';
import { IUsersController } from './users/users.controller.interface';
import { IExeptionFilter } from './errors/exeption.filter.interface';
import { json } from 'body-parser';
import 'reflect-metadata';

@injectable()
export class App {
  private app: Express;
  private server: Server;
  private port: number;

  constructor(
    @inject(Types.ILoggerService) private logger: ILoggerService,
    @inject(Types.IUserController) private usersController: IUsersController,
    @inject(Types.IExeptionFilter) private exeptionFilter: IExeptionFilter
  ) {
    this.app = express();
    this.port = 8000;
  }

  private useRoutes(): void {
    this.app.use('/users', this.usersController.router);
  }

  private useExeptionFilters(): void {
    this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
  }

  private useMiddleware(): void {
    this.app.use(json());
  }

  public async init(): Promise<void> {
    this.useMiddleware();
    this.useRoutes();
    this.useExeptionFilters();
    this.server = this.app.listen(this.port);
    this.logger.log(`Сервер запушен на http://localhost:${this.port}`);
  }
}
