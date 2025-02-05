import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Empleados from "./pages/empleados/Empleados";
import MaterialTrit from "./pages/materialTrit/materialTrit";
import MaterialProc from "./pages/materialProc/materialProc";
import RecoUrbanos from "./pages/recoUrbanos/recoUrbanos";
import Profile from "./pages/profile/Profile";
import Register from "./pages/login/Register";
import Material from "./pages/materiales/Materiales";
import { AuthProvider } from "./context/AuthContext";

import Tablas from "./pages/plasticos/plasticos";
import Vehiculos from "./pages/vehiculos/Vehiculos";
import Volumen from "./pages/volumen/Volumen";
import Areas from "./pages/areas/Areas";
import EmpresaDonante from "./pages/empresaDonante/EmpresaDonante";
import TablasProducidas from "./pages/TablasProducidas/TablasProducidas";
import EntradasDeMaterial from "./pages/ingresoMaterial/EntradasDeMaterial";
import Rutas from "./pages/rutas/Rutas";
import ClasificacionDeMaterial from "./pages/clasificacionDeMaterial/ClasificacionDeMaterial";
import Maquinarias from "./pages/maquinaria/Maquinaria";
import Tolva from "./pages/tolva/Tolva";
import GastoMaquinaria from "./pages/gastos/gastosMaquinaria/GastoMaquinaria";
import GastoVehiculos from "./pages/gastos/gastoVehiculos/GastoVehiculos";
import store from "./app/store";
import { Provider } from "react-redux";
import Reportes from "./pages/reportes/Reportes";
import Reparaciones from "./pages/reparaciones/Reparaciones";
import Permisos from "./pages/permisos/Permisos";
import PermisosCallback from "./components/PermisosCallback";
import Estadisticas from "./pages/estadisticas/Estadisticas";
import Admin from "./pages/admin/admin";


import { RoleProvider } from "./context/RoleContext";

const routesConfig = [
  { path: "/", element: <Estadisticas />, protected: true, roles: ["admin", "editor","empleado"] },
  { path: "/login", element: <Login />, protected: false },
  { path: "/register", element: <Register />, protected: false },
  { path: "/empleados", element: <Empleados />, protected: true, roles: ["admin", "editor","viewer"] },
  { path: "/plasticos", element: <Tablas />, protected: true, roles: ["admin", "editor","viewer"] },
  { path: "/material", element: <Material />, protected: true, roles: ["admin", "editor"] },
  { path: "/materialTri", element: <MaterialTrit />, protected: true, roles: ["admin", "editor"] },
  { path: "/tablas", element: <TablasProducidas />, protected: true, roles: ["admin", "editor"] },

  { path: "/materialProc", element: <MaterialProc />, protected: true, roles: ["admin", "editor", "viewer"] }, // Viewer permitido
  { path: "/recoleccion", element: <RecoUrbanos />, protected: true, roles: ["admin", "editor", "viewer"] }, // Viewer permitido
  { path: "/clasificacion", element: <ClasificacionDeMaterial />, protected: true, roles: ["admin", "editor", "viewer"] }, // Viewer permitido
  { path: "/gastos/vehiculos", element: <GastoVehiculos />, protected: true, roles: ["admin", "editor"] },
  { path: "/entrada/material", element: <EntradasDeMaterial />, protected: true, roles: ["admin", "editor", "viewer"] },
  { path: "/rutas", element: <Rutas/>, protected: true, roles: ["admin", "editor", "viewer"] },
  { path: "/empresa", element: <EmpresaDonante/>, protected: true, roles: ["admin", "editor", "viewer"] },
  { path: "/vehiculos", element: <Vehiculos/>, protected: true, roles: ["admin", "editor", "viewer"] },



  { path: "/tolva", element: <Tolva />, protected: true, roles: ["admin", "editor", "viewer"] }, // Viewer permitido
   // Viewer permitido
  { path: "/maquinaria", element: <Maquinarias />, protected: true, roles: ["admin", "editor","viewer"] },
  { path: "/gastos/vehiculos", element: <GastoVehiculos />, protected: true, roles: ["admin", "editor"] },
  {path: "/rutas", element: <Rutas/>},

  { path: "/gastos/maquinaria", element: <GastoMaquinaria />, protected: true, roles: ["admin", "editor"] },
  { path: "/profile", element: <Profile />, protected: true, roles: ["admin", "editor"] },
  
  { path: "/reportes", element: <Reportes />, protected: true, roles: ["admin", "editor"] },
  { path: "/admin", element: <Admin />, protected: true, roles: ["admin"] },
  { path: "/permisos", element: <Permisos />, protected: true, roles: ["admin", "editor","viewer","empleado"] },
  { path: "/verificacion", element: <PermisosCallback />, protected: true, roles: ["admin", "editor","viewer"] },
];



function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
              <RoleProvider>

        <Router>
          <div className="bg-slate-900 flex flex-col min-h-screen">
            <Routes>
              {routesConfig.map(({ path, element, protected: isProtected, roles }) => (
                <Route
                key={path}
                path={path}
                element={
                  isProtected ? (
                    <ProtectedRoute roles={roles}>{element}</ProtectedRoute>
                  ) : (
                    element
                  )
                }
                />
              ))}
            </Routes>
          </div>
        </Router>
              </RoleProvider>
      </AuthProvider>
    </Provider>
  );
}


export default App;
