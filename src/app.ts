import express, { Express } from "express";
import { Server } from "node:http";
import { ILoggerService } from "./logger/logger.service.interface";
import { inject, injectable } from "inversify";
import { Types } from "./types";
import { IUsersController } from "./users/users.controller.interface";
import { IExeptionFilter } from "./errors/exeption.filter.interface";
import "reflect-metadata";

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

  private useRoutes() {
    this.app.use("/users", this.usersController.router);
  }

  private useExeptionFilters() {
    this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
  }

  public async init() {
    this.useRoutes();
    this.useExeptionFilters();
    this.server = this.app.listen(this.port);
    this.logger.log(`Сервер запушен на http://localhost:${this.port}`);
  }
}
