import { OpenAPIV3 } from 'openapi-types';
export interface FastifySchema {
  description?: string;
  tags?: string[];
  summary?: string;
  params?: {
    type: string;
    properties: {
      [key: string]: { type: string };
    };
  };
  querystring?: {
    type: string;
    properties: {
      [key: string]: { type: string };
    };
  };
  headers?: {
    type: string;
    properties: {
      [key: string]: { type: string };
    };
  };
  body?: {
    type: string;
    required?: string[];
    properties: {
      [key: string]: { type: string };
    };
  };
  response?: {
    [statusCode: number]: {
      description: string;
      type: string;
      properties: {
        [key: string]: { type: string };
      };
      example?: any;
    };
  };
}

interface FastifyRoute {
  method: string;
  schema: FastifySchema;
}

interface FastifySchemas {
  [route: string]: {
    [method: string]: {
      handler: FastifySchema;
      security?: boolean;
    };
  };
}

export const convertFastifySchemaToSwagger = (
  fastifySchemas: FastifySchemas
): OpenAPIV3.PathsObject => {
  const paths: OpenAPIV3.PathsObject = {};

  Object.keys(fastifySchemas).forEach((route) => {
    const methods = fastifySchemas[route];
    const swaggerPath: any = {};

    Object.keys(methods).forEach((method) => {
      const schema = methods[method].handler;
      const responses: OpenAPIV3.ResponsesObject = {};

      if (schema.response) {
        Object.keys(schema.response).forEach((statusCode) => {
          const responseSchema = schema.response![Number(statusCode)];
          responses[statusCode] = {
            description: responseSchema.description,
            content: {
              "application/json": {
                schema: {
                  type: responseSchema.type,
                  properties: responseSchema.properties,
                } as any,
                example: responseSchema.example,
              },
            },
          };
        });
      }

      const parameters: OpenAPIV3.ParameterObject[] = [];

      if (schema.params) {
        Object.keys(schema.params.properties).forEach((param) => {
          parameters.push({
            name: param,
            in: "path",
            required: true,
            schema: { type: schema?.params?.properties[param]?.type } as any,
          });
        });
      }

      if (schema.querystring) {
        Object.keys(schema.querystring.properties).forEach((query) => {
          parameters.push({
            name: query,
            in: "query",
            required: false,
            schema: {
              type: schema?.querystring?.properties[query].type,
            } as any,
          });
        });
      }

      if (schema.headers) {
        Object.keys(schema.headers.properties).forEach((header) => {
          parameters.push({
            name: header,
            in: "header",
            required: false,
            schema: { type: schema?.headers?.properties[header].type } as any,
          });
        });
      }

      const requestBody: OpenAPIV3.RequestBodyObject = {
        content: {
          "application/json": {
            schema: schema.body || ({} as any),
          },
        },
        required: schema.body ? true : false,
      };

      swaggerPath[method.toLowerCase() as keyof OpenAPIV3.PathItemObject] = {
        summary: schema.summary,
        description: schema.description,
        tags: schema.tags,
        parameters: parameters.length > 0 ? parameters : undefined,
        requestBody: schema.body ? requestBody : undefined,
        responses: responses,
        security: methods[method]?.security ? [{ BearerAuth: [] }] : undefined,
      } as OpenAPIV3.OperationObject;
    });

    paths[route] = swaggerPath;
  });

  return paths;
};
