import { consultaCiudadesSchema } from "./schemas/consultaCiudadesSchema";
import { consultaGuiaRastreoSchema } from "./schemas/consultaGuiaRastreoSchema";
import { consultaRolesSchema } from "./schemas/consultaRolesSchema";
import { consultaTiposProductoSchema } from "./schemas/consultaTiposProductoSchema";
import { consultaTiposViaSchema } from "./schemas/consultaTiposViaSchema";
import { crearEnvioViaSchema } from "./schemas/crearEnvioSchema";
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

  "/maestros/tipos-via": {
    GET: {
      handler: consultaTiposViaSchema,
      security: true,
    },
  },
  "/maestros/ciudades": {
    GET: {
      handler: consultaCiudadesSchema,
      security: true,
    },
  },
  "/envios": {
    POST: {
      handler: crearEnvioViaSchema,
      security: true,
    },
  },
  "/envios/rastreo/{numero_guia}": {
    GET: {
      handler: consultaGuiaRastreoSchema,
      security: true,
    },
  }
};
