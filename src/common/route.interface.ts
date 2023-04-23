import { NextFunction, Request, Response, Router } from 'express';
import { IMiddleware } from './middlewate.interface';

export interface IRoute {
  path: string;
  handler: (request: Request, response: Response, next: NextFunction) => void;
  method: keyof Pick<Router, 'get' | 'post' | 'patch' | 'put' | 'delete'>;
  middlewares?: IMiddleware[];
}
