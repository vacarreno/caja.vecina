import { useState } from "react";
import http from "../../api/http";

export default function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await http.post("/admin/login", { email, password });
      localStorage.setItem("token", res.data.token);
      window.location.href = "/admin/panel";
    } catch {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="container mt-5">
      <h3>Login Administrador</h3>

      <input
        className="form-control mt-3"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="form-control mt-3"
        placeholder="Contraseña"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="btn btn-primary w-100 mt-3" onClick={login}>
        Ingresar
      </button>
    </div>
  );
}
