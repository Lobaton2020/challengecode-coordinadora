import { inject, injectable } from "inversify";
import { CommonTypes } from "../../../_common/dependencies/Types";
import { ILogger } from "../../../_common/domain/repositories/ILogger";
import { IUseCase } from '../../../_common/domain/repositories/IUseCase';
import { EnvioTypes } from "../../dependencies/Types";
import { IEnvioRepository } from "../../domain/repositories/IEnvioRepository";
import { IConsultaTransportistasDto } from "../dtos/out/IConsultaTransportistasDto";

@injectable()
export class ConsultaTransportistasUseCase implements IUseCase {
    @inject(EnvioTypes.EnvioRepository) private _envioRepository: IEnvioRepository;
    @inject(CommonTypes.Logger) private logger: ILogger;

    async execute(): Promise<IConsultaTransportistasDto[]> {
        this.logger.debug("Se consultan transportistas disponibles hoy")
        return this._envioRepository.consultaTransportistas()
    }

}