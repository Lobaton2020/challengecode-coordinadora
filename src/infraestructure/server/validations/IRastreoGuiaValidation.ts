import Joi from "joi";
import { INumeroGuia } from "../../../modules/envios/application/dtos/in/INumeroGuia";

export const IRastreoGuiaValidation = Joi.object<INumeroGuia>({
    numero_guia: Joi.string().required().min(11).max(12),
});