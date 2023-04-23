import { Response, Router } from 'express';
import { IRoute } from './route.interface';
import { ILoggerService } from '../logger/logger.service.interface';
import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export abstract class BaseController {
  private readonly _router: Router;

  constructor(private logger: ILoggerService) {
    this._router = Router();
  }

  public get router(): Router {
    return this._router;
  }

  public send<T>(response: Response, code: number, message: T): Response<any, Record<string, any>> {
    response.type('application/json');
    return response.status(code).json(message);
  }

  public ok<T>(response: Response, message: T): Response<any, Record<string, any>> {
    return this.send(response, 200, message);
  }

  public created(response: Response): Response<any, Record<string, any>> {
    return response.sendStatus(201);
  }

  protected bindRoutes(routes: IRoute[]): void {
    for (const route of routes) {
      this.logger.log(`[${route.method}] ${route.path}`);

      const handler = route.handler.bind(this);
      this.router[route.method](route.path, handler);
    }
  }
}
