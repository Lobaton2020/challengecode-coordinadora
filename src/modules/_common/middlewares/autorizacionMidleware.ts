import "../dependencies/Dependencies";
import { IContextMiddeware } from "../domain/repositories/IPayload";
import { ForbiddenException } from "../../../infraestructure/common/exceptions/exceptions";
import { Roles } from "../../auth/domain/enum/Roles";
import { autenticacionMiddleware } from "./autenticacionMidleware";

export const autorizacionMiddleware = (roles: Roles[]) => (ctx: IContextMiddeware) => {
   const decodedJwt = autenticacionMiddleware(ctx);
   if(!roles.includes(decodedJwt.id_rol)){
    throw new ForbiddenException('No tienes permisos sobre este endpoint')
   }
};