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
import EntradasDeMaterial from "./pages/entradaDeMaterial/EntradasDeMaterial";
import TablasProducidas from "./pages/TablasProducidas/TablasProducidas";


function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="bg-slate-900 flex flex-col min-h-screen">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route
              path="/material"
              element={
                <ProtectedRoute>
                  <Material />
                </ProtectedRoute>
              }
            />
            <Route path="/register" element={<Register />} />
            <Route
              path="/empleados"
              element={
                <ProtectedRoute>
                  <Empleados />
                </ProtectedRoute>
              }
            />
            <Route
              path="/plasticos"
              element={
                <ProtectedRoute>
                  <Tablas />
                </ProtectedRoute>
              }
            />{" "}
            <Route
              path="/materialTri"
              element={
                <ProtectedRoute>
                  <MaterialTrit />
                </ProtectedRoute>
              }
            />
            <Route
              path="/materialProc"
              element={
                <ProtectedRoute>
                  <MaterialProc />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/recoleccion"
              element={
                <ProtectedRoute>
                  <RecoUrbanos />
                </ProtectedRoute>
              }
            />
            <Route
              path="/vehiculos"
              element={
                <ProtectedRoute>
                  <Vehiculos />
                </ProtectedRoute>
              }
            />
            <Route
              path="/volumen"
              element={
                <ProtectedRoute>
                  <Volumen />
                </ProtectedRoute>
              }
            />
            <Route
              path="/areas"
              element={
                <ProtectedRoute>
                  <Areas />
                </ProtectedRoute>
              }
            />
            <Route
              path="/empresa"
              element={
                <ProtectedRoute>
                  <EmpresaDonante />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Entrada/material"
              element={
                <ProtectedRoute>
                  <EntradasDeMaterial />
                </ProtectedRoute>
              }
            />

<Route
              path="/Tablas"
              element={
                <ProtectedRoute>
                  <TablasProducidas />
                </ProtectedRoute>
              }
            />

          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
