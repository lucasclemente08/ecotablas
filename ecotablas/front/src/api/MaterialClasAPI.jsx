import axios from "axios";

const BASE_URL = "http://www.ecotablasapi.somee.com/api/MaterialClas";

export const getAllMaterialClas = () => axios.get(`${BASE_URL}/ListarTodo`);
export const addMaterialClas = (data) =>
  axios.post(`${BASE_URL}/Insertar`, data);
export const editMaterialClas = (id, data) =>
  axios.put(`${BASE_URL}/Modificar/${id}`, data);
