// api/materialTrit.js
import axios from "axios";
import builderApiUrl from "../utils/BuilderApi";

const BASE_URL = "http://www.trazabilidadodsapi.somee.com/api/MaterialTrit";

export const getAllMaterials = () => axios.get(`${BASE_URL}/ListarTodo`);
export const addMaterial = (data) => axios.post(`${BASE_URL}/Insertar`, data);
export const editMaterial = (id, data) =>
  axios.put(`${BASE_URL}/Modificar/${id}`, data);
export const deleteMaterial = (id) => axios.delete(`${BASE_URL}/Borrar/${id}`);
