import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/sidebar';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Empleados from './pages/empleados/Empleados';
import Register from './pages/login/Register';
import Material from './pages/materiales/Materiales';
import { AuthProvider, useAuth } from '../src/context/AuthContext';

// Define la función ProtectedRoute fuera del cuerpo del componente App
function ProtectedRoute({ component: Component, ...props }) {
  const { user } = useAuth();
  
  return (
    user ? <Component {...props} /> : <Navigate to="/login" replace />
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="bg-slate-900 flex flex-col min-h-screen">
          <Routes>
            <Route path="/" element={<ProtectedRoute component={<Home />} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/material" element={<ProtectedRoute component={Material} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/empleados" element={<ProtectedRoute component={Empleados} />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
