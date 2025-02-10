import { SwaggerTag } from "../../../common/enum/SwaggerTag";
import { IRastreoGuiaValidation } from "../../validations/IRastreoGuiaValidation";
import { ERROR_400, ERROR_500, inputSwagger, jsonToSchema } from "../config";

export const consultaGuiaRastreoSchema = {
  tags: [SwaggerTag.Envios],
  summary:
    "Consulta detalle del estado de una guia",
  params: inputSwagger(IRastreoGuiaValidation),
  response: {
    200: jsonToSchema({
      is_error: false,
      data: {
        destino: {
            id_ciudad: 1,
            nombre_ciudad: 'Bogota',
            abreviado_departamento: 'CUN',
        },
        remitente: {
          id_ciudad: 2,
          nombre_ciudad: 'Medellin',
          abreviado_departamento: 'ANT',
        },
        estado_actual: {
          id_estado: 2,
          nombre: 'En transito',
          fecha_creacion: new Date().toISOString()
        },
        estados_historial: [
          {
            id_estado: 1,
            nombre: 'En espera',
            fecha_creacion: new Date().toISOString()
          }
        ],
    },
    }),
    400: jsonToSchema(ERROR_400),
    500: jsonToSchema(ERROR_500),
  },
};
