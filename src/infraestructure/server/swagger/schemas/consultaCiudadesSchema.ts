import { SwaggerTag } from "../../../common/enum/SwaggerTag";
import { ERROR_400, ERROR_500, jsonToSchema } from "../config";

export const consultaCiudadesSchema = {
  tags: [SwaggerTag.Maestros],
  summary:
    "Consulta lista de ciudades segun maestro donde se tiene conbertura",
  response: {
    200: jsonToSchema({
      is_error: false,
      data: [{
        id: 1,
        nombre: 'Granada',
        esta_activo: true,
        nombre_departamento: 'Meta',
        abreviado_departamento: 'MET',
      }],
    }),
    400: jsonToSchema(ERROR_400),
    500: jsonToSchema(ERROR_500),
  },
};
