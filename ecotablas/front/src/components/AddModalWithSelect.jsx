import React, { useState } from "react";
import { Dropbox } from "dropbox";

const AddModalWithSelect = ({
  title,
  fields,
  handleChange,
  handleSubmit,
  cerrarModal,
  values,
  handleFileChange,
  submitButtonText = "Guardar",
  cancelButtonText = "Cancelar",
  dropboxAccessToken, // Token de acceso para Dropbox
}) => {
  const [fileToUpload, setFileToUpload] = useState(null);

  const handleDropboxUpload = async () => {
    if (!fileToUpload) {
      alert("Por favor, selecciona un archivo para subir.");
      return;
    }

    const dbx = new Dropbox({ accessToken: dropboxAccessToken });

    try {
      const response = await dbx.filesUpload({
        path: `/${fileToUpload.name}`, // Nombre del archivo en Dropbox
        contents: fileToUpload,
      });
      alert("Archivo subido exitosamente a Dropbox: " + response.path_display);
    } catch (error) {
      console.error("Error al subir archivo a Dropbox:", error);
      alert("Hubo un error al subir el archivo a Dropbox.");
    }
  };

  // Esta función maneja el cambio de archivo y llama a handleFileChange para mantener la funcionalidad original
  const handleFileSelection = (event) => {
    const selectedFile = event.target.files[0];
    setFileToUpload(selectedFile); // Almacena el archivo para subirlo a Dropbox
    handleFileChange(event); // Llama a la función original
  };

  return (
    <div className="fixed inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {title}
            </h3>
            <div className="mt-2">
              <form onSubmit={handleSubmit}>
                {fields.map((field) => (
                  <div key={field.name} className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      {field.label}
                    </label>
                    {field.type === "file" ? (
                      <input
                        type="file"
                        name={field.name}
                        onChange={handleFileSelection} // Usa la función para almacenar y manejar el archivo
                        className="border border-gray-300 rounded p-2 w-full"
                        required={field.required}
                      />
                    ) : (
                      <input
                        type={field.type || "text"}
                        name={field.name}
                        value={values[field.name]}
                        onChange={handleChange}
                        className="border border-gray-300 rounded p-2 w-full"
                        required={field.required}
                      />
                    )}
                  </div>
                ))}
              </form>
            </div>
          </div>
          <div className="mt-5 sm:mt-6">
            <button
              onClick={handleSubmit}
              className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm"
            >
              {submitButtonText}
            </button>
            <button
              onClick={cerrarModal}
              className="mt-2 inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
            >
              {cancelButtonText}
            </button>
            <button
              onClick={handleDropboxUpload}
              className="mt-2 inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
            >
              Subir a Dropbox
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddModalWithSelect;
