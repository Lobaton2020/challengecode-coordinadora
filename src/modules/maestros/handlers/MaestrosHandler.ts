import "../dependencies/Dependencies";
import { Result } from "../../../infraestructure/server/Result";
import { IContext } from "../../_common/domain/repositories/IPayload";
import { DEPENDENCIES_INJECTION } from "../../_common/dependencies/Dependencies";
import { IUseCase } from "../../_common/domain/repositories/IUseCase";
import { MaestrosTypes } from "../dependencies/Types";

export const consultaRolesHandler = async (_: IContext) => {
  const usecase = DEPENDENCIES_INJECTION.get<IUseCase>(
    MaestrosTypes.ConsultaRolesUseCase
  );
  return Result.ok(await usecase.execute());

};

export const consultaTiposPrductoHandler = async (_: IContext) => {
  const usecase = DEPENDENCIES_INJECTION.get<IUseCase>(
    MaestrosTypes.ConsultaTiposProductoUseCase
  );
  return Result.ok(await usecase.execute());
};

export const consultaTiposViaHandler = async (_: IContext) => {
  const usecase = DEPENDENCIES_INJECTION.get<IUseCase>(
    MaestrosTypes.ConsultaTiposProductoUseCase
  );
  return Result.ok(await usecase.execute());
};

export const consultaCiudadesHandler = async (_: IContext) => {
  const usecase = DEPENDENCIES_INJECTION.get<IUseCase>(
    MaestrosTypes.ConsultaCiudadesUseCase
  );
  return Result.ok(await usecase.execute());
};
