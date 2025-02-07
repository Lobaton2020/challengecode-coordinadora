import { Roles } from "../../../domain/enum/Roles";
import { ILoginDto } from "./ILoginDto";

export interface IRegistroUsuarioDto extends ILoginDto{
    nombre: string;
    roles: Roles[]
}