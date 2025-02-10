import { inject, injectable } from "inversify";
import { IMaestroRepository } from "../../domain/repositories/IMaestroRepository";
import { MaestrosTypes } from "../../dependencies/Types";
import { CommonTypes } from "../../../_common/dependencies/Types";
import { ILogger } from "../../../_common/domain/repositories/ILogger";
import { IUseCase } from '../../../_common/domain/repositories/IUseCase';
import { ITipoViaResponse } from "../dtos/out/ITipoViaResponse";
@injectable()
export class ConsultaTiposViaUseCase implements IUseCase {
    @inject(MaestrosTypes.MaestroRepository) private _maestroRepository: IMaestroRepository;
    @inject(CommonTypes.Logger) private logger: ILogger;
    async execute(): Promise<ITipoViaResponse[]> {
        this.logger.debug("Se consultan maestro tipos vias")
        return this._maestroRepository.consultaTiposVia()
    }

}