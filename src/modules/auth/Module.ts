import { createValidator } from "express-joi-validation";
import {
  registroUsuarioHandler,
  validacionUsuarioHandler,
} from "./handlers/AuthHandler";
import { createDependendencies } from "./dependencies/Dependencies";
import { IRegistroUsuarioValidation } from "../../infraestructure/server/validations/IRegistroUsuarioValidation";
import { IValidacionUsuarioValidation } from "../../infraestructure/server/validations/IValidacionUsuarioValidation";
import { DEPENDENCIES_INJECTION } from "../_common/dependencies/Dependencies";
import { IRoute } from "../_common/domain/repositories/IRoute";
import { IModule } from "../_common/domain/repositories/IModule";
import { HttpMethod } from "../_common/domain/enum/HttpMethod";

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
