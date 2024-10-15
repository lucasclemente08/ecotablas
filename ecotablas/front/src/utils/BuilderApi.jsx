function builderApiUrl(params) {
  const baseUrl = import.meta.env.VITE_API_ENDPOINT;

  if (!baseUrl) {
    throw new Error(
      "La URL base para la API no está definida en las variables de entorno."
    );
  }

  if (!params || typeof params !== "string") {
    throw new Error("Los parámetros para la URL no son válidos.");
  }

  return `${baseUrl}/${params}`;
}

export default builderApiUrl;
