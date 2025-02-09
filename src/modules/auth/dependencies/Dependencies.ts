import { Container } from "inversify";
import { AuthTypes } from "./Types";
import { RegistroUsuarioUseCase } from "../application/usecases/RegistroUsuarioUseCase";
import { IAuthRepository } from "../domain/repositories/IAuthRepository";
import { AuthDao } from "../../../infraestructure/bd/dao/AuthDao";
import { ValidacionUsuarioUseCase } from "../application/usecases/ValidacionUsuarioUseCase";
import { IUseCase } from "../../_common/domain/repositories/IUseCase";

export function createDependendencies(DEPENDENCIES_INJECTION: Container) {
  DEPENDENCIES_INJECTION.bind<IUseCase>(AuthTypes.RegistroUsuarioUseCase)
    .to(RegistroUsuarioUseCase)
    .inSingletonScope();

  DEPENDENCIES_INJECTION.bind<IUseCase>(AuthTypes.ValidarUsuarioUseCase)
    .to(ValidacionUsuarioUseCase)
    .inSingletonScope();

  DEPENDENCIES_INJECTION.bind<IAuthRepository>(AuthTypes.AuthRepository)
    .to(AuthDao)
    .inSingletonScope();
}
