import express, { Express } from "express";
import { Server } from "node:http";
import { LoggerService } from "./logger/logger.service";
import { UsersController } from "./users/users.controller";
import { ExeptionFilter } from "./errors/exeption.filter";

export class App {
  private app: Express;
  private server: Server;
  private port: number;
  private logger: LoggerService;
  private usersController: UsersController;
  private exeptionFilter: ExeptionFilter;

  constructor(
    logger: LoggerService,
    usersController: UsersController,
    exeptionFilter: ExeptionFilter
  ) {
    this.app = express();
    this.port = 8000;
    this.logger = logger;
    this.usersController = usersController;
    this.exeptionFilter = exeptionFilter;
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
