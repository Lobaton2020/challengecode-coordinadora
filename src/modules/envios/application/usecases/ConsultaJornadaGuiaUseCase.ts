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
import { INumeroGuia } from "../dtos/in/INumeroGuia";
import { IConsultaJonadaGuiaResponse } from "../dtos/out/IConsultaJonadaGuiaResponse";
@injectable()
export class ConsultaJornadaGuiaUseCase implements IUseCase {
    @inject(EnvioTypes.EnvioRepository) private _envioRepository: IEnvioRepository;
    @inject(CommonTypes.Logger) private logger: ILogger;

    async execute(data: INumeroGuia): Promise<IConsultaJonadaGuiaResponse[]> {
        this.logger.debug("Proceso consulta jornadas de la guia para el envio del paquete")
        return await this._envioRepository.consultaJornadaGuia(data.numero_guia);
    }

}