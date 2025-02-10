import { ICrearEnvioDto } from "../../application/dtos/in/ICrearEnvioDto";
import { ICrearEnvioResponse } from "../../application/dtos/out/ICrearEnvioResponse";
import { IRastreoGuiaResponse } from "../../application/dtos/out/IRastreoGuiaResponse";

export interface IEnvioRepository {
  crearEnvio(idUser: number, data: ICrearEnvioDto): Promise<ICrearEnvioResponse>;
  consultaRastreoGuia(numeroGuia: string): Promise<IRastreoGuiaResponse | null>
}