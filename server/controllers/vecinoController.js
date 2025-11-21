import { db } from "../config/db.js";

export const obtenerPerfil = async (req, res) => {
  const { id } = req.params;

  const q = await db.query(
    "SELECT * FROM vecinos WHERE id=$1",
    [id]
  );

  if (q.rowCount === 0)
    return res.status(404).json({ error: "Vecino no encontrado" });

  res.json(q.rows[0]);
};
