import React, { createContext, useContext, useEffect, useState } from "react";

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState(() => {
    // Cargar el rol desde localStorage al inicializar
    return localStorage.getItem("role") || null;
  });

  useEffect(() => {
    // console.log("RoleProvider initialized with role:", role);
  }, [role]);

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  return useContext(RoleContext);
};
