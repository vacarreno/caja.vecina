import { useEffect, useState } from "react";
import http from "../../api/http";
import { Link } from "react-router-dom";
import ProtectedRoute from "../../components/ProtectedRoute";

export default function PanelAdmin() {
  const [data, setData] = useState([]);

  const load = async () => {
    const token = localStorage.getItem("token");
    const res = await http.get("/admin/vecinos", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setData(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <ProtectedRoute>
      <div className="container mt-4">

        <div className="d-flex justify-content-between">
          <h3>Panel Admin</h3>
          <Link to="/admin/crear" className="btn btn-success">
            Crear Vecino
          </Link>
        </div>

        <table className="table mt-4">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Saldo</th>
              <th>Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {data.map(v => (
              <tr key={v.id}>
                <td>{v.nombre}</td>
                <td>${v.saldo_disponible}</td>
                <td>{v.telefono}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ProtectedRoute>
  );
}
