import axios from "axios";
import builderApiUrl from "../utils/BuilderApi";

const BASE_URL = `http://www.ecotablasapi.somee.com/api/Reparacion`;

export const getAllReparaciones = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/ListarTodo`);
    return response;
  } catch (error) {
    console.error("Error fetching reparaciones:", error);
    throw error; // Propaga el error para que pueda ser manejado en el componente
  }
};
export const getReparacionById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/ListarPorId/${id}`);
    return response;
  } catch (error) {
    console.error("Error fetching reparación by ID:", error);
    throw error; // Propaga el error para que pueda ser manejado en el componente
  }
};
export const getReparacionByIdMaquinaria = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/ListarPorIdMaquinaria/${id}`);
    return response;
  } catch (error) {
    console.error("Error fetching reparación by ID:", error);
    throw error; // Propaga el error para que pueda ser manejado en el componente
  }
};

export const getReparacionByIdVehiculo = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/ListarPorIdVehiculo/${id}`);
    return response;
  } catch (error) {
    console.error("Error fetching reparación by ID:", error);
    throw error; // Propaga el error para que pueda ser manejado en el componente
  }
};
export const addReparacion = (data) => axios.post(`${BASE_URL}/Insertar`, data);
export const editReparacion = (id, data) =>
  axios.put(`${BASE_URL}/Modificar/${id}`, data);
export const deleteReparacion = (id) =>
  axios.delete(`${BASE_URL}/Borrar/${id}`);
