import { inject, injectable } from "inversify";
import { CommonTypes } from "../../../_common/dependencies/Types";
import { ILogger } from "../../../_common/domain/repositories/ILogger";
import { IUseCase } from '../../../_common/domain/repositories/IUseCase';
import { EnvioTypes } from "../../dependencies/Types";
import { IEnvioRepository } from "../../domain/repositories/IEnvioRepository";
import { IPaginate } from "../../../_common/domain/repositories/IPaginate";
import { IConsultarOrdenesEnvioDto } from "../dtos/in/IConsultarOrdenesEnvioDto";
import { IConsultaEnviosResponse } from "../dtos/out/IConsultaEnviosResponse";
@injectable()
export class ConsultaEnviosUseCase implements IUseCase {
    @inject(EnvioTypes.EnvioRepository) private _envioRepository: IEnvioRepository;
    @inject(CommonTypes.Logger) private logger: ILogger;

    async execute(_data: IConsultarOrdenesEnvioDto): Promise<IPaginate<IConsultaEnviosResponse>> {
        this.logger.debug("Proceso creacion de orden de envio de un paquete")
        const [
            data,
            count
        ] = await Promise.all([
            this._envioRepository.consultarOrdenesEnvio(_data),
            this._envioRepository.consultarOrdenesEnvioCount(_data)
        ])
        return {
            count,
            data
        }
    }
}