import * as s from "../services/vecinoService.js";
import { crearVecinoSchema } from "../validators/vecinoValidator.js";

export async function crear(req, res, next) {
  try {
    const { error } = crearVecinoSchema.validate(req.body);
    if (error) throw error;

    const data = await s.crearVecino(req.body);
    res.json(data);

  } catch (e) { next(e); }
}

export async function obtener(req, res, next) {
  try {
    const data = await s.obtenerVecino(req.params.id);
    res.json(data);
  } catch (e) { next(e); }
}
