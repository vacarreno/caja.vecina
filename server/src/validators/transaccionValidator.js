import Joi from "joi";

export const transaccionSchema = Joi.object({
  vecino_id: Joi.number().required(),
  comercio_id: Joi.number().required(),
  monto: Joi.number().positive().required(),
  boleta: Joi.string().allow(null, ""),
});
