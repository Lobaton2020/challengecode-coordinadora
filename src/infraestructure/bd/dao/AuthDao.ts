import { inject, injectable } from "inversify";
import { IDatabase, IMain } from "pg-promise";
import { IAuthRepository } from "../../../modules/auth/domain/repositories/IAuthRepository";
import { ILoginDto } from "../../../modules/auth/application/dtos/in/ILoginDto";
import { IRegistroUsuarioDto } from "../../../modules/auth/application/dtos/in/IRegistroUsuarioDto";
import { IConsultaCorreoResponse } from "../../../modules/auth/application/dtos/out/IConsultaCorreoResponse";
import { ITokenResponse } from "../../../modules/auth/application/dtos/out/ITokenResponse";
import { DEPENDENCIES_INJECTION } from "../../../modules/common/dependencies/Dependencies";
import { CommonTypes } from "../../../modules/common/dependencies/Types";
import { DbException } from "../../common/exceptions/exceptions";
import { ILogger } from "../../../modules/common/domain/repositories/ILogger";

@injectable()
export class AuthDao implements IAuthRepository {
  private db = DEPENDENCIES_INJECTION.get<IDatabase<IMain>>(CommonTypes.Bd);
  @inject(CommonTypes.Logger) private logger: ILogger;

  async registro(data: IRegistroUsuarioDto): Promise<void> {
    try {
      const query = `INSERT INTO usuarios (nombre, correo, contrasena, fecha_creacion, roles)
      VALUES
          ($/nombre/, $/correo/, $/contrasena/, CURRENT_TIMESTAMP, $/roles/);
      `;
      await this.db.none(query, data);
    } catch (error: any) {
      this.logger.error(error)
      throw new DbException("Error al consultar email existente", error.message);
    }
  }
  async consultaCorreo(correo: string): Promise<IConsultaCorreoResponse | null> {
    try {
      const query = `SELECT id_usuario, correo, contrasena, roles FROM usuarios WHERE correo = $1`;
      return await this.db.oneOrNone(query, [correo]);
    } catch (error: any) {
      this.logger.error(error)
      throw new DbException("Error al consultar email existente", error.message);
    }
  }
}
