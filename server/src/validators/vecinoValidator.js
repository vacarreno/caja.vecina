import Joi from "joi";

export const crearVecinoSchema = Joi.object({
  nombre: Joi.string().required(),
  rut: Joi.string().required(),
  telefono: Joi.string().required(),
  direccion: Joi.string().required(),
  foto: Joi.string().allow(null, ""),
  saldo: Joi.number().default(0),
});
