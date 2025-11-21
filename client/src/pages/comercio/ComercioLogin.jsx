import { useState } from "react";
import api from "../../api/axios.js";
import { useAuth } from "../../auth/AuthContext.jsx";

export default function ComercioLogin() {
  const { login } = useAuth();
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const r = await api.post("/comercio/login", { usuario, clave });
    login("comercio", r.data.token, { usuario });
    window.location.href = "/comercio/scanner";
  }

  return (
    <div className="container mt-5">
      <h3>Ingreso Comercio</h3>
      <form onSubmit={handleSubmit}>
        <input className="form-control" placeholder="Usuario" value={usuario} onChange={e => setUsuario(e.target.value)} />
        <input type="password" className="form-control mt-2" placeholder="Clave" value={clave} onChange={e => setClave(e.target.value)} />
        <button className="btn btn-primary mt-3">Ingresar</button>
      </form>
    </div>
  );
}
