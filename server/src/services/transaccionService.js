import { db } from "../config/db.js";
import { guardarBoleta } from "../utils/uploadBase64.js";

export async function procesarTransaccion({ vecino_id, comercio_id, monto, boleta }) {
  const client = await db.connect();

  try {
    const q1 = await client.query(
      "SELECT saldo FROM vecinos WHERE id=$1",
      [vecino_id]
    );

    if (q1.rowCount === 0)
      throw new Error("Vecino no encontrado");

    const saldo_actual = q1.rows[0].saldo;

    if (monto > saldo_actual)
      throw new Error("Saldo insuficiente");

    await client.query("BEGIN");

    const saldo_nuevo = saldo_actual - monto;

    await client.query(
      "UPDATE vecinos SET saldo=$1 WHERE id=$2",
      [saldo_nuevo, vecino_id]
    );

    const boleta_url = guardarBoleta(boleta);

    await client.query(
      `INSERT INTO transacciones(vecino_id, comercio_id, monto, saldo_antes, saldo_despues, boleta_url)
       VALUES($1,$2,$3,$4,$5,$6)`,
      [vecino_id, comercio_id, monto, saldo_actual, saldo_nuevo, boleta_url]
    );

    await client.query("COMMIT");

    return { saldo_nuevo };

  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}
