import { useState } from "react";
import QRScanner from "../../components/QRScanner.jsx";
import api from "../../api/axios.js";

export default function ComercioScanner() {
  const [vecino, setVecino] = useState(null);
  const [monto, setMonto] = useState("");

  async function handleScan(token) {
    const r = await api.post("/qr/validar", { token });
    setVecino(r.data);
  }

  async function procesar() {
    await api.post("/transacciones", {
      vecino_id: vecino.id,
      comercio_id: 1, // leer desde auth
      monto,
      boleta: null
    });

    alert("Transacción OK");
    window.location.reload();
  }

  return (
    <div className="container mt-3">
      {!vecino && <QRScanner onScan={handleScan} />}

      {vecino && (
        <div className="mt-4">
          <h4>{vecino.nombre}</h4>
          <p>Saldo: ${vecino.saldo}</p>

          <input className="form-control" value={monto} onChange={e => setMonto(e.target.value)} placeholder="Monto" />

          <button className="btn btn-success mt-3" onClick={procesar}>
            Confirmar
          </button>
        </div>
      )}
    </div>
  );
}
