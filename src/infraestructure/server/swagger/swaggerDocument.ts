import { healthCheckSchema } from "./schemas/healthCheckSchema";
import { registroUsuarioSchema } from "./schemas/registroUsuarioSchema";
import { validacionUsuarioSchema } from "./schemas/validacionUsuarioSchema";

export const swaggerDocument: any = {
  "/healthcheck": {
    GET: healthCheckSchema,
  },
  "/auth/registro": {
    POST: registroUsuarioSchema,
  },
  "/auth/login": {
    POST: validacionUsuarioSchema,
  },
};

