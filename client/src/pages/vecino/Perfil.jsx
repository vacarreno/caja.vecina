import { useEffect, useState } from "react";
import http from "../../api/http";

export default function Perfil() {
  const [data, setData] = useState(null);

  const load = async () => {
    const res = await http.get("/vecinos/1");
    setData(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  if (!data) return <p>Cargando...</p>;

  return (
    <div className="container mt-4">
      <h3>Perfil</h3>

      <img
        src={data.foto_url}
        width={150}
        className="rounded mb-3"
      />

      <p>Nombre: {data.nombre}</p>
      <p>Teléfono: {data.telefono}</p>
      <p>Dirección: {data.direccion}</p>
    </div>
  );
}
