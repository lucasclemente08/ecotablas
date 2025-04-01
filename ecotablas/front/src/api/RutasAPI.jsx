import axios from "axios";

const BASE_URL = "http://www.ecotablasapi.somee.com/api";

// Endpoints para Rutas
export const getRoutes = () => axios.get(`${BASE_URL}/Rutas/ListarTodo`);
export const createRoute = (data) =>
  axios.post(`${BASE_URL}/Rutas/Insertar`, data);

export const editRoute = (id, data) =>
  axios.post(`${BASE_URL}/Rutas/Modificar/${id}`, data);
export const deleteRoute = (id) =>
  axios.delete(`${BASE_URL}/Rutas/Borrar/${id}`);

// Endpoints para PuntosRuta
export const getRoutePoints = (id) =>
  axios.get(`${BASE_URL}/PuntosRuta/ListarPorId/${id}`);
export const saveRoutePoints = (points) =>
  axios.post(
    `${BASE_URL}/PuntosRuta/Insertar`,
    points.map((punto) => ({
      IdRuta: punto.IdRuta,
      Orden: punto.Orden,
      Latitud: punto.Latitud,
      Longitud: punto.Longitud,
    })),
  );

// Endpoints para RutasxEmpleados
export const getEmployeesForRoute = (id) =>
  axios.get(`${BASE_URL}/RutaxEmpleados/ListarPorId/${id}`);
export const assignEmployeesToRoute = (IdRuta, empleados) =>
  axios.post(
    `${BASE_URL}/RutasxEmpleados/Insertar`,
    empleados.map((idEmpleado) => ({
      IdRuta: IdRuta,
      IdEmpleado: idEmpleado,
    })),
  );
export const getEmpleados = () => axios.get(`${BASE_URL}/Empleados/ListarTodo`);
