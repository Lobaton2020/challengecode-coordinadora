import { ICiudadResponse } from "../../application/dtos/out/ICiudadResponse";
import { IRolResponse } from "../../application/dtos/out/IRolResponse";
import { ITipoProductoResponse } from "../../application/dtos/out/ITipoProductoResponse";
import { ITipoViaResponse } from "../../application/dtos/out/ITipoViaResponse";

export interface IMaestroRepository {
  consultaRoles(): Promise<IRolResponse[]>;
  consultaTiposProducto(): Promise<ITipoProductoResponse[]>;
  consultaTiposVia(): Promise<ITipoViaResponse[]>;
  consultaCiudades(): Promise<ICiudadResponse[]>;
}