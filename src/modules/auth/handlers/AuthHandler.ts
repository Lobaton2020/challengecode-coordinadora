import "../dependencies/Dependencies";
import { DEPENDENCIES_INJECTION } from "../../common/dependencies/Dependencies";
import { IUseCase } from "../../common/domain/repositories/IUseCase";
import { IContext } from "../../common/domain/repositories/IPayload";
import { AuthTypes } from "../dependencies/Types";
import { Result } from "../../../infraestructure/server/Result";

export const registroUsuarioHandler = async (ctx: IContext) => {
  const createCronogramaUseCase = DEPENDENCIES_INJECTION.get<IUseCase>(
    AuthTypes.RegistroUsuarioUseCase
  );
  await createCronogramaUseCase.execute(ctx.body);
  return Result.custom(201, false, null)
};

export const validacionUsuarioHandler = async (ctx: IContext) => {
  const createCronogramaUseCase = DEPENDENCIES_INJECTION.get<IUseCase>(
    AuthTypes.ValidarUsuarioUseCase
  );
  const data = await createCronogramaUseCase.execute(ctx.body);
  return Result.ok(data);
};