import "../dependencies/Dependencies";
import { IContextMiddeware } from "../domain/repositories/IPayload";
import jwt from 'jsonwebtoken'
import { UnathorizedException } from "../../../infraestructure/common/exceptions/exceptions";
import { ENV } from "../../../infraestructure/env";
import { ISessionData } from "../domain/dtos/ISessionData";

export const autenticacionMiddleware = (ctx: IContextMiddeware): ISessionData => {
    const token = ctx.headers["authorization"]?.split(" ")[1];
    if (!token) {
        throw new UnathorizedException('No tienes acceso se requiere token');
    }
    try {
        return jwt.verify(token, ENV.SECRET_KEY_JWT) as ISessionData;
    } catch (error) {
        throw new UnathorizedException('El token es invalido o esta expirado');
    }
};