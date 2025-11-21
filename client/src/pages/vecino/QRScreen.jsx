import { useEffect, useState } from "react";
import http from "../../api/http";

export default function QRScreen() {
  const [svg, setSvg] = useState("");

  const reload = async () => {
    const id = 1; // luego JWT
    const res = await http.get(`/qr/${id}`, { responseType: "text" });
    setSvg(res.data);
  };

  useEffect(() => {
    reload();
    const timer = setInterval(reload, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container mt-4 text-center">
      <h3>Mi QR</h3>

      <div dangerouslySetInnerHTML={{ __html: svg }} />

      <p className="text-muted mt-2">
        Se actualiza automáticamente cada 1 minuto
      </p>
    </div>
  );
}
