import { inject, injectable } from "inversify";
import { IMaestroRepository } from "../../domain/repositories/IMaestroRepository";
import { MaestrosTypes } from "../../dependencies/Types";
import { CommonTypes } from "../../../_common/dependencies/Types";
import { ILogger } from "../../../_common/domain/repositories/ILogger";
import { IUseCase } from '../../../_common/domain/repositories/IUseCase';
import { ITipoProductoResponse } from '../dtos/out/ITipoProductoResponse';

@injectable()
export class ConsultaTiposProductoUseCase implements IUseCase {
    @inject(MaestrosTypes.MaestroRepository) private _maestroRepository: IMaestroRepository;
    @inject(CommonTypes.Logger) private logger: ILogger;
    async execute(): Promise<ITipoProductoResponse[]> {
        this.logger.debug("Se consultan maestro tipos producto")
        return this._maestroRepository.consultaTiposProducto()
    }

}