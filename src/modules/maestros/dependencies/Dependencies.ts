import { Container } from "inversify";
import { MaestrosTypes } from "./Types";
import { ConsultaRolesUseCase } from "../application/usecases/ConsultaRolesUseCase";
import { IUseCase } from "../../_common/domain/repositories/IUseCase";
import { ConsultaTiposProductoUseCase } from "../application/usecases/ConsultaTiposProductoUseCase";
import { IMaestroRepository } from "../domain/repositories/IMaestroRepository";
import { MaestrosDao } from "../../../infraestructure/bd/dao/MaestrosDao";
import { ConsultaCiudadesUseCase } from "../application/usecases/ConsultaCiudadesUseCase";
import { ConsultaTiposViaUseCase } from "../application/usecases/ConsultaTiposViaUseCase copy";

export function createDependendencies(DEPENDENCIES_INJECTION: Container) {
  DEPENDENCIES_INJECTION.bind<IUseCase>(MaestrosTypes.ConsultaRolesUseCase)
    .to(ConsultaRolesUseCase)
    .inSingletonScope();

  DEPENDENCIES_INJECTION.bind<IUseCase>(MaestrosTypes.ConsultaTiposProductoUseCase)
    .to(ConsultaTiposProductoUseCase)
    .inSingletonScope();

  DEPENDENCIES_INJECTION.bind<IUseCase>(MaestrosTypes.ConsultaTiposViaUseCase)
    .to(ConsultaTiposViaUseCase)
    .inSingletonScope();


  DEPENDENCIES_INJECTION.bind<IUseCase>(MaestrosTypes.ConsultaCiudadesUseCase)
    .to(ConsultaCiudadesUseCase)
    .inSingletonScope();

  DEPENDENCIES_INJECTION.bind<IMaestroRepository>(
    MaestrosTypes.MaestroRepository
  )
    .to(MaestrosDao)
    .inSingletonScope();
}
