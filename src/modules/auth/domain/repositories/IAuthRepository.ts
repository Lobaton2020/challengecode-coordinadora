import { ILoginDto } from "../../application/dtos/in/ILoginDto";
import { ITokenResponse } from "../../application/dtos/out/ITokenResponse";
import { IRegistroUsuarioDto } from '../../application/dtos/in/IRegistroUsuarioDto';
import { IConsultaCorreoResponse } from "../../application/dtos/out/IConsultaCorreoResponse";

export interface IAuthRepository {
  login(data: ILoginDto): Promise<ITokenResponse>;
  registro(data: IRegistroUsuarioDto): Promise<void>;
  consultaCorreo(correo:string): Promise<IConsultaCorreoResponse | null>
}