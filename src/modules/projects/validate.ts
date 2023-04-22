import Joi from "joi";

const str = () => Joi.string().trim().lowercase();
const str_length = (min: Number, max: Number, joi: any) =>
  joi.min(min).max(max);

export const rules = {
  created: Joi.object().keys({
    name: str_length(3, 30, str()),
    description: Joi.allow(null),
    type: str().required(),
  }),
  updated: Joi.object().keys({
    name: str_length(3, 30, str()),
    description: Joi.allow(null),
    type: str().required(),
  }),
};
