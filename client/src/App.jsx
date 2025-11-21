import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./auth/AuthContext.jsx";
import ProtectedRoute from "./auth/ProtectedRoute.jsx";

import AdminLogin from "./pages/admin/AdminLogin.jsx";
import ComercioLogin from "./pages/comercio/ComercioLogin.jsx";
import VecinoLogin from "./pages/vecino/VecinoLogin.jsx";

import VecinoHome from "./pages/vecino/VecinoHome.jsx";
import ComercioScanner from "./pages/comercio/ComercioScanner.jsx";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* LOGIN */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/comercio/login" element={<ComercioLogin />} />
          <Route path="/vecino/login" element={<VecinoLogin />} />

          {/* PANELES */}
          <Route
            path="/vecino/home"
            element={
              <ProtectedRoute role="vecino">
                <VecinoHome />
              </ProtectedRoute>
            }
          />

          <Route
            path="/comercio/scanner"
            element={
              <ProtectedRoute role="comercio">
                <ComercioScanner />
              </ProtectedRoute>
            }
          />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
