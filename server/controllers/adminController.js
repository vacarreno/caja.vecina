import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../config/db.js";

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const q = await db.query(
      "SELECT * FROM admins WHERE email=$1",
      [email]
    );

    if (q.rowCount === 0)
      return res.status(404).json({ error: "Admin no encontrado" });

    const admin = q.rows[0];

    const valid = bcrypt.compareSync(password, admin.password_hash);
    if (!valid) return res.status(401).json({ error: "Credenciales incorrectas" });

    const token = jwt.sign(
      { id: admin.id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({ token, nombre: admin.nombre });

  } catch (e) {
    res.status(500).json({ error: "Error en login" });
  }
};
