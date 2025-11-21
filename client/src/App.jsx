import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/vecino/Dashboard.jsx";
import QRScreen from "./pages/vecino/QRScreen.jsx";
import LoginAdmin from "./pages/admin/LoginAdmin.jsx";
import PanelAdmin from "./pages/admin/PanelAdmin.jsx";
import LoginComercio from "./pages/comercio/LoginComercio.jsx";
import ScanQR from "./pages/comercio/ScanQR.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Vecino */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/qr" element={<QRScreen />} />

        {/* Admin */}
        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route path="/admin/panel" element={<PanelAdmin />} />

        {/* Comercios */}
        <Route path="/comercio/login" element={<LoginComercio />} />
        <Route path="/comercio/scan" element={<ScanQR />} />

      </Routes>
    </BrowserRouter>
  );
}
