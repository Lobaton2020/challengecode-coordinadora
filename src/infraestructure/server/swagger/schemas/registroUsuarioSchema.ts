import { SwaggerTag } from "../../../common/enum/SwaggerTag";
import { IRegistroUsuarioValidation } from "../../validations/IRegistroUsuarioValidation";
import { ERROR_400, ERROR_500, inputSwagger, jsonToSchema } from "../config";

export const registroUsuarioSchema = {
  tags: [SwaggerTag.Privado],
  summary: "Crea un nuevo usuario dentro del sistema",
  body: inputSwagger(IRegistroUsuarioValidation),
  response: {
    201: jsonToSchema({
      isError: false,
      data: null,
    }),
    400: jsonToSchema(ERROR_400),
    500: jsonToSchema(ERROR_500),
  },
};
