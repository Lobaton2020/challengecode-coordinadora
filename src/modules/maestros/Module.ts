import { createDependendencies } from "./dependencies/Dependencies";
import {
  consultaCiudadesHandler,
  consultaRolesHandler,
  consultaTiposPrductoHandler,
  consultaTiposViaHandler,
} from "./handlers/MaestrosHandler";
import { DEPENDENCIES_INJECTION } from "../_common/dependencies/Dependencies";
import { IRoute } from "../_common/domain/repositories/IRoute";
import { HttpMethod } from "../_common/domain/enum/HttpMethod";
import { IModule } from "../_common/domain/repositories/IModule";
import { autenticacionMiddleware } from "../_common/middlewares/autenticacionMidleware";

export class MaestrosModule implements IModule {
  prefix = "/maestros";
  init() {
    createDependendencies(DEPENDENCIES_INJECTION);
  }
  public getRoutes(): IRoute[] {
    return [
      {
        method: HttpMethod.GET,
        handler: consultaRolesHandler,
        path: "/roles",
        middlewares: [autenticacionMiddleware],
      },
      {
        method: HttpMethod.GET,
        handler: consultaTiposPrductoHandler,
        path: "/tipos-producto",
        middlewares: [autenticacionMiddleware],
      },
      {
        method: HttpMethod.GET,
        handler: consultaTiposViaHandler,
        path: "/tipos-via",
        middlewares: [autenticacionMiddleware],
      },
      {
        method: HttpMethod.GET,
        handler: consultaCiudadesHandler,
        path: "/ciudades",
        middlewares: [autenticacionMiddleware],
      },


    ];
  }
}
