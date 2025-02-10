import { inject, injectable } from "inversify";
import { CommonTypes } from "../../../_common/dependencies/Types";
import { ILogger } from "../../../_common/domain/repositories/ILogger";
import { IUseCase } from '../../../_common/domain/repositories/IUseCase';
import { EnvioTypes } from "../../dependencies/Types";
import { IEnvioRepository } from "../../domain/repositories/IEnvioRepository";
import { ISessionData } from "../../../_common/domain/dtos/ISessionData";
import { ICrearEnvioDto } from "../dtos/in/ICrearEnvioDto";
import { ICrearEnvioResponse } from "../dtos/out/ICrearEnvioResponse";
import { MaestrosTypes } from "../../../maestros/dependencies/Types";
import { IMaestroRepository } from "../../../maestros/domain/repositories/IMaestroRepository";
import { BadRequestException } from "../../../../infraestructure/common/exceptions/exceptions";
import { ITipoViaResponse } from "../../../maestros/application/dtos/out/ITipoViaResponse";
import { ICiudadResponse } from "../../../maestros/application/dtos/out/ICiudadResponse";
@injectable()
export class CrearEnvioUseCase implements IUseCase {
    @inject(EnvioTypes.EnvioRepository) private _envioRepository: IEnvioRepository;
    @inject(MaestrosTypes.MaestroRepository) private _maestroRepository: IMaestroRepository;
    @inject(CommonTypes.Logger) private logger: ILogger;

    private validarDireccion(ciudades: ICiudadResponse[], tiposVias: ITipoViaResponse[], data: ICrearEnvioDto){
        const ciudadDestino = ciudades.find(x => x.id === data.direccion_destino.id_ciudad)
        const ciudadRemitente = ciudades.find(x => x.id === data.direccion_remitente.id_ciudad)
        if(!ciudadDestino){
            throw new BadRequestException("El id de la ciudad destino es invalido")
        }
        if(!ciudadRemitente){
            throw new BadRequestException("El id de la ciudad remitente es invalido")
        }
        const viaRemitente = tiposVias.find(x => x.id === data.direccion_remitente.id_tipo_via)
        const viaDestino = tiposVias.find(x => x.id === data.direccion_destino.id_tipo_via)

        if(!viaDestino){
            throw new BadRequestException("El id del tipo de via destino es invalido")
        }
        if(!viaRemitente){
            throw new BadRequestException("El id del tipo de via remitente es invalido")
        }
    }

    async execute(session: ISessionData, data: ICrearEnvioDto): Promise<ICrearEnvioResponse> {
        this.logger.debug("Proceso creacion de orden de envio de un paquete")
        const [
            tiposProducto,
            tiposVias,
            ciudades
        ] = await Promise.all([
            this._maestroRepository.consultaTiposProducto(),
            this._maestroRepository.consultaTiposVia(),
            this._maestroRepository.consultaCiudades(),
        ])
        this.validarDireccion(ciudades, tiposVias, data);
        const tipoProducto = tiposProducto.find(x => x.id === data.id_tipo_producto)

        if(!tipoProducto){
            throw new BadRequestException("El id del tipo de producto es invalido")
        }
        return await this._envioRepository.crearEnvio(session.id, data);
    }

}