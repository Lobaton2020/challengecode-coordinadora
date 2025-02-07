import joiToSwagger from "joi-to-swagger";

export const swaggerConfig = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Coordinadora Api",
      version: "1.0.0",
    },
  },
};

type JsonValue =
  | string
  | number
  | boolean
  | null
  | { [key: string]: JsonValue }
  | JsonValue[];

interface JsonSchema {
  description?: string;
  type: string;
  properties?: { [key: string]: JsonSchema };
  items?: JsonSchema;
  example?: JsonValue;
}

export const inputSwagger = (x: any) => joiToSwagger(x).swagger;

export function jsonToSchema(json: { [key: string]: JsonValue }): JsonSchema {
  const getType = (value: JsonValue): string => {
    if (Array.isArray(value)) return "array";
    if (value === null) return "null";
    return typeof value;
  };

  const createSchema = (value: JsonValue): JsonSchema => {
    const type = getType(value);
    const schema: JsonSchema = {
      type,
      example: value,
    };

    if (type === "object") {
      const properties: { [key: string]: JsonSchema } = {};
      for (const key in value as { [key: string]: JsonValue }) {
        properties[key] = createSchema(
          (value as { [key: string]: JsonValue })[key]
        );
      }
      schema.properties = properties;
    } else if (type === "array") {
      schema.items =
        (value as JsonValue[]).length > 0
          ? createSchema((value as JsonValue[])[0])
          : { type: "null" };
    }

    return schema;
  };

  return {
    description: "Generated schema",
    type: "object",
    properties: createSchema(json).properties,
  };
}

export const ERROR_500 = {
  is_error: true,
  reference: "Error",
  code: 500,
  message: "",
  cause: 'duplicate key value violates unique constraint "apikeys_email_key"',
};

export const ERROR_400 = {
  is_error: true,
  message: 'body.email should match format "email"',
  detail: {
    validation: [
      {
        keyword: "format",
        dataPath: ".email",
        schemaPath: "#/properties/email/format",
        params: {
          format: "email",
        },
        message: 'should match format "email"',
      },
    ],
    validationContext: "body",
  },
};
