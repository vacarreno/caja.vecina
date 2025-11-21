import { db } from "../config/db.js";
import { hash, verify } from "../utils/password.js";
import { generarToken } from "../utils/jwt.js";
import { ENV } from "../config/env.js";

export async function loginAdmin({ usuario, clave }) {
  const q = await db.query(
    "SELECT * FROM admins WHERE usuario=$1",
    [usuario]
  );

  if (q.rowCount === 0) throw new Error("Usuario no existe");

  const admin = q.rows[0];

  if (!verify(clave, admin.clave_hash))
    throw new Error("Clave incorrecta");

  const token = generarToken(
    { id: admin.id, rol: "admin" },
    ENV.JWT_SECRET_ADMIN,
    "1d"
  );

  return { token };
}

export async function crearAdmin({ usuario, clave }) {
  const clave_hash = hash(clave);
  await db.query(
    "INSERT INTO admins(usuario, clave_hash) VALUES($1,$2)",
    [usuario, clave_hash]
  );
  return { mensaje: "Admin creado" };
}
