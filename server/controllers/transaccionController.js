import { db } from "../config/db.js";

export const registrarTransaccion = async (req, res) => {
  const client = await db.connect();

  try {
    const { vecino_id, comercio_id, monto, boleta_base64 } = req.body;

    // ============================
    // VALIDACIONES INICIALES
    // ============================

    if (!vecino_id || !comercio_id) {
      return res.status(400).json({ error: "Datos incompletos" });
    }

    if (monto === undefined || monto === null) {
      return res.status(400).json({ error: "Debe ingresar un monto" });
    }

    if (isNaN(monto) || Number(monto) <= 0) {
      return res.status(400).json({ error: "Monto inválido" });
    }

    const montoNum = Number(monto);

    // ============================
    // OBTENER SALDO DEL VECINO
    // ============================

    const q = await client.query(
      "SELECT saldo_disponible FROM vecinos WHERE id = $1",
      [vecino_id]
    );

    if (q.rowCount === 0) {
      return res.status(404).json({ error: "Vecino no encontrado" });
    }

    const saldo = Number(q.rows[0].saldo_disponible);

    if (montoNum > saldo) {
      return res.status(400).json({ error: "Saldo insuficiente" });
    }

    // ============================
    // INICIO TRANSACCIÓN (BEGIN)
    // ============================

    await client.query("BEGIN");

    const nuevoSaldo = saldo - montoNum;

    // ============================
    // ACTUALIZAR SALDO DEL VECINO
    // ============================

    await client.query(
      `UPDATE vecinos 
       SET saldo_disponible = $1 
       WHERE id = $2`,
      [nuevoSaldo, vecino_id]
    );

    // ============================
    // GUARDAR TRANSACCIÓN
    // ============================

    await client.query(
      `INSERT INTO transacciones
        (vecino_id, comercio_id, monto_gastado, monto_antes, monto_despues, boleta_url)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        vecino_id,
        comercio_id,
        montoNum,
        saldo,               // saldo antes
        nuevoSaldo,          // saldo después
        boleta_base64 || ""  // boleta opcional
      ]
    );

    // ============================
    // CONFIRMAR TRANSACCIÓN
    // ============================

    await client.query("COMMIT");

    return res.json({
      mensaje: "Transacción registrada correctamente",
      monto_gastado: montoNum,
      saldo_antes: saldo,
      saldo_despues: nuevoSaldo
    });

  } catch (error) {
    console.error("ERROR registrarTransaccion:", error);

    try {
      await client.query("ROLLBACK");
    } catch (rollbackError) {
      console.error("ERROR en ROLLBACK:", rollbackError);
    }

    return res.status(500).json({
      error: "Error procesando transacción",
      detalle: error.message
    });

  } finally {
    client.release();
  }
};
