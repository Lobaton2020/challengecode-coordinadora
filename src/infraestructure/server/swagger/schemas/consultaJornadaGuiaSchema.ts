import { SwaggerTag } from "../../../common/enum/SwaggerTag";
import { IRastreoGuiaValidation } from "../../validations/IRastreoGuiaValidation";
import { ERROR_400, ERROR_500, inputSwagger, jsonToSchema } from "../config";

export const consultaJornadaGuiaSchema = {
  tags: [SwaggerTag.Envios],
  summary:
    "Consulta lor horaros de las jornadas disponibles para asignar el envio",
  params: inputSwagger(IRastreoGuiaValidation),
  response: {
    200: jsonToSchema({
      is_error: false,
      data: [
        {
          id_jornada: 1,
          id_ruta: 101,
          ciudad_remitente: "1 - Bogotá",
          ciudad_destino: "2 - Medellín",
          hora_inicio: "08:00:00",
          hora_fin: "14:00:00"
      }
      ],
    }),
    400: jsonToSchema(ERROR_400),
    500: jsonToSchema(ERROR_500),
  },
};
