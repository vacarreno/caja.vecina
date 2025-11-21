import { db } from "../config/db.js";
import qr from "qr-image";
import jwt from "jsonwebtoken";

export const generarQR = async (req, res) => {
  const { vecino_id } = req.params;

  // Generar token JWT válido por 60 segundos
  const token = jwt.sign(
    { vecino_id },
    process.env.JWT_SECRET,
    { expiresIn: "60s" }
  );

  const svg = qr.image(token, { type: "svg" });

  res.setHeader("Content-Type", "image/svg+xml");
  svg.pipe(res);
};

export const validarQR = async (req, res) => {
  try {
    const { token } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const q = await db.query(
      `SELECT id, nombre, telefono, foto_url, saldo_disponible 
       FROM vecinos WHERE id=$1`,
      [decoded.vecino_id]
    );

    if (q.rowCount === 0)
      return res.status(404).json({ error: "Vecino no encontrado" });

    res.json(q.rows[0]);

  } catch (e) {
    return res.status(401).json({ error: "QR inválido o expirado" });
  }
};
