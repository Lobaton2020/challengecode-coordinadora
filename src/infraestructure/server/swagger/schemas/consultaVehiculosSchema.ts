import { SwaggerTag } from "../../../common/enum/SwaggerTag";
import { IRastreoGuiaValidation } from "../../validations/IRastreoGuiaValidation";
import { IRutaGuiaValidation } from "../../validations/IRutaGuiaValidation";
import { ERROR_400, ERROR_500, inputSwagger, jsonToSchema } from "../config";

export const consultaVehiculosSchema = {
  tags: [SwaggerTag.Envios],
  summary:
    "Consulta los vehiculos disponibles segun las rutas",
  params: inputSwagger(IRutaGuiaValidation),
  response: {
    200: jsonToSchema({
      is_error: false,
      data: [
        {
          id_vehiculo: 1,
          fecha: "2025-02-10",
          capacidad_total_peso_k: 3000000.00,
          capacidad_total_volumen: 10.50,
          peso_disponible: 2999500.00,
          volumen_disponible: 7.50
        }
      ],
    }),
    400: jsonToSchema(ERROR_400),
    500: jsonToSchema(ERROR_500),
  },
};
