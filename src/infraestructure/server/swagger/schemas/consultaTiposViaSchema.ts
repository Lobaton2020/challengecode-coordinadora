import { SwaggerTag } from "../../../common/enum/SwaggerTag";
import { ERROR_400, ERROR_500, jsonToSchema } from "../config";

export const consultaTiposViaSchema = {
  tags: [SwaggerTag.Maestros],
  summary:
    "Consulta lista de tipos de via segun maestro",
  response: {
    200: jsonToSchema({
      is_error: false,
      data: [{
        id: 1,
        nombre: 'Avenidas',
        esta_activo: true
      }],
    }),
    400: jsonToSchema(ERROR_400),
    500: jsonToSchema(ERROR_500),
  },
};
