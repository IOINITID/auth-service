import { NextFunction, Request, Response } from "express";
import { BaseController } from "../common/base.controller";
import { HTTPError } from "../errors/http-error.class";
import { IUsersController } from "./users.controller.interface";
import { inject, injectable } from "inversify";
import { ILoggerService } from "../logger/logger.service.interface";
import { Types } from "../types";
import "reflect-metadata";

@injectable()
export class UsersController
  extends BaseController
  implements IUsersController
{
  constructor(
    @inject(Types.ILoggerService) private loggerService: ILoggerService
  ) {
    super(loggerService);
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
