import { inject, injectable } from "inversify";
import { IMaestroRepository } from "../../domain/repositories/IMaestroRepository";
import { IRolResponse } from "../dtos/out/IRolResponse";
import { MaestrosTypes } from "../../dependencies/Types";
import { CommonTypes } from "../../../_common/dependencies/Types";
import { ILogger } from "../../../_common/domain/repositories/ILogger";
import { IUseCase } from '../../../_common/domain/repositories/IUseCase';
@injectable()
export class ConsultaRolesUseCase implements IUseCase {
    @inject(MaestrosTypes.MaestroRepository) private _maestroRepository: IMaestroRepository;
    @inject(CommonTypes.Logger) private logger: ILogger;
    async execute(): Promise<IRolResponse[]> {
        this.logger.debug("Se consultan maestro roles")
        return this._maestroRepository.consultaRoles()
    }

}