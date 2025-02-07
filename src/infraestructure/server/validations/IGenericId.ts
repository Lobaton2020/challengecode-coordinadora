import Joi from "joi";
import { GenericId } from "../../../../modules/common/domain/dtos/GenericId";

export const IGenericId = Joi.object<GenericId>({
  id: Joi.number().integer().positive().required(),
});
