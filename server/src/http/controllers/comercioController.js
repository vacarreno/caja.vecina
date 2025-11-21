import { db } from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginComercio = async (req, res) => {
  const { rut, password } = req.body;

  const q = await db.query("SELECT * FROM comerciantes WHERE rut=$1", [rut]);

  if (q.rowCount === 0)
    return res.status(404).json({ error: "Comercio no encontrado" });

  const comercio = q.rows[0];

  if (!bcrypt.compareSync(password, comercio.password_hash))
    return res.status(401).json({ error: "Contraseña incorrecta" });

  const token = jwt.sign(
    { id: comercio.id, role: "comercio" },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );

  res.json({ token, nombre: comercio.nombre });
};
