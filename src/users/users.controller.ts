import { NextFunction, Request, Response } from "express";
import { BaseController } from "../common/base.controller";
import { LoggerService } from "../logger/logger.service";

export class UsersController extends BaseController {
  constructor(logger: LoggerService) {
    super(logger);
    this.bindRoutes([
      { path: "/register", method: "post", handler: this.register },
      { path: "/login", method: "post", handler: this.login },
    ]);
  }

  public login(request: Request, response: Response, next: NextFunction) {
    this.ok(response, "Login");
  }

  public register(request: Request, response: Response, next: NextFunction) {
    this.ok(response, "Register");
  }
}
