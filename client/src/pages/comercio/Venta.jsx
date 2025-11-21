import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import http from "../../api/http";

export default function Venta() {
  const { id } = useParams();
  const [vecino, setVecino] = useState(null);
  const [monto, setMonto] = useState("");
  const [boleta, setBoleta] = useState("");
  const [loading, setLoading] = useState(false);

  const load = async () => {
    const res = await http.get(`/vecinos/${id}`);
    setVecino(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const cargarBoleta = (e) => {
    const reader = new FileReader();
    reader.onloadend = () => setBoleta(reader.result);
    reader.readAsDataURL(e.target.files[0]);
  };

  const procesar = async () => {
    if (!monto || monto <= 0) {
      alert("Debe ingresar un monto válido.");
      return;
    }

    if (monto > vecino.saldo_disponible) {
      alert("El monto supera el saldo disponible.");
      return;
    }

    setLoading(true);

    try {
      const comercio_id = 1; // luego por JWT

      const res = await http.post("/transacciones", {
        vecino_id: id,
        comercio_id,
        monto,
        boleta_base64: boleta
      });

      alert(`Venta registrada. Nuevo saldo: ${res.data.nuevoSaldo}`);

      window.location.href = "/comercio/scan";

    } catch (err) {
      alert("Error procesando venta");
    } finally {
      setLoading(false);
    }
  };

  if (!vecino) return <p>Cargando...</p>;

  return (
    <div className="container mt-4">

      <div className="text-center">
        <img
          src={vecino.foto_url}
          width={130}
          className="rounded-circle mb-2"
        />
        <h4>{vecino.nombre}</h4>
        <p className="text-muted">
          Saldo disponible: <strong>${vecino.saldo_disponible}</strong>
        </p>
      </div>

      <div className="mt-3">
        <label>Monto de la compra</label>
        <input
          type="number"
          className="form-control"
          placeholder="Ingrese monto"
          onChange={(e) => setMonto(Number(e.target.value))}
        />
      </div>

      <div className="mt-3">
        <label>Fotografía de la boleta (opcional)</label>
        <input
          type="file"
          className="form-control"
          accept="image/*"
          onChange={cargarBoleta}
        />
      </div>

      <button
        className="btn btn-primary w-100 mt-4"
        disabled={loading}
        onClick={procesar}
      >
        {loading ? "Procesando..." : "Confirmar Venta"}
      </button>
    </div>
  );
}
