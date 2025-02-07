import { SwaggerTag } from "../../../common/enum/SwaggerTag";
import { jsonToSchema } from "../config";

export const healthCheckSchema = {
  description: "HealthCheck route",
  tags: [SwaggerTag.Publico],
  summary: "Test healthcheck",
  response: {
    200: jsonToSchema({ message: "OK" }),
  },
};
