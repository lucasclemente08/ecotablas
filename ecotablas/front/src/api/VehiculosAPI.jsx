
import axios from "axios";
import builderApiUrl from "../utils/BuilderApi";

const BASE_URL = "http://www.ecotablasapi.somee.com/api/Vehiculos";

export const getAllVehiculos = () => axios.get(`${BASE_URL}/ListarTodo`);
export const addVehiculos = (data) => axios.post(`${BASE_URL}/Insertar`, data);
export const editVehiculos = (id, data) =>
  axios.put(`${BASE_URL}/Modificar/${id}`, data);
export const deleteVehiculos = (id) => axios.delete(`${BASE_URL}/Borrar/${id}`);
