import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, roles = [] }) => {
  const { user, role } = useAuth(); // El rol viene del contexto de autenticación

  if (!user) {
    // Si el usuario no está autenticado, redirige a la página de inicio de sesión
    return <Navigate to="/login" replace />;
  }

  if (roles.length > 0 && !roles.includes(role)) {
    // Si el rol del usuario no está permitido, redirige a una página de acceso denegado
    return <Navigate to="/permisos" replace />;
  }

  return children;
};

export default ProtectedRoute;
