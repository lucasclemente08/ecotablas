
import React, { createContext, useContext } from "react";

const RoleContext = createContext();

// Proveedor de contexto
export const RoleProvider = ({ role, children }) => {
  return (
    <RoleContext.Provider value={role}>
      {children}
    </RoleContext.Provider>
  );
};

// Hook para obtener el rol
export const useRole = () => {
  return useContext(RoleContext);
};
