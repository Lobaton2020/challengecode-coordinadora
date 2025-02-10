import { Container } from "inversify";
import { IUseCase } from "../../_common/domain/repositories/IUseCase";
import { IEnvioRepository } from "../domain/repositories/IEnvioRepository";
import { EnvioTypes } from "./Types";
import { EnvioDao } from "../../../infraestructure/bd/dao/EnviosDao";
import { CrearEnvioUseCase } from "../application/usecases/CrearEnvioUseCase";

export function createDependendencies(DEPENDENCIES_INJECTION: Container) {
  DEPENDENCIES_INJECTION.bind<IUseCase>(EnvioTypes.CrearEnvioUseCase)
    .to(CrearEnvioUseCase)
    .inSingletonScope();

  DEPENDENCIES_INJECTION.bind<IEnvioRepository>(
    EnvioTypes.EnvioRepository
  )
    .to(EnvioDao)
    .inSingletonScope();
}
