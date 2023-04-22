import { NextFunction, Request, Response, Router } from "express";

export interface IUsersController {
  router: Router;
  login: (request: Request, response: Response, next: NextFunction) => void;
  register: (request: Request, response: Response, next: NextFunction) => void;
}
