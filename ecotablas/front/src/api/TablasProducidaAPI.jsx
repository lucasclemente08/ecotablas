import axios from "axios";
import builderApiUrl from "../utils/BuilderApi";

const BASE_URL = "http://www.ecotablasapi.somee.com/api/TablaProducidas";

export const getAllTablas = () => axios.get(`${BASE_URL}/ListarTodo`);
export const addTablas = (data) => axios.post(`${BASE_URL}/Insertar`, data);
export const editTablas = (id, data) =>
  axios.put(`${BASE_URL}/Modificar/${id}`, data);
export const deleteTablas = (id) => axios.delete(`${BASE_URL}/Borrar/${id}`);
