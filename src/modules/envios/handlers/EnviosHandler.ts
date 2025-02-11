import "../dependencies/Dependencies";
import { Result } from "../../../infraestructure/server/Result";
import { IContext } from "../../_common/domain/repositories/IPayload";
import { DEPENDENCIES_INJECTION } from "../../_common/dependencies/Dependencies";
import { IUseCase } from "../../_common/domain/repositories/IUseCase";
import { EnvioTypes } from "../dependencies/Types";
import { HttpCode } from "../../../infraestructure/common/enum/HttpCode";


export const asignarEnvioHandler = async (ctx: IContext) => {
  const usecase = DEPENDENCIES_INJECTION.get<IUseCase>(
    EnvioTypes.AsignarEnvioUseCase
  );
  await usecase.execute(ctx.body);
  return Result.ok(null);
};


export const consultaVehiculosDisponiblesHandler = async (ctx: IContext) => {
  const usecase = DEPENDENCIES_INJECTION.get<IUseCase>(
    EnvioTypes.ConsultaVehiculosUseCase
  );
  const data = await usecase.execute(ctx.params);
  return Result.custom(HttpCode.OK, false, data);
};


export const consultaRutaJornadaGuiaHandler = async (ctx: IContext) => {
  const usecase = DEPENDENCIES_INJECTION.get<IUseCase>(
    EnvioTypes.ConsultaJornadaUseCase
  );
  const data = await usecase.execute(ctx.params);
  return Result.custom(HttpCode.OK, false, data);
};

export const crearEnvioHandler = async (ctx: IContext) => {
  const usecase = DEPENDENCIES_INJECTION.get<IUseCase>(
    EnvioTypes.CrearEnvioUseCase
  );
  const data = await usecase.execute(ctx.session, ctx.body);
  return Result.custom(HttpCode.CREATED, false, data);
};

export const consultaRastreoGuiaHandler = async (ctx: IContext) => {
  const usecase = DEPENDENCIES_INJECTION.get<IUseCase>(
    EnvioTypes.ConsultaRastreoGuiaUseCase
  );
  return Result.ok(await usecase.execute(ctx.params));
};


export const consultaTransportistasDisponiblesHandler = async (ctx: IContext) => {
  const usecase = DEPENDENCIES_INJECTION.get<IUseCase>(
    EnvioTypes.ConsultaTransportistasUseCase
  );
  return Result.ok(await usecase.execute(ctx.params));
};



