import { inject, injectable } from "inversify";
import { CommonTypes } from "../../../_common/dependencies/Types";
import { ILogger } from "../../../_common/domain/repositories/ILogger";
import { IUseCase } from '../../../_common/domain/repositories/IUseCase';
import { EnvioTypes } from "../../dependencies/Types";
import { IEnvioRepository } from "../../domain/repositories/IEnvioRepository";
import { IIDRuta } from "../dtos/in/INumeroGuia";
import { IConsultaVehiculosResponse } from "../dtos/out/IConsultaVehiculosResponse";
@injectable()
export class ConsultaVehiculosUseCase implements IUseCase {
    @inject(EnvioTypes.EnvioRepository) private _envioRepository: IEnvioRepository;
    @inject(CommonTypes.Logger) private logger: ILogger;

    async execute(data: IIDRuta): Promise<IConsultaVehiculosResponse[]> {
        this.logger.debug("Proceso consulta veniculos disponibles segun ruta")
        return await this._envioRepository.consultaVehiculos(data.id_ruta);
    }

}