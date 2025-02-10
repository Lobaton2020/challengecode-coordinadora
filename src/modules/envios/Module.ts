import { createDependendencies } from "./dependencies/Dependencies";
import {
  crearEnvioHandler,
} from "./handlers/EnviosHandler";
import { DEPENDENCIES_INJECTION } from "../_common/dependencies/Dependencies";
import { IRoute } from "../_common/domain/repositories/IRoute";
import { HttpMethod } from "../_common/domain/enum/HttpMethod";
import { IModule } from "../_common/domain/repositories/IModule";
import { autenticacionMiddleware } from "../_common/middlewares/autenticacionMidleware";
import { autorizacionMiddleware } from "../_common/middlewares/autorizacionMidleware";
import { Roles } from "../auth/domain/enum/Roles";
import { createValidator } from "express-joi-validation";
import { ICrearEnvioValidation } from "../../infraestructure/server/validations/ICrearEnvioValidation";

export class EnviosModule implements IModule {
  private validator = createValidator({ passError: true });
  prefix = "/envios";
  init() {
    createDependendencies(DEPENDENCIES_INJECTION);
  }
  public getRoutes(): IRoute[] {
    return [
      {
        method: HttpMethod.POST,
        handler: crearEnvioHandler,
        path: "/",
        middlewares: [
          autenticacionMiddleware,
          autorizacionMiddleware([Roles.CLIENTE, Roles.ADMIN])
        ],
        validation:[
          this.validator.body(ICrearEnvioValidation)
        ]
      },
    ];
  }
}
