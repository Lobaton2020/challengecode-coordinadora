import { IAsignarEnvioDto } from "../../application/dtos/in/IAsignarEnvioDto";
import { ICapacidadPaqueteDto } from "../../application/dtos/in/ICapacidadPaqueteDto";
import { ICrearEnvioDto } from "../../application/dtos/in/ICrearEnvioDto";
import { IConsultaJonadaGuiaResponse } from "../../application/dtos/out/IConsultaJonadaGuiaResponse";
import { IConsultaTransportistasDto } from "../../application/dtos/out/IConsultaTransportistasDto";
import { IConsultaVehiculosResponse } from "../../application/dtos/out/IConsultaVehiculosResponse";
import { ICrearEnvioResponse } from "../../application/dtos/out/ICrearEnvioResponse";
import { IRastreoGuiaResponse } from "../../application/dtos/out/IRastreoGuiaResponse";

export interface IEnvioRepository {
  crearEnvio(idUser: number, data: ICrearEnvioDto): Promise<ICrearEnvioResponse>;
  consultaRastreoGuia(numeroGuia: string): Promise<IRastreoGuiaResponse | null>
  consultaTransportistas(): Promise<IConsultaTransportistasDto[]>
  consultaJornadaGuia(numeroGuia: string): Promise<IConsultaJonadaGuiaResponse[]>
  consultaVehiculos(idRuta: number): Promise<IConsultaVehiculosResponse[]>
  asignarEnvio(data: IAsignarEnvioDto): Promise<void>;
  consultarCapacidadEnvio(numeroGuia: string): Promise<ICapacidadPaqueteDto | null>;
}