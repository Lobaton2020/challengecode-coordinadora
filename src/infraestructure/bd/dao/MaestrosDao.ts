import { inject, injectable } from "inversify";
import { IDatabase, IMain } from "pg-promise";
import { DbException } from "../../common/exceptions/exceptions";
import { DEPENDENCIES_INJECTION } from "../../../modules/_common/dependencies/Dependencies";
import { CommonTypes } from "../../../modules/_common/dependencies/Types";
import { IMaestroRepository } from "../../../modules/maestros/domain/repositories/IMaestroRepository";
import { ILogger } from "../../../modules/_common/domain/repositories/ILogger";
import { IRolResponse } from "../../../modules/maestros/application/dtos/out/IRolResponse";
import { ITipoProductoResponse } from "../../../modules/maestros/application/dtos/out/ITipoProductoResponse";

@injectable()
export class MaestrosDao implements IMaestroRepository {

  private db = DEPENDENCIES_INJECTION.get<IDatabase<IMain>>(CommonTypes.Bd);
  @inject(CommonTypes.Logger) private logger: ILogger;

  async consultaRoles(): Promise<IRolResponse[]> {
    try {
      const query = `SELECT id_rol as id,
                            nombre,
                            esta_activo
                            FROM roles`;
      return await this.db.many<IRolResponse>(query);
    } catch (error: any) {
      this.logger.error(error)
      throw new DbException("Error al consultar maestro roles", error.message);
    }
  }
  async consultaTiposProducto(): Promise<ITipoProductoResponse[]> {
    try {
      const query = `SELECT id_tipo_producto as id,
                            nombre,
                            esta_activo
                            FROM tipos_producto`;
      return await this.db.many<ITipoProductoResponse>(query);
    } catch (error: any) {
      this.logger.error(error)
      throw new DbException("Error al consultar maestro tipos producto", error.message);
    }
  }
}
