import { useState } from "react";
import http from "../../api/http";

export default function LoginComercio() {
  const [rut, setRut] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await http.post("/comercios/login", { rut, password });
      localStorage.setItem("token_comercio", res.data.token);
      window.location.href = "/comercio/scan";
    } catch {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="container mt-5">
      <h3>Login Comercio</h3>

      <input className="form-control mt-3" placeholder="RUT" onChange={e => setRut(e.target.value)} />
      <input className="form-control mt-3" placeholder="Contraseña" type="password" onChange={e => setPassword(e.target.value)} />

      <button className="btn btn-primary w-100 mt-3" onClick={login}>
        Ingresar
      </button>
    </div>
  );
}
