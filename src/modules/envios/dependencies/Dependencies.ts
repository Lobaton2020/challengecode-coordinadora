import { Container } from "inversify";
import { IUseCase } from "../../_common/domain/repositories/IUseCase";
import { IEnvioRepository } from "../domain/repositories/IEnvioRepository";
import { EnvioTypes } from "./Types";
import { EnvioDao } from "../../../infraestructure/bd/dao/EnviosDao";
import { CrearEnvioUseCase } from "../application/usecases/CrearEnvioUseCase";
import { ConsultaRastreoGuiaUseCase } from "../application/usecases/ConsultaRastreoGuiaUseCase";
import { ConsultaTransportistasUseCase } from "../application/usecases/ConsultaTransportistasUseCase";
import { ConsultaJornadaGuiaUseCase } from "../application/usecases/ConsultaJornadaGuiaUseCase";
import { ConsultaVehiculosUseCase } from "../application/usecases/ConsultaVehiculosUseCase";
import { AsignarEnvioUseCase } from "../application/usecases/AsignarEnvioUseCase";
import { ConsultaEnviosUseCase } from "../application/usecases/ConsultaEnviosUseCase";

export function createDependendencies(DEPENDENCIES_INJECTION: Container) {
  DEPENDENCIES_INJECTION.bind<IUseCase>(EnvioTypes.CrearEnvioUseCase)
    .to(CrearEnvioUseCase)
    .inSingletonScope();

  DEPENDENCIES_INJECTION.bind<IUseCase>(EnvioTypes.ConsultaRastreoGuiaUseCase)
    .to(ConsultaRastreoGuiaUseCase)
    .inSingletonScope();


  DEPENDENCIES_INJECTION.bind<IUseCase>(EnvioTypes.ConsultaTransportistasUseCase)
  .to(ConsultaTransportistasUseCase)
  .inSingletonScope();


  DEPENDENCIES_INJECTION.bind<IUseCase>(EnvioTypes.ConsultaJornadaUseCase)
  .to(ConsultaJornadaGuiaUseCase)
  .inSingletonScope();


  DEPENDENCIES_INJECTION.bind<IUseCase>(EnvioTypes.ConsultaVehiculosUseCase)
  .to(ConsultaVehiculosUseCase)
  .inSingletonScope();

  DEPENDENCIES_INJECTION.bind<IUseCase>(EnvioTypes.AsignarEnvioUseCase)
  .to(AsignarEnvioUseCase)
  .inSingletonScope();

  DEPENDENCIES_INJECTION.bind<IUseCase>(EnvioTypes.ConsultaEnviosUseCase)
    .to(ConsultaEnviosUseCase)
    .inSingletonScope();

  DEPENDENCIES_INJECTION.bind<IEnvioRepository>(
    EnvioTypes.EnvioRepository
  )
    .to(EnvioDao)
    .inSingletonScope();
}
