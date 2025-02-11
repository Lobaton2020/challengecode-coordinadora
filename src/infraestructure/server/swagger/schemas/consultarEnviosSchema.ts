import { SwaggerTag } from "../../../common/enum/SwaggerTag";
import { IConsultaOrdenesEnvioValidation } from "../../validations/IConsultaOrdenesEnvioValidation";
import { ERROR_400, ERROR_500, inputSwagger, jsonToSchema } from "../config";

export const consultarEnviosSchema = {
  tags: [SwaggerTag.Envios],
  summary: "Consulta detallada de informacion de envios paquetes, asignaciones",
  querystring: inputSwagger(IConsultaOrdenesEnvioValidation),
  response: {
    200: jsonToSchema({
      is_error: false,
      data: {
        count: 100,
        data: [
          {
            id_orden_envio: 12345,
            numero_guia: "ABC123456",
            tipo_producto: "Electrónicos",
            peso_g: 2500,
            id_estado_envio: 3,
            estado_envio: "En tránsito",
            fecha_estado: "2025-02-10T14:30:00Z",
            id_creador: 42,
            creador: "Juan Pérez",
            id_transportista: 8,
            transportista: "Carlos Gómez",
            vehiculo: "XYZ-123",
            fecha_jornada: "2025-02-10",
            hora_inicio: "08:00:00",
            hora_fin: "18:00:00",
            id_ruta: 5,
            ruta: "Bogotá - Medellín",
            tiempo_entrega_estimado_horas: 6
        }
        ]
      },
    }),
    400: jsonToSchema(ERROR_400),
    500: jsonToSchema(ERROR_500),
  },
};
