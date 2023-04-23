import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './app';
import { ExeptionFilter } from './errors/exeption.filter';
import { LoggerService } from './logger/logger.service';
import { UsersController } from './users/users.controller';
import { ILoggerService } from './logger/logger.service.interface';
import { Types } from './types';
import { IUsersController } from './users/users.controller.interface';
import { IExeptionFilter } from './errors/exeption.filter.interface';

const containerModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<App>(Types.App).to(App);
  bind<ILoggerService>(Types.ILoggerService).to(LoggerService);
  bind<IUsersController>(Types.IUserController).to(UsersController);
  bind<IExeptionFilter>(Types.IExeptionFilter).to(ExeptionFilter);
});

export interface IMainReturn {
  container: Container;
  app: App;
}

function main(): IMainReturn {
  const container = new Container();

  container.load(containerModule);

  const app = container.get<App>(Types.App);

  app.init();

  return { container, app };
}

export const { container, app } = main();
