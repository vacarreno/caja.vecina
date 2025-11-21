import { useState } from "react";
import http from "../../api/http";

export default function CrearVecino() {
  const [form, setForm] = useState({
    nombre: "",
    rut: "",
    telefono: "",
    direccion: "",
    saldo_asignado: 0,
    foto_url: ""
  });

  const handle = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const save = async () => {
    const token = localStorage.getItem("token");

    await http.post("/admin/vecinos", form, {
      headers: { Authorization: `Bearer ${token}` }
    });

    alert("Vecino registrado");
    window.location.href = "/admin/panel";
  };

  return (
    <div className="container mt-4">
      <h3>Crear Vecino</h3>

      <input className="form-control mt-2" placeholder="Nombre" name="nombre" onChange={handle} />
      <input className="form-control mt-2" placeholder="RUT" name="rut" onChange={handle} />
      <input className="form-control mt-2" placeholder="Teléfono" name="telefono" onChange={handle} />
      <input className="form-control mt-2" placeholder="Dirección" name="direccion" onChange={handle} />
      <input className="form-control mt-2" placeholder="Foto URL" name="foto_url" onChange={handle} />
      <input className="form-control mt-2" placeholder="Saldo" name="saldo_asignado" onChange={handle} />

      <button className="btn btn-primary w-100 mt-3" onClick={save}>
        Guardar
      </button>
    </div>
  );
}
