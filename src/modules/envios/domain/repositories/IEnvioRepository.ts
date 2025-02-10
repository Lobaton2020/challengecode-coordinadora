import { ICrearEnvioDto } from "../../application/dtos/in/ICrearEnvioDto";
import { ICrearEnvioResponse } from "../../application/dtos/out/ICrearEnvioResponse";

export interface IEnvioRepository {
  crearEnvio(idUser: number, data: ICrearEnvioDto): Promise<ICrearEnvioResponse>;
}