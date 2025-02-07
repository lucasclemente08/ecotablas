import axios from "axios";
import builderApiUrl from "../utils/BuilderApi";

const BASE_URL = "http://localhost:61274/api/Tolva";

export const getAllTolva = () => axios.get(`${BASE_URL}/ListarTodo`);
export const addTolva = (data) => axios.post(`${BASE_URL}/Insertar`, data);
export const editTolva = (id, data) =>
  axios.put(`${BASE_URL}/Modificar/${id}`, data);
export const deleteTolva = (id) => axios.delete(`${BASE_URL}/Borrar/${id}`);
