import { inject, injectable } from "inversify";
import { CommonTypes } from "../../../_common/dependencies/Types";
import { ILogger } from "../../../_common/domain/repositories/ILogger";
import { IUseCase } from '../../../_common/domain/repositories/IUseCase';
import { EnvioTypes } from "../../dependencies/Types";
import { IEnvioRepository } from "../../domain/repositories/IEnvioRepository";
import { INumeroGuia } from "../dtos/in/INumeroGuia";
import { IRastreoGuiaResponse } from "../dtos/out/IRastreoGuiaResponse";
import { NotFoundException } from "../../../../infraestructure/common/exceptions/exceptions";

@injectable()
export class ConsultaRastreoGuiaUseCase implements IUseCase {
    @inject(EnvioTypes.EnvioRepository) private _envioRepository: IEnvioRepository;
    @inject(CommonTypes.Logger) private logger: ILogger;

    async execute(data: INumeroGuia): Promise<IRastreoGuiaResponse> {
        this.logger.debug("Consulta rastreo guia")
        const results =  await this._envioRepository.consultaRastreoGuia(data.numero_guia);
        if(!results){
            throw new NotFoundException("No se eoncontró la guia a buscar");
        }
        return results
    }

}