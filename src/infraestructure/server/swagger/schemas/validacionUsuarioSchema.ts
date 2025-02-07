import { SwaggerTag } from "../../../common/enum/SwaggerTag";
import { IValidacionUsuarioValidation } from "../../validations/IValidacionUsuarioValidation";
import { ERROR_400, ERROR_500, inputSwagger, jsonToSchema } from "../config";

export const validacionUsuarioSchema = {
  tags: [SwaggerTag.Privado],
  summary: "Valida si un usuario tiene una cuenta creada y retorna un JWT para poder acceder al sistema.",
  body: inputSwagger(IValidacionUsuarioValidation),
  response: {
    200: jsonToSchema({
      isError: false,
      data: {
        access_token: "jwt token",
        refresh_token: "jwt token",
        tiempo_expiracion_horas: 4
      },
    }),
    400: jsonToSchema(ERROR_400),
    500: jsonToSchema(ERROR_500),
  },
};
