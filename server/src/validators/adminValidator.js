import Joi from "joi";

export const adminLoginSchema = Joi.object({
  usuario: Joi.string().required(),
  clave: Joi.string().required(),
});
