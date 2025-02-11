import Joi from "joi";
import { IIDRuta } from "../../../modules/envios/application/dtos/in/INumeroGuia";

export const IRutaGuiaValidation = Joi.object<IIDRuta>({
    id_ruta: Joi.number().integer().required(),
});