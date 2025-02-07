import "reflect-metadata";
import { configDotenv } from "dotenv";
configDotenv({ path: ".env" });
import { DEPENDENCIES_INJECTION } from "./modules/common/dependencies/Dependencies";
import { CommonTypes } from "./modules/common/dependencies/Types";
import { ILogger } from "./modules/common/domain/repositories/ILogger";
import { IServer } from "./modules/common/domain/repositories/IServer";
import { CommonModule } from "./modules/common/Module";
import { Server } from "./infraestructure/server/Server";
import { AuthModule } from "./modules/auth/Module";

const logger = DEPENDENCIES_INJECTION.get<ILogger>(CommonTypes.Logger);
async function bootstrap() {
  const server: IServer = new Server();
  const modules = [
    new CommonModule(),
    new AuthModule(),
  ];
  server.addModules(modules);
  server.startServer(process.env.PORT ?? "3001");
}

bootstrap()
    .catch(err => {
        logger.log(err)
        process.exit(1)
    })