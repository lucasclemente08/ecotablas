import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, roles = [] }) => {
  const { user, role } = useAuth(); // El rol viene del contexto de autenticación

  // Fallback: Recuperar datos desde localStorage si el contexto no tiene el user o role
  const storedUser = localStorage.getItem("user");
  const storedRole = localStorage.getItem("role");

  const effectiveUser = user || (storedUser ? JSON.parse(storedUser) : null);
  const effectiveRole = role || storedRole;


  if (!effectiveUser) {
    // Si el usuario no está autenticado, redirige a la página de inicio de sesión
    return <Navigate to="/login" replace />;
  }

  // // Validar roles permitidos si se especificaron
  // if (roles.length > 0 && !roles.includes(effectiveRole)) {
  //   return <Navigate to="/" replace />;
  // }

  return children;
};

export default ProtectedRoute;
