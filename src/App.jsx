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
import { AuthProvider } from "../src/context/AuthContext";
import Tablas from "./pages/plasticos/plasticos";
import Vehiculos from "./pages/vehiculos/Vehiculos";
import Volumen from "./pages/volumen/Volumen";
import Areas from "./pages/areas/Areas";
import EmpresaDonante from "./pages/empresaDonante/EmpresaDonante";
import TablasProducidas from "./pages/TablasProducidas/TablasProducidas";
import EntradasDeMaterial from "./pages/entradaDeMaterial/EntradasDeMaterial";
import LavadoMaterial from "./pages/lavadoMaterial/LavadoMaterial";
import ClasificacionDeMaterial from "./pages/clasificacionDeMaterial/ClasificacionDeMaterial";

const routesConfig = [
  { path: "/", element: <Home />, protected: true },
  { path: "/login", element: <Login />, protected: false },
  { path: "/register", element: <Register />, protected: false },
  { path: "/empleados", element: <Empleados />, protected: true },
  { path: "/plasticos", element: <Tablas />, protected: true },
  { path: "/material", element: <Material />, protected: true },
  { path: "/materialTri", element: <MaterialTrit />, protected: true },
  { path: "/materialProc", element: <MaterialProc />, protected: true },
  { path: "/profile", element: <Profile />, protected: true },
  { path: "/recoleccion", element: <RecoUrbanos />, protected: true },
  { path: "/vehiculos", element: <Vehiculos />, protected: true },
  { path: "/volumen", element: <Volumen />, protected: true },
  { path: "/areas", element: <Areas />, protected: true },
  { path: "/empresa", element: <EmpresaDonante />, protected: true },
  { path: "/entrada/material", element: <EntradasDeMaterial />, protected: true },
  { path: "/clasificacion", element: <ClasificacionDeMaterial />, protected: true },
  
  { path: "/lavado", element: <LavadoMaterial />, protected: true },
  { path: "/tablas", element: <TablasProducidas />, protected: true },
];

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="bg-slate-900 flex flex-col min-h-screen">
          <Routes>
            {routesConfig.map(({ path, element, protected: isProtected }) => (
              <Route
                key={path}
                path={path}
                element={isProtected ? <ProtectedRoute>{element}</ProtectedRoute> : element}
              />
            ))}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
