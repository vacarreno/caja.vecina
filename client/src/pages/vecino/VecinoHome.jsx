import { useEffect, useState } from "react";
import api from "../../api/axios.js";
import { useAuth } from "../../auth/AuthContext.jsx";

export default function VecinoHome() {
  const { user } = useAuth();
  const [info, setInfo] = useState(null);

  useEffect(() => {
    api.get(`/vecino/${user.id}`).then(r => setInfo(r.data));
  }, []);

  if (!info) return <p>Cargando…</p>;

  return (
    <div className="container text-center mt-4">
      <h3>{info.nombre}</h3>
      <p>Saldo disponible: ${info.saldo}</p>

      <img
        src={`${import.meta.env.VITE_API_URL}/qr/${user.id}`}
        alt="QR"
        style={{ width: "80%" }}
      />
    </div>
  );
}
