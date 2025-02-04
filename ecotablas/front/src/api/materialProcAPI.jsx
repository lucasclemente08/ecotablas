import axios from "axios";

const BASE_URL = "http://www.ecotablasapi.somee.com/api/MaterialPros";

export const getAllMaterials = () => axios.get(`${BASE_URL}/ListarTodo`);
export const addMaterial = (data) => axios.post(`${BASE_URL}/Insertar`, data);
export const editMaterial = (id, data) =>
  axios.put(`${BASE_URL}/Modificar/${id}`, data);
