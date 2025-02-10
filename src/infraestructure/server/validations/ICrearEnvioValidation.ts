import Joi from "joi";
import { ICrearEnvioDto, IDireccion } from "../../../modules/envios/application/dtos/in/ICrearEnvioDto";

export const IDireccionValidation = Joi.object<IDireccion>({
    id_tipo_via: Joi.number().integer().positive().required(),
    id_ciudad: Joi.number().integer().positive().required(),
    via: Joi.string().required().min(1),
    numero: Joi.string().required().min(1),
    detalle: Joi.string().optional().default(''),
});

export const ICrearEnvioValidation = Joi.object<ICrearEnvioDto>({
    peso_g: Joi.number().integer().positive().required(),
    id_tipo_producto: Joi.number().integer().positive().required(),
    es_fragil: Joi.boolean().required(),
    direccion_remitente: IDireccionValidation.required(),
    direccion_destino: IDireccionValidation.required(),
    contenido: Joi.string().required().min(1),
    largo_cm: Joi.number().integer().positive().required(),
    ancho_cm: Joi.number().integer().positive().required(),
    alto_cm: Joi.number().integer().positive().required(),
});