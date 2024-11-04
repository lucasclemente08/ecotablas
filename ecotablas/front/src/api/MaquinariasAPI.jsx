import axios from "axios";
import builderApiUrl from "../utils/BuilderApi";

const BASE_URL = builderApiUrl("Maquinaria");

export const getAllMaquinarias = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/ListarTodo`);

    return response;
  } catch (error) {
    console.error("Error fetching maquinarias:", error);
    throw error;
  }
};
export const addMaquinarias = (data) =>
  axios.post(`${BASE_URL}/Insertar`, data);
export const editMaquinarias = (id, data) =>
  axios.put(`${BASE_URL}/Modificar/${id}`, data);
export const deleteMaquinarias = (id) =>
  axios.delete(`${BASE_URL}/Borrar/${id}`);
