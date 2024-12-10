// api/materialTrit.js
import axios from "axios";
import builderApiUrl from "../utils/BuilderApi";

const BASE_URL = "http://www.trazabilidadodsapi.somee.com/api/MaterialTrit";

export const getAllMaterialTrit = () => axios.get(`${BASE_URL}/ListarTodo`);
export const addMaterialTrit = (data) => axios.post(`${BASE_URL}/Insertar`, data);
export const editMaterialTrit = (id, data) =>
  axios.put(`${BASE_URL}/Modificar/${id}`, data);
export const deleteMaterialTrit = (id) => axios.delete(`${BASE_URL}/Borrar/${id}`);
