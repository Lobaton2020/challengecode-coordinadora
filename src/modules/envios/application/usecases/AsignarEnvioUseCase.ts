import { inject, injectable } from "inversify";
import { CommonTypes } from "../../../_common/dependencies/Types";
import { ILogger } from "../../../_common/domain/repositories/ILogger";
import { IUseCase } from '../../../_common/domain/repositories/IUseCase';
import { EnvioTypes } from "../../dependencies/Types";
import { IEnvioRepository } from "../../domain/repositories/IEnvioRepository";
import { BadRequestException } from "../../../../infraestructure/common/exceptions/exceptions";
import { IAsignarEnvioDto } from "../dtos/in/IAsignarEnvioDto";
import { IConsultaVehiculosResponse } from "../dtos/out/IConsultaVehiculosResponse";

@injectable()
export class AsignarEnvioUseCase implements IUseCase {
    @inject(EnvioTypes.EnvioRepository) private _envioRepository: IEnvioRepository;
    @inject(CommonTypes.Logger) private logger: ILogger;

    private async validarCapacidadDelVehiculo(vehiculo: IConsultaVehiculosResponse, data: IAsignarEnvioDto){
        const detallePaquete = await this._envioRepository.consultarCapacidadEnvio(data.numero_guia);
        if(!detallePaquete){
            throw new BadRequestException("La guia es invalida o no corresponde con el id_orden_envio")
        }
        if(detallePaquete.peso_g > vehiculo.peso_disponible){
            throw new BadRequestException("El paquete excede el peso disponible en el vehiculo seleccionado")
        }
        if(detallePaquete.volumen_m3 > vehiculo.volumen_disponible){
            throw new BadRequestException("El paquete excede el volumen disponible en el vehiculo seleccionado")
        }
    }

    async execute(data: IAsignarEnvioDto): Promise<void> {
        this.logger.debug("Proceso creacion de orden de envio de un paquete")
        const [
            jornadas,
            transportistas
        ] = await Promise.all([
            this._envioRepository.consultaJornadaGuia(data.numero_guia),
            this._envioRepository.consultaTransportistas(),
        ])

        const transportista = transportistas.find(x => x.id_transportista === data.id_transportista)
        if(!transportista){
            throw new BadRequestException("El transportista no existe o es invalido")
        }

        const jornada = jornadas.find(x => x.id_jornada === data.id_jornada)
        if(!jornada){
            throw new BadRequestException("La jornada no existe o es invalida")
        }

        const vehiculos = await this._envioRepository.consultaVehiculos(jornada.id_ruta);
        const vehiculo = vehiculos.find(x => x.id_vehiculo === data.id_vehiculo)
        if(!vehiculo){
            throw new BadRequestException("El vehiculo no existe o es invalido")
        }

        await this.validarCapacidadDelVehiculo(vehiculo, data);
        await this._envioRepository.asignarEnvio(data);
    }

}