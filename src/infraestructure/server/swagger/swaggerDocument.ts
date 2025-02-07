import { healthCheckSchema } from "./schemas/healthCheckSchema";
import { registroUsuarioSchema } from "./schemas/registroUsuarioSchema";

export const swaggerDocument: any = {
  "/healthcheck": {
    GET: healthCheckSchema,
  },
  "/auth/registro": {
    POST: registroUsuarioSchema,
  },
};

