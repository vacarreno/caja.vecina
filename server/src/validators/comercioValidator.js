import Joi from "joi";

export const comercioLoginSchema = Joi.object({
  usuario: Joi.string().required(),
  clave: Joi.string().required(),
});
