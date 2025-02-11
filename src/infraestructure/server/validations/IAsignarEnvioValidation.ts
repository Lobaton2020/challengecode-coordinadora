import Joi from "joi";
import { IAsignarEnvioDto } from "../../../modules/envios/application/dtos/in/IAsignarEnvioDto";

export const IAsignarEnvioValidation = Joi.object<IAsignarEnvioDto>({
    id_jornada: Joi.number().integer().required(),
    id_orden_envio: Joi.number().integer().required(),
    id_vehiculo: Joi.number().integer().required(),
    id_transportista: Joi.number().integer().required(),
    numero_guia: Joi.string().required().min(11).max(12),
});