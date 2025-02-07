import { inject, injectable } from "inversify";
import { IUseCase } from "../../../common/domain/repositories/IUseCase";
import { AuthTypes } from "../../dependencies/Types";
import { CommonTypes } from "../../../common/dependencies/Types";
import { ILogger } from "../../../common/domain/repositories/ILogger";
import { IAuthRepository } from "../../domain/repositories/IAuthRepository";
import { IRegistroUsuarioDto } from "../dtos/in/IRegistroUsuarioDto";
import { BadRequestException } from '../../../../infraestructure/common/exceptions/exceptions';
import bcrypt from 'bcrypt'
@injectable()
export class RegistroUsuarioUseCase implements IUseCase{
    @inject(AuthTypes.AuthRepository) private _authRepository: IAuthRepository;
    @inject(CommonTypes.Logger) private logger: ILogger;
    async execute(record: IRegistroUsuarioDto): Promise<void> {
        const usuario = await this._authRepository.consultaCorreo(record.correo);
        if(usuario){
            this.logger.debug(`Correo ${record.correo} ya esta registrado`)
            throw new BadRequestException('El correo del usuario ya se encuentra registrado');

        }
        const salt = await bcrypt.genSalt(10)
        record.contrasena = await bcrypt.hash(record.contrasena, salt);
        await this._authRepository.registro(record)
    }

}