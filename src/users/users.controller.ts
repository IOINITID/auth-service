import { NextFunction, Request, Response } from "express";
import { BaseController } from "../common/base.controller";
import { LoggerService } from "../logger/logger.service";
import { HTTPError } from "../errors/http-error.class";

export class UsersController extends BaseController {
  constructor(logger: LoggerService) {
    super(logger);
    this.bindRoutes([
      { path: "/register", method: "post", handler: this.register },
      { path: "/login", method: "post", handler: this.login },
    ]);
  }

  public login(request: Request, response: Response, next: NextFunction) {
    next(new HTTPError(401, "Ошибка авторизации", "login"));
    // this.ok(response, "Login");
  }

  public register(request: Request, response: Response, next: NextFunction) {
    this.ok(response, "Register");
  }
}
