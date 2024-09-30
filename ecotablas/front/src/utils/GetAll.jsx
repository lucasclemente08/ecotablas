import axios from "axios";
import builderApiUrl from "./BuilderApi";

async function GetAll(url) {
  const errorMessage = {
    base: "Ha ocurrido un error:",
    fetchFailed: "Error al obtener la data",
    unknown: "Error desconocido, vuelva a intentarlo más tarde",
  };

  try {
    const response = await axios.get(builderApiUrl(url));

    if (response.status !== 200 || response.statusText !== "OK") {
      throw new Error(errorMessage.fetchFailed);
    }

    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      return `${errorMessage.base} ${error.message}`;
    }

    return errorMessage.unknown;
  }
}

export default GetAll;
