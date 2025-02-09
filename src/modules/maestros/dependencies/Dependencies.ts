import { Container } from "inversify";
import { MaestrosTypes } from "./Types";
import { ConsultaRolesUseCase } from "../application/usecases/ConsultaRolesUseCase";
import { IUseCase } from "../../_common/domain/repositories/IUseCase";
import { ConsultaTiposProductoUseCase } from "../application/usecases/ConsultaTiposProductoUseCase";
import { IMaestroRepository } from "../domain/repositories/IMaestroRepository";
import { MaestrosDao } from "../../../infraestructure/bd/dao/MaestrosDao";

export function createDependendencies(DEPENDENCIES_INJECTION: Container) {
  DEPENDENCIES_INJECTION.bind<IUseCase>(MaestrosTypes.ConsultaRolesUseCase)
    .to(ConsultaRolesUseCase)
    .inSingletonScope();

  DEPENDENCIES_INJECTION.bind<IUseCase>(MaestrosTypes.ConsultaTiposProducto)
    .to(ConsultaTiposProductoUseCase)
    .inSingletonScope();

  DEPENDENCIES_INJECTION.bind<IMaestroRepository>(MaestrosTypes.MaestroRepository)
    .to(MaestrosDao)
    .inSingletonScope();
}
