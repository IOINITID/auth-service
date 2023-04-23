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
import { IUserService } from './user.service.interface';
import { ValidateMiddlewate } from '../common/validate.middleware';

@injectable()
export class UsersController extends BaseController implements IUsersController {
  constructor(
    @inject(Types.ILoggerService) private loggerService: ILoggerService,
    @inject(Types.IUserService) private userService: IUserService
  ) {
    super(loggerService);
    this.bindRoutes([
      {
        path: '/register',
        method: 'post',
        handler: this.register,
        middlewares: [new ValidateMiddlewate(UserRegisterDTO)],
      },
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
    const result = await this.userService.createUser(request.body);

    if (!result) {
      return next(new HTTPError(422, 'Такой пользователь уже существует'));
    }

    this.ok(response, { email: result.email });
  }
}
