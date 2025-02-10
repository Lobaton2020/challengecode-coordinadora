import { inject, injectable } from "inversify";
import { IMaestroRepository } from "../../domain/repositories/IMaestroRepository";
import { MaestrosTypes } from "../../dependencies/Types";
import { CommonTypes } from "../../../_common/dependencies/Types";
import { ILogger } from "../../../_common/domain/repositories/ILogger";
import { IUseCase } from '../../../_common/domain/repositories/IUseCase';
import { ICiudadResponse } from "../dtos/out/ICiudadResponse";
@injectable()
export class ConsultaCiudadesUseCase implements IUseCase {
    @inject(MaestrosTypes.MaestroRepository) private _maestroRepository: IMaestroRepository;
    @inject(CommonTypes.Logger) private logger: ILogger;

    async execute(): Promise<ICiudadResponse[]> {
        this.logger.debug("Se consultan maestro ciudades vias")
        return this._maestroRepository.consultaCiudades()
    }

}