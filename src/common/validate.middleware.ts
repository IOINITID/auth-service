import { Request, Response, NextFunction } from 'express';
import { IMiddleware } from './middlewate.interface';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

export class ValidateMiddlewate implements IMiddleware {
  constructor(private classToValidate: ClassConstructor<object>) {}

  public execute(request: Request, response: Response, next: NextFunction): void {
    const instance = plainToClass(this.classToValidate, request.body);

    validate(instance).then((errors) => {
      if (errors.length > 0) {
        response.status(422).send(errors);
      } else {
        next();
      }
    });
  }
}
