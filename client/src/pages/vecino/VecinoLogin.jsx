import { useState } from "react";
import api from "../../api/axios.js";
import { useAuth } from "../../auth/AuthContext.jsx";

export default function VecinoLogin() {
  const [rut, setRut] = useState("");
  const { login } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await api.post("/vecino/login", { rut });
    login("vecino", res.data.token, { rut });
    window.location.href = "/vecino/home";
  }

  return (
    <div className="container mt-5">
      <h3>Ingreso Vecino</h3>
      <form onSubmit={handleSubmit}>
        <input className="form-control" value={rut} onChange={e => setRut(e.target.value)} placeholder="RUT" />
        <button className="btn btn-primary mt-3">Ingresar</button>
      </form>
    </div>
  );
}
