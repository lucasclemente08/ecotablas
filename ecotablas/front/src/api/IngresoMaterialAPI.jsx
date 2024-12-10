import axios from "axios";

const BASE_URL = "http://www.gestiondeecotablas.somee.com/api/IngresoMat";

export const getAllIngresoMat = () => axios.get(`${BASE_URL}/ListarTodo`);
export const addIngresoMat = (data) => axios.post(`${BASE_URL}/Insertar`, data);
export const editIngresoMat = (id, data) =>
  axios.put(`${BASE_URL}/Modificar/${id}`, data);
