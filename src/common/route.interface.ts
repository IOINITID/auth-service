import { NextFunction, Request, Response, Router } from "express";

export interface Route {
  path: string;
  handler: (request: Request, response: Response, next: NextFunction) => void;
  method: keyof Pick<Router, "get" | "post" | "patch" | "put" | "delete">;
}
