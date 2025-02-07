import { IModule } from "../common/domain/repositories/IModule";
import { createValidator } from "express-joi-validation";
import { IRoute } from "../common/domain/repositories/IRoute";
import { HttpMethod } from "../common/domain/enum/HttpMethod";
import {
  registroUsuarioHandler,
  validacionUsuarioHandler,
} from "./handlers/AuthHandler";
import { createDependendencies } from "./dependencies/Dependencies";
import { DEPENDENCIES_INJECTION } from "../common/dependencies/Dependencies";
import { IRegistroUsuarioValidation } from "../../infraestructure/server/validations/IRegistroUsuarioValidation";
import { IValidacionUsuarioValidation } from "../../infraestructure/server/validations/IValidacionUsuarioValidation";

export class AuthModule implements IModule {
  private validator = createValidator({ passError: true });
  prefix = "/auth";
  init() {
    createDependendencies(DEPENDENCIES_INJECTION);
  }
  public getRoutes(): IRoute[] {
    return [
      {
        method: HttpMethod.POST,
        handler: registroUsuarioHandler,
        path: "/registro",
        validation: [this.validator.body(IRegistroUsuarioValidation)],
      },
      {
        method: HttpMethod.POST,
        handler: validacionUsuarioHandler,
        path: "/login",
        validation: [this.validator.body(IValidacionUsuarioValidation)],
      },
    ];
  }
}
