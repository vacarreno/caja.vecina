import { db } from "../config/db.js";
import { verify } from "../utils/password.js";
import { generarToken } from "../utils/jwt.js";
import { ENV } from "../config/env.js";

export async function loginComercio({ usuario, clave }) {
  const q = await db.query(
    "SELECT * FROM comercios WHERE usuario=$1 AND activo=true",
    [usuario]
  );

  if (q.rowCount === 0)
    throw new Error("Comercio no encontrado");

  const comer = q.rows[0];

  if (!verify(clave, comer.clave_hash))
    throw new Error("Clave incorrecta");

  const token = generarToken(
    { id: comer.id, rol: "comercio" },
    ENV.JWT_SECRET_COMERCIO,
    "1d"
  );

  return { token };
}

export async function listarComercios() {
  const q = await db.query("SELECT id, nombre, usuario, activo FROM comercios");
  return q.rows;
}
