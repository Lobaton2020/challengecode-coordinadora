import { IRolResponse } from "../../application/dtos/out/IRolResponse";
import { ITipoProductoResponse } from "../../application/dtos/out/ITipoProductoResponse";

export interface IMaestroRepository {
  consultaRoles(): Promise<IRolResponse[]>;
  consultaTiposProducto(): Promise<ITipoProductoResponse[]>;
}