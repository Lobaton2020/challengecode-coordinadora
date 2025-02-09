import { consultaRolesSchema } from "./schemas/consultaRolesSchema";
import { consultaTiposProductoSchema } from "./schemas/consultaTiposProductoSchema";
import { healthCheckSchema } from "./schemas/healthCheckSchema";
import { registroUsuarioSchema } from "./schemas/registroUsuarioSchema";
import { validacionUsuarioSchema } from "./schemas/validacionUsuarioSchema";

export const swaggerDocument: any = {
  "/healthcheck": {
    GET: {
      handler: healthCheckSchema,
    },
  },
  "/auth/registro": {
    POST: {
      handler: registroUsuarioSchema,
    },
  },
  "/auth/login": {
    POST: {
      handler: validacionUsuarioSchema,
    },
  },
  "/maestros/tipos-producto": {
    GET: {
      handler: consultaTiposProductoSchema,
      security: true,
    },
  },
  "/maestros/roles": {
    GET: {
      handler: consultaRolesSchema,
      security: true,
    },
  },
};
