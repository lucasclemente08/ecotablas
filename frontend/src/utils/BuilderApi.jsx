function builderApiUrl(params) {
  const baseUrl = import.meta.env.VITE_API_ENDPOINT;

  if (!baseUrl) {
    throw new Error(
      "La URL base para la API no está definida en las variables de entorno.",
    );
  }

  return `${baseUrl}/${params}`;
}

export default builderApiUrl;
