import { inject, injectable } from "inversify";
import { IUseCase } from "../../../_common/domain/repositories/IUseCase";
import { AuthTypes } from "../../dependencies/Types";
import { CommonTypes } from "../../../_common/dependencies/Types";
import { ILogger } from "../../../_common/domain/repositories/ILogger";
import { IAuthRepository } from "../../domain/repositories/IAuthRepository";
import {
  BadRequestException,
  NotFoundException,
} from "../../../../infraestructure/common/exceptions/exceptions";
import bcrypt from "bcrypt";
import { ILoginDto } from "../dtos/in/ILoginDto";
import { IConsultaCorreoResponse } from "../dtos/out/IConsultaCorreoResponse";
import { ENV } from "../../../../infraestructure/env";
import { ITokenResponse } from "../dtos/out/ITokenResponse";
import jwt, { SignOptions } from "jsonwebtoken";
import { ISessionData } from "../../../_common/domain/dtos/ISessionData";

@injectable()
export class ValidacionUsuarioUseCase implements IUseCase {
  @inject(AuthTypes.AuthRepository) private _authRepository: IAuthRepository;
  @inject(CommonTypes.Logger) private logger: ILogger;

  private generateJwt(usuario: IConsultaCorreoResponse): string {
    const payload:ISessionData = {
      id: usuario.id_usuario,
      id_rol: usuario.id_rol,
      correo: usuario.correo,
    };
    return jwt.sign(payload, ENV.SECRET_KEY_JWT, {
      expiresIn: `${ENV.EXP_HOURS_JWT}h`,
      algorithm: "HS256",
    } as SignOptions);
  }

  async execute(record: ILoginDto): Promise<ITokenResponse> {
    const usuario = await this._authRepository.consultaCorreo(record.correo);
    if (!usuario) {
      this.logger.debug(`Correo ${record.correo} no existe`);
      throw new NotFoundException("El correo no se encuenta activo");
    }
    const isSamePassword = await bcrypt.compare(
      record.contrasena,
      usuario.contrasena
    );
    if (!isSamePassword) {
      throw new BadRequestException("La contraseña es incorrecta.");
    }

    const token = this.generateJwt(usuario);

    return {
      access_token: token,
      refresh_token: "pendiente por hacer", //TODO:
      tiempo_expiracion_horas: parseInt(ENV.EXP_HOURS_JWT),
    };
  }
}