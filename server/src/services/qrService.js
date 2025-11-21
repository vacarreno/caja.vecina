import jwt from "jsonwebtoken";
import qr from "qr-image";
import { db } from "../config/db.js";
import { ENV } from "../config/env.js";

export async function generarQR(vecino_id) {
  const q = await db.query(
    "SELECT qr_secret FROM vecinos WHERE id=$1",
    [vecino_id]
  );

  if (q.rowCount === 0)
    throw new Error("Vecino no encontrado");

  const { qr_secret } = q.rows[0];

  const token = jwt.sign(
    { vecino_id },
    ENV.JWT_SECRET_QR + qr_secret,
    { expiresIn: "60s" }
  );

  const svg = qr.image(token, { type: "svg" });
  return svg;
}

export async function validarQR(token) {
  // Primero debemos decodificar sin validar
  let decoded;
  try {
    decoded = jwt.decode(token);
  } catch {
    throw new Error("QR inválido");
  }

  const vecino_id = decoded.vecino_id;

  const q = await db.query(
    "SELECT id, nombre, telefono, foto, saldo, qr_secret FROM vecinos WHERE id=$1",
    [vecino_id]
  );

  if (q.rowCount === 0)
    throw new Error("Vecino no encontrado");

  const v = q.rows[0];

  try {
    jwt.verify(token, ENV.JWT_SECRET_QR + v.qr_secret);
  } catch {
    throw new Error("QR expirado o inválido");
  }

  return v;
}
