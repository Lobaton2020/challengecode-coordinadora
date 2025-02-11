import { createDependendencies } from "./dependencies/Dependencies";
import {
  asignarEnvioHandler,
  consultaRastreoGuiaHandler,
  consultarOrdenesEnvios,
  consultaRutaJornadaGuiaHandler,
  consultaTransportistasDisponiblesHandler,
  consultaVehiculosDisponiblesHandler,
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
import { IRastreoGuiaValidation } from "../../infraestructure/server/validations/IRastreoGuiaValidation";
import { IRutaGuiaValidation } from "../../infraestructure/server/validations/IRutaGuiaValidation";
import { IAsignarEnvioValidation } from "../../infraestructure/server/validations/IAsignarEnvioValidation";
import { IConsultaOrdenesEnvioValidation } from "../../infraestructure/server/validations/IConsultaOrdenesEnvioValidation";

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
      {
        method: HttpMethod.GET,
        handler: consultaRastreoGuiaHandler,
        path: "/rastreo/:numero_guia",
        middlewares: [
          autenticacionMiddleware,
          autorizacionMiddleware([Roles.CLIENTE, Roles.ADMIN, Roles.BACKOFFOCE])
        ],
        validation:[
          this.validator.params(IRastreoGuiaValidation)
        ]
      },
      {
        method: HttpMethod.GET,
        handler: consultaTransportistasDisponiblesHandler,
        path: "/transportistas",
        middlewares: [
          autenticacionMiddleware,
          autorizacionMiddleware([Roles.CLIENTE, Roles.ADMIN, Roles.BACKOFFOCE])
        ],
      },
      {
        method: HttpMethod.GET,
        handler: consultaRutaJornadaGuiaHandler,
        path: "/jornadas/:numero_guia",
        middlewares: [
          autenticacionMiddleware,
          autorizacionMiddleware([Roles.CLIENTE, Roles.ADMIN, Roles.BACKOFFOCE])
        ],
        validation:[
          this.validator.params(IRastreoGuiaValidation)
        ]
      },
      {
        method: HttpMethod.GET,
        handler: consultaVehiculosDisponiblesHandler,
        path: "/vehiculos/:id_ruta",
        middlewares: [
          autenticacionMiddleware,
          autorizacionMiddleware([Roles.CLIENTE, Roles.ADMIN, Roles.BACKOFFOCE])
        ],
        validation:[
          this.validator.params(IRutaGuiaValidation)
        ]
      },
      {
        method: HttpMethod.POST,
        handler: asignarEnvioHandler,
        path: "/asignaciones",
        middlewares: [
          autenticacionMiddleware,
          autorizacionMiddleware([Roles.ADMIN])
        ],
        validation:[
          this.validator.body(IAsignarEnvioValidation)
        ]
      },
      {
        method: HttpMethod.GET,
        handler: consultarOrdenesEnvios,
        path: "/",
        middlewares: [
          autenticacionMiddleware,
          autorizacionMiddleware([Roles.ADMIN])
        ],
        validation: [
          this.validator.query(IConsultaOrdenesEnvioValidation)
        ]
      },
    ];
  }
}
