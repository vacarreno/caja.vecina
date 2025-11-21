import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";

export default function ProtectedRoute({ role, children }) {
  const { user } = useAuth();

  if (!user) return <Navigate to={`/${role}/login`} />;

  if (user.role !== role)
    return <Navigate to={`/${user.role}/login`} />;

  return children;
}
