import { SwaggerTag } from "../../../common/enum/SwaggerTag";
import { ICrearEnvioValidation } from "../../validations/ICrearEnvioValidation";
import { ERROR_400, ERROR_500, inputSwagger, jsonToSchema } from "../config";

export const crearEnvioViaSchema = {
  tags: [SwaggerTag.Envios],
  summary:
    "Permite al ADMIN o CLIENTE crear un nuevo envio de un paquete",
  body: inputSwagger(ICrearEnvioValidation),
  response: {
    200: jsonToSchema({
      is_error: false,
      data: {
        numero_guia:"12345678910"
      },
    }),
    400: jsonToSchema(ERROR_400),
    500: jsonToSchema(ERROR_500),
  },
};
