import express, { Express } from "express";
import { Server } from "node:http";
import { LoggerService } from "./logger/logger.service";
import { UsersController } from "./users/users.controller";

export class App {
  private app: Express;
  private server: Server;
  private port: number;
  private logger: LoggerService;
  private usersController: UsersController;

  constructor(logger: LoggerService, usersController: UsersController) {
    this.app = express();
    this.port = 8000;
    this.logger = logger;
    this.usersController = usersController;
  }

  private useRoutes() {
    this.app.use("/users", this.usersController.router);
  }

  public async init() {
    this.useRoutes();
    this.server = this.app.listen(this.port);
    this.logger.log(`Сервер запушен на http://localhost:${this.port}`);
  }
}
