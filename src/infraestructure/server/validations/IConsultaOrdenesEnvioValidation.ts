import Joi from "joi";
import { IConsultarOrdenesEnvioDto } from "../../../modules/envios/application/dtos/in/IConsultarOrdenesEnvioDto";

const patternRexExp = /^(\d{4}-(0[1-9]|1[0-2]|2[0-3])-(0[1-9]|1\d|2\d|3[01]))(,\d{4}-(0[1-9]|1[0-2]|2[0-3])-(0[1-9]|1\d|2\d|3[01]))*$/;

export const IConsultaOrdenesEnvioValidation = Joi.object<IConsultarOrdenesEnvioDto>({
    numero_guia: Joi.string().max(12).optional(),
    id_estado_envio: Joi.number().integer().positive().optional(),
    id_transportista: Joi.number().integer().positive().optional(),
    fecha_estado: Joi.string().pattern(patternRexExp).optional(),
    pagina: Joi.number().integer().positive().optional().default(1),
    cantidad_pagina: Joi.number().integer().positive().optional().max(500).default(100),
});