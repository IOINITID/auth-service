import express, { Express } from "express";
import { Server } from "node:http";
import { userRouter } from "./users/users";
import { LoggerService } from "./logger/logger.service";

export class App {
  private app: Express;
  private server: Server;
  private port: number;
  private logger: LoggerService;

  constructor(logger: LoggerService) {
    this.app = express();
    this.port = 8000;
    this.logger = logger;
  }

  private useRoutes() {
    this.app.use("/users", userRouter);
  }

  public async init() {
    this.useRoutes();
    this.server = this.app.listen(this.port);
    this.logger.log(`Сервер запушен на http://localhost:${this.port}`);
  }
}
