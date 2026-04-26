import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, roleRequired }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  let role = null;

  try {
    const decoded = JSON.parse(atob(token.split(".")[1]));
    role = decoded.role;
  } catch (error) {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  if (roleRequired && role !== roleRequired) {
    return <Navigate to="/" replace />;
  }

  return children;
}