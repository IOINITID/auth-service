import express, { Express } from "express";
import { Server } from "node:http";
import { userRouter } from "./users/users";

export class App {
  private app: Express;
  private server: Server;
  private port: number;

  constructor() {
    this.app = express();
    this.port = 8000;
  }

  private useRoutes() {
    this.app.use("/users", userRouter);
  }

  public async init() {
    this.useRoutes();
    this.server = this.app.listen(this.port);
    console.log(`Сервер запушен на http://localhost:${this.port}`);
  }
}
