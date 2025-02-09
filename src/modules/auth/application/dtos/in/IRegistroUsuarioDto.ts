import { ILoginDto } from "./ILoginDto";

export interface IRegistroUsuarioDto extends ILoginDto {
  nombre: string;
  id_rol: number;
}
