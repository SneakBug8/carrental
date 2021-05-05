// import { AppModule } from './app.module';
// import session = require('express-session');

import { Load } from "./moduleloader";
import { Runner } from "Runner";
import { Logger } from "utility/Logger";
import { Connection } from "DataBase";
import { Player } from "entities/example";

async function bootstrap() {
  Logger.info("Starting server");
  console.time("Server started");

  await Load();

  await Runner.Init();

  console.timeEnd("Server started");
}

bootstrap();
