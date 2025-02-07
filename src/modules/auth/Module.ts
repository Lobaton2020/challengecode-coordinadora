import { IModule } from "../common/domain/repositories/IModule";
import { createValidator } from "express-joi-validation";
import { IRoute } from "../common/domain/repositories/IRoute";
import { HttpMethod } from "../common/domain/enum/HttpMethod";
import {
  registroUsuarioHandler,
} from "./handlers/AuthHandler";
import { createDependendencies } from "./dependencies/Dependencies";
import { DEPENDENCIES_INJECTION } from "../common/dependencies/Dependencies";
import { IRegistroUsuarioValidation } from "../../infraestructure/server/validations/IRegistroUsuarioValidation";

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
    ];
  }
}
