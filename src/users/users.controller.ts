import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { HTTPError } from '../errors/http-error.class';
import { IUsersController } from './users.controller.interface';
import { inject, injectable } from 'inversify';
import { ILoggerService } from '../logger/logger.service.interface';
import { Types } from '../types';
import 'reflect-metadata';
import { UserLoginDTO } from './dto/user-login.dto';
import { UserRegisterDTO } from './dto/user-register.dto';
import { User } from './user.entiry';

@injectable()
export class UsersController extends BaseController implements IUsersController {
  constructor(@inject(Types.ILoggerService) private loggerService: ILoggerService) {
    super(loggerService);
    this.bindRoutes([
      { path: '/register', method: 'post', handler: this.register },
      { path: '/login', method: 'post', handler: this.login },
    ]);
  }

  public login(request: Request<{}, {}, UserLoginDTO>, response: Response, next: NextFunction): void {
    next(new HTTPError(401, 'Ошибка авторизации', 'login'));
    // this.ok(response, "Login");
  }

  public async register(
    request: Request<{}, {}, UserRegisterDTO>,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    const newUser = new User(request.body.email, request.body.name);

    await newUser.setPassword(request.body.password);

    this.ok(response, newUser);
  }
}
