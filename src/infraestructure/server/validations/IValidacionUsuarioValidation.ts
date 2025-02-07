import Joi from "joi";
import { ILoginDto } from "../../../modules/auth/application/dtos/in/ILoginDto";

export const IValidacionUsuarioValidation = Joi.object<ILoginDto>({
    contrasena: Joi.string().max(255).required().min(8),
    correo: Joi.string().email().required(),
});