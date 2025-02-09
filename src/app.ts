import "reflect-metadata";
import { configDotenv } from "dotenv";
configDotenv({ path: ".env" });
import { Server } from "./infraestructure/server/Server";
import { AuthModule } from "./modules/auth/Module";
import { CommonModule } from "./modules/_common/Module";
import { MaestrosModule } from "./modules/maestros/Module";

export function bootstrap(): Server {
  const server = new Server();
  const modules = [new CommonModule(), new AuthModule(), new MaestrosModule()];
  server.addModules(modules);
  return server;
}
