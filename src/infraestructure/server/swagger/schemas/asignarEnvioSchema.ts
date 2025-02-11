import { SwaggerTag } from "../../../common/enum/SwaggerTag";
import { IAsignarEnvioValidation } from "../../validations/IAsignarEnvioValidation";
import { ERROR_400, ERROR_500, inputSwagger, jsonToSchema } from "../config";

export const asignarEnvioSchema = {
  tags: [SwaggerTag.Envios],
  summary:
    "Asigna un envio a una ruta, transportista, y el envio como tal",
  body: inputSwagger(IAsignarEnvioValidation),
  response: {
    200: jsonToSchema({
      is_error: false,
      data: null,
    }),
    400: jsonToSchema(ERROR_400),
    500: jsonToSchema(ERROR_500),
  },
};
