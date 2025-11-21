import { useEffect, useState } from "react";
import http from "../../api/http";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function Dashboard() {
  const [vecino, setVecino] = useState(null);

  const load = async () => {
    const id = 1; // luego dinámico por login
    const res = await http.get(`/vecinos/${id}`);
    setVecino(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  if (!vecino) return <p>Cargando...</p>;

  return (
    <>
      <Navbar />
      <div className="container mt-4">

        <div className="text-center">
          <img
            src={vecino.foto_url}
            alt="foto"
            width={140}
            className="rounded-circle"
          />
        </div>

        <h3 className="mt-3">{vecino.nombre}</h3>
        <p>Saldo disponible: <strong>${vecino.saldo_disponible}</strong></p>

        <Link to="/qr" className="btn btn-success w-100 mt-4">
          Ver mi QR
        </Link>
      </div>
    </>
  );
}
