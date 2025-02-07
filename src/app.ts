import "reflect-metadata";
import { configDotenv } from "dotenv";
configDotenv({ path: ".env" });
import { CommonModule } from "./modules/common/Module";
import { Server } from "./infraestructure/server/Server";
import { AuthModule } from "./modules/auth/Module";

export function bootstrap(): Server {
  const server = new Server();
  const modules = [new CommonModule(), new AuthModule()];
  server.addModules(modules);
  return server;
}
