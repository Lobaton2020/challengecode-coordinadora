import { inject, injectable } from "inversify";
import { IDatabase, IMain } from "pg-promise";
import { IAuthRepository } from "../../../modules/auth/domain/repositories/IAuthRepository";
import { IRegistroUsuarioDto } from "../../../modules/auth/application/dtos/in/IRegistroUsuarioDto";
import { IConsultaCorreoResponse } from "../../../modules/auth/application/dtos/out/IConsultaCorreoResponse";
import { CommonTypes } from "../../../modules/_common/dependencies/Types";
import { ILogger } from "../../../modules/_common/domain/repositories/ILogger";
import { DbException } from "../../common/exceptions/exceptions";

@injectable()
export class AuthDao implements IAuthRepository {
  @inject(CommonTypes.Bd) private db: IDatabase<IMain>;
  @inject(CommonTypes.Logger) private logger: ILogger;

  async registro(data: IRegistroUsuarioDto): Promise<void> {
    try {
      const query = `INSERT INTO usuarios (nombre, correo, contrasena, fecha_creacion, id_rol)
      VALUES
          ($/nombre/, $/correo/, $/contrasena/, CURRENT_TIMESTAMP, $/id_rol/);
      `;
      await this.db.none(query, data);
    } catch (error: any) {
      this.logger.error(error);
      throw new DbException(
        "Error al consultar email existente",
        error.message
      );
    }
  }
  async consultaCorreo(
    correo: string
  ): Promise<IConsultaCorreoResponse | null> {
    try {
      const query = `SELECT id_usuario, correo, contrasena, id_rol FROM usuarios WHERE correo = $1`;
      return await this.db.oneOrNone(query, [correo]);
    } catch (error: any) {
      this.logger.error(error);
      throw new DbException(
        "Error al consultar email existente",
        error.message
      );
    }
  }
}
