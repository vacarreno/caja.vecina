import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-primary px-3">
      <span className="navbar-brand">Caja Vecina</span>

      <div>
        <Link to="/" className="btn btn-light btn-sm me-1">
          Inicio
        </Link>
        <Link to="/qr" className="btn btn-light btn-sm">
          Mi QR
        </Link>
      </div>
    </nav>
  );
}
