import axios from "axios";
import builderApiUrl from "../utils/BuilderApi";

const BASE_URL = "http://localhost:61274/api/TablaProducidas";

export const getAllTablas = () => axios.get(`${BASE_URL}/ListarTodo`);
export const addTablas = (data) => axios.post(`${BASE_URL}/Insertar`, data);
export const editTablas = (id, data) =>
  fetch(`${BASE_URL}/Modificar/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        return response.text().then((text) => {
          throw new Error(`Error ${response.status}: ${text}`);
        });
      }
      return response.json();
    })
    .then((res) => console.log("Respuesta del backend:", res))
    .catch((err) => console.error("Error en la petición:", err));


export const deleteTablas = (id) => axios.delete(`${BASE_URL}/Borrar/${id}`);
