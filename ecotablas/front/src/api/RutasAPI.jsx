const API_URL = "http://localhost:61274/api/";

export const getRoutes = async () => {
  const response = await fetch(`${API_URL}/Rutas/ListarTodo`);
  return response.json();
};

export const createRoute = async (route) => {
  const response = await fetch(`${API_URL}/Rutas/Insertar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(route),
  });
  return response.json();
};

export const saveRoutePoints = async (idRuta, points) => {
  const response = await fetch(`${API_URL}/PuntosRuta/Insertar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(points.map((punto) => ({ 
      IdRuta: idRuta, 
      Orden: punto.Orden,
      Longitud: punto.Longitud, 
      Latitud: punto.Latitud, 
      
    }))),
  });
  return response.json();
};

export const assignEmployees = async (assignment) => {
  const response = await fetch(`${API_URL}/RutasxEmpleados/Insertar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(assignment),
  });
  return response.json();
};

export const getRoutePoints = async (idRuta) => {
  const response = await fetch(`${API_URL}/PuntosRuta?IdRuta=${idRuta}`);
  return response.json();
};