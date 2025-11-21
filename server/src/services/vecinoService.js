import { db } from "../config/db.js";
import { generarToken } from "../utils/jwt.js";
import { ENV } from "../config/env.js";

export async function loginVecino({ rut }) {
  const q = await db.query(
    "SELECT * FROM vecinos WHERE rut=$1 AND activo=true",
    [rut]
  );

  if (q.rowCount === 0)
    throw new Error("Vecino no encontrado");

  const vec = q.rows[0];

  const token = generarToken(
    { id: vec.id, rol: "vecino" },
    ENV.JWT_SECRET_VECINO,
    "1d"
  );

  return { token };
}

export async function crearVecino(data) {
  const q = await db.query(
    `INSERT INTO vecinos(nombre, rut, telefono, direccion, foto, saldo, qr_secret)
     VALUES($1,$2,$3,$4,$5,$6, gen_random_uuid())
     RETURNING *`,
    [data.nombre, data.rut, data.telefono, data.direccion, data.foto, data.saldo]
  );
  return q.rows[0];
}

export async function obtenerVecino(id) {
  const q = await db.query("SELECT * FROM vecinos WHERE id=$1", [id]);
  return q.rows[0];
}
