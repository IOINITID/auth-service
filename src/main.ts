import { App } from "./app";
import { LoggerService } from "./logger/logger.service";

async function main() {
  const app = new App(new LoggerService());
  await app.init();
}

main();
