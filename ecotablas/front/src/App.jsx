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
import EntradasDeMaterial from "./pages/EntradaDeMaterial/EntradasDeMaterial";
import ClasificacionDeMaterial from "./pages/clasificacionDeMaterial/ClasificacionDeMaterial";
import Maquinarias from "./pages/maquinaria/Maquinaria";
import Tolva from "./pages/tolva/Tolva";
import GastoMaquinaria from "./pages/gastos/gastosMaquinaria/GastoMaquinaria";
import GastoVehiculos from "./pages/gastos/gastoVehiculos/GastoVehiculos";
import store from "./app/store";
import { Provider } from "react-redux";
import Reportes from "./pages/reportes/Reportes";
import Reparaciones from "./pages/reparaciones/Reparaciones";

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
  { path: "/reportes", element: <Reportes />, protected: true },

 {
   path: "/entrada/material",
  element: <EntradasDeMaterial />,
  protected: true,
 },
  {
    path: "/clasificacion",
    element: <ClasificacionDeMaterial />,
    protected: true,
  },
  { path: "/maquinaria", element: <Maquinarias />, protected: true },
  { path: "/tolva", element: <Tolva />, protected: true },
  { path: "/reparaciones", element: <Reparaciones />, protected: true },

  // { path: "/lavado", element: <LavadoMaterial />, protected: true },
  { path: "/tablas", element: <TablasProducidas />, protected: true },
  { path: "/gastos/vehiculos", element: <GastoVehiculos />, protected: true },
  { path: "/gastos/maquinaria", element: <GastoMaquinaria />, protected: true },
];

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <div className="bg-slate-900 flex flex-col min-h-screen">
            <Routes>
              {routesConfig.map(({ path, element, protected: isProtected }) => (
                <Route
                  key={path}
                  path={path}
                  element={
                    isProtected ? (
                      <ProtectedRoute>{element}</ProtectedRoute>
                    ) : (
                      element
                    )
                  }
                />
              ))}
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </Provider>
  );
}

export default App;
