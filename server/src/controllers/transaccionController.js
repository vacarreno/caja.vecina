import * as s from "../services/transaccionService.js";
import { transaccionSchema } from "../validators/transaccionValidator.js";

export async function crear(req, res, next) {
  try {
    const { error } = transaccionSchema.validate(req.body);
    if (error) throw error;

    const data = await s.procesarTransaccion(req.body);
    res.json({
      mensaje: "Transacción exitosa",
      saldo_nuevo: data.saldo_nuevo
    });

  } catch (e) { next(e); }
}
