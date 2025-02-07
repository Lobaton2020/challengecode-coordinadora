import Joi, { Schema } from "joi";
import { ValidationException } from "../exceptions/exceptions";

export const validateData = <T>(schema: Schema, data: any): T => {
  const { error, value } = schema.validate(data, {
    abortEarly: true,
    convert: true,
  });
  if (error) {
    throw new ValidationException(
      "Error validando la informacion",
      error.message
    );
  }
  return value;
};
