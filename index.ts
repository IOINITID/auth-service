import express, { NextFunction, Request, Response } from "express";
import { userRouter } from "./users/users";

const port = 8000;
const app = express();

app.use((request, response, next) => {
  console.log("Время ", Date.now());
  next();
});

app.get("/hello", (request, response, next) => {
  throw new Error("Error...");
});

app.use("/users", userRouter);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    console.log(error.message);
    response.status(401).send(error.message);
  }
);

app.listen(port, () => {
  console.log(`Сервер запушен на http://localhost:${port}`);
});
