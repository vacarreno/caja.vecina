import * as s from "../services/comercioService.js";
import { comercioLoginSchema } from "../validators/comercioValidator.js";

export async function login(req, res, next) {
  try {
    const { error } = comercioLoginSchema.validate(req.body);
    if (error) throw error;

    const data = await s.loginComercio(req.body);
    res.json(data);

  } catch (e) {
    next(e);
  }
}
