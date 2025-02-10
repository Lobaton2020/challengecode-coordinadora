import { inject, injectable } from "inversify";
import { IDatabase, IMain } from "pg-promise";
import { DbException } from "../../common/exceptions/exceptions";
import { DEPENDENCIES_INJECTION } from "../../../modules/_common/dependencies/Dependencies";
import { CommonTypes } from "../../../modules/_common/dependencies/Types";
import { IMaestroRepository } from "../../../modules/maestros/domain/repositories/IMaestroRepository";
import { ILogger } from "../../../modules/_common/domain/repositories/ILogger";
import { IRolResponse } from "../../../modules/maestros/application/dtos/out/IRolResponse";
import { ITipoProductoResponse } from "../../../modules/maestros/application/dtos/out/ITipoProductoResponse";
import { ITipoViaResponse } from "../../../modules/maestros/application/dtos/out/ITipoViaResponse";
import { CacheRepository } from "../../../modules/_common/domain/repositories/CacheRepository";
import {
  MAESTRO_MAESTRO_CIUDADES,
  MAESTRO_ROLES,
  MAESTRO_TIPOS_PRODUCTO,
  MAESTRO_TIPOS_VIA,
} from "../../cache/keys";
import { ENV } from "../../env";
import { ICiudadResponse } from "../../../modules/maestros/application/dtos/out/ICiudadResponse";

@injectable()
export class MaestrosDao implements IMaestroRepository {

  @inject(CommonTypes.Bd) private db: IDatabase<IMain>;
  @inject(CommonTypes.CacheRepository) private cache: CacheRepository;
  @inject(CommonTypes.Logger) private logger: ILogger;

  async consultaRoles(): Promise<IRolResponse[]> {
    try {
      const cachedData = await this.cache.get<IRolResponse[]>(MAESTRO_ROLES);
      if (cachedData) {
        return cachedData;
      }
      const query = `SELECT id_rol as id,
                            nombre,
                            esta_activo
                            FROM roles`;
      const data = await this.db.many<IRolResponse>(query);
      await this.cache.setEx(MAESTRO_ROLES, ENV.EXP_HOURS_CACHE_MAESTROS, data);
      return data;
    } catch (error: any) {
      this.logger.error(error);
      throw new DbException("Error al consultar maestro roles", error.message);
    }
  }
  async consultaTiposProducto(): Promise<ITipoProductoResponse[]> {
    try {
      const cachedData = await this.cache.get<IRolResponse[]>(
        MAESTRO_TIPOS_PRODUCTO
      );
      if (cachedData) {
        return cachedData;
      }
      const query = `SELECT id_tipo_producto as id,
                            nombre,
                            esta_activo
                            FROM tipos_producto`;
      const data = await this.db.many<ITipoProductoResponse>(query);
      await this.cache.setEx(
        MAESTRO_TIPOS_PRODUCTO,
        ENV.EXP_HOURS_CACHE_MAESTROS,
        data
      );
      return data;
    } catch (error: any) {
      this.logger.error(error);
      throw new DbException(
        "Error al consultar maestro tipos producto",
        error.message
      );
    }
  }

  async consultaTiposVia(): Promise<ITipoViaResponse[]> {
    try {
      const cachedData = await this.cache.get<ITipoViaResponse[]>(
        MAESTRO_TIPOS_VIA
      );
      if (cachedData) {
        return cachedData;
      }
      const query = `SELECT id_tipo_via as id,
                            nombre,
                            esta_activo
                            FROM tipos_via`;
      const data = await this.db.many<ITipoViaResponse>(query);
      await this.cache.setEx(
        MAESTRO_TIPOS_VIA,
        ENV.EXP_HOURS_CACHE_MAESTROS,
        data
      );
      return data;
    } catch (error: any) {
      this.logger.error(error);
      throw new DbException(
        "Error al consultar maestro tipos de vias",
        error.message
      );
    }
  }
  async consultaCiudades(): Promise<ICiudadResponse[]> {
    try {
      const cachedData = await this.cache.get<ICiudadResponse[]>(
        MAESTRO_MAESTRO_CIUDADES
      );
      if (cachedData) {
        return cachedData;
      }
      const query = `SELECT c.id_ciudad as id,
                            c.nombre,
                            c.esta_activo,
                            d.nombre as nombre_departamento,
                            d.abreviado as abreviado_departamento
              FROM ciudades c
              INNER JOIN departamentos d ON c.id_departamento = d.id_departamento
                            `;
      const data = await this.db.many<ICiudadResponse>(query);
      await this.cache.setEx(
        MAESTRO_MAESTRO_CIUDADES,
        ENV.EXP_HOURS_CACHE_MAESTROS,
        data
      );
      return data;
    } catch (error: any) {
      this.logger.error(error);
      throw new DbException(
        "Error al consultar maestro ciudades",
        error.message
      );
    }
  }
}
