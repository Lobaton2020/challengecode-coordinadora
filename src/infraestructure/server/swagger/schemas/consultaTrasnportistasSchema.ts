import { SwaggerTag } from "../../../common/enum/SwaggerTag";
import { ERROR_400, ERROR_500, jsonToSchema } from "../config";

export const consultaTrasnportistasSchema = {
  tags: [SwaggerTag.Envios],
  summary:
    "Consulta lista de trasnpostirstas del dia actual, que no tienen asignacion",
  response: {
    200: jsonToSchema({
      is_error: false,
      data: [{
        id_transportista: 1,
        nombre: 'Avenidas',
        telefono: '3242131232'
      }],
    }),
    400: jsonToSchema(ERROR_400),
    500: jsonToSchema(ERROR_500),
  },
};
