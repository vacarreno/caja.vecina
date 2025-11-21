import * as qr from "../services/qrService.js";

export async function generar(req, res, next) {
  try {
    const svg = await qr.generarQR(req.params.id);

    res.setHeader("Content-Type", "image/svg+xml");
    svg.pipe(res);

  } catch (e) { next(e); }
}

export async function validar(req, res, next) {
  try {
    const v = await qr.validarQR(req.body.token);
    res.json(v);
  } catch (e) { next(e); }
}
