import { useState } from "react";
import QrScanner from "react-qr-scanner";
import http from "../../api/http";

export default function ScanQR() {
  const [ultimoToken, setUltimoToken] = useState("");
  const [flash, setFlash] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const reproducirBeep = () => {
    const audio = new Audio("/beep.mp3");
    audio.volume = 0.5;
    audio.play().catch(() => {});
  };

  const vibrar = () => {
    if ("vibrate" in navigator) {
      navigator.vibrate(150);
    }
  };

  const animacionDeteccion = () => {
    // Flash visual
    setFlash(true);
    setTimeout(() => setFlash(false), 120);

    // Mensaje QR Detectado
    setMensaje("QR Detectado ✓");
    setTimeout(() => setMensaje(""), 1200);
  };

  const manejarQR = async (data) => {
    if (!data) return;
    const token = data.text;

    if (!token) return;

    if (token === ultimoToken) return;
    setUltimoToken(token);

    // Notificaciones
    vibrar();
    reproducirBeep();
    animacionDeteccion();

    try {
      const res = await http.post("/qr/validar", { token });

      window.location.href = `/comercio/venta/${res.data.id}`;

    } catch (error) {
      alert("QR inválido o expirado");
    }
  };

  return (
    <div className="container mt-3 position-relative">

      {/* Flash visual */}
      {flash && (
        <div
          style={{
            position: "fixed",
            top: 0, left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(255,255,255,0.8)",
            zIndex: 9999,
            animation: "fadeOut 0.2s ease-out",
          }}
        />
      )}

      {/* Mensaje flotante */}
      {mensaje && (
        <div
          className="text-center"
          style={{
            position: "fixed",
            top: "15%",
            left: "50%",
            transform: "translateX(-50%)",
            padding: "10px 20px",
            background: "rgba(0,0,0,0.7)",
            color: "white",
            borderRadius: 12,
            fontSize: 18,
            zIndex: 9999
          }}
        >
          {mensaje}
        </div>
      )}

      <h3>Escanear QR</h3>

      <div
        style={{
          position: "relative",
          borderRadius: 12,
          overflow: "hidden",
          border: "4px solid #28a745",
          animation: mensaje ? "borderflash 0.3s ease-out" : "none"
        }}
      >
        <QrScanner
          delay={200}
          onError={(e) => console.warn("Error cámara:", e)}
          onScan={manejarQR}
          constraints={{ video: { facingMode: "environment" } }}
          style={{
            width: "100%",
            height: 350,
          }}
        />
      </div>

      {/* Animaciones CSS */}
      <style>
        {`
        @keyframes borderflash {
          0% { border-color: #28a745; }
          50% { border-color: #72ff9d; }
          100% { border-color: #28a745; }
        }

        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        `}
      </style>
    </div>
  );
}
