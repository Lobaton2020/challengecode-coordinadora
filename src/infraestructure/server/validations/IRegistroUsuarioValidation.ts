import Joi from "joi";
import { IRegistroUsuarioDto } from "../../../modules/auth/application/dtos/in/IRegistroUsuarioDto";
import { Roles } from "../../../modules/auth/domain/enum/Roles";

export const IRegistroUsuarioValidation = Joi.object<IRegistroUsuarioDto>({
  nombre: Joi.string().max(255).required(),
  contrasena: Joi.string().max(255).required().min(8),
  id_rol: Joi.number()
    .integer()
    .positive()
    .required()
    .valid(...Object.values(Roles)),
  correo: Joi.string().email().required(),
});