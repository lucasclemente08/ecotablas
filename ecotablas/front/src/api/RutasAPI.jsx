import axios from "axios";

const BASE_URL = "http://localhost:61274/api";

// Endpoints para Rutas
export const getRoutes = () => axios.get(`${BASE_URL}/Rutas/ListarTodo`);
export const createRoute = (data) => axios.post(`${BASE_URL}/Rutas/Insertar`, data);
export const editRoute = (id, data) => axios.put(`${BASE_URL}/Rutas/Modificar/${id}`, data);
export const deleteRoute = (id) => axios.delete(`${BASE_URL}/Rutas/Borrar/${id}`);

// Endpoints para PuntosRuta
export const getRoutePoints = (IdRuta) => axios.get(`${BASE_URL}/PuntosRuta/ListarPorRuta?IdRuta=${IdRuta}`);
export const saveRoutePoints = (IdRuta, points) =>
  axios.post(`${BASE_URL}/PuntosRuta/Insertar`, points.map(punto => ({
    IdRuta: IdRuta,
    Orden: punto.Orden,
    Longitud: punto.Longitud,
    Latitud: punto.Latitud,
  })));

// Endpoints para RutasxEmpleados
export const getEmployeesForRoute = (IdRuta) => axios.get(`${BASE_URL}/RutasxEmpleados/ListarPorRuta?IdRuta=${IdRuta}`);
export const assignEmployeesToRoute = (IdRuta, empleados) =>
  axios.post(`${BASE_URL}/RutasxEmpleados/Insertar`, empleados.map(idEmpleado => ({
    IdRuta: IdRuta,
    IdEmpleado: idEmpleado,
  })));
export const getEmpleados = () => axios.get(`${BASE_URL}/Empleados/ListarTodo`);