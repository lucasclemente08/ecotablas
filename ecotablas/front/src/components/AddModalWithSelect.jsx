import React, { useState } from "react";
import { Dropbox } from "dropbox";

const AddModalWithSelect = ({
  title,
  fields,
  handleChange,
  handleSubmit,
  cerrarModal,
  values,

  submitButtonText = "Guardar",
  cancelButtonText = "Cancelar",
  dropboxAccessToken, // Token de acceso para Dropbox
}) => {
 


  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
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
                        onChange={handleChange} // Usa la función para almacenar y manejar el archivo
                        className="border border-gray-300 rounded p-2 w-full"
                        required={field.required}
                      />
                    ) : field.type === "select" ? (
                      <select
                        name={field.name}
                        value={values[field.name]}
                        onChange={handleChange}
                        className="border border-gray-300 rounded p-2 w-full"
                        required={field.required}
                      >
                        <option value="">Selecciona una opción</option>
                        {field.options.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : field.type === "date" ? (
                      <input
                        type="date"
                        name={field.name}
                        value={values[field.name]}
                        onChange={handleChange}
                        className="border border-gray-300 rounded p-2 w-full"
                        required={field.required}
                      />
                    ) : field.type === "number" ? (
                      <input
                        type="number"
                        name={field.name}
                        value={values[field.name]}
                        onChange={handleChange}
                        className="border border-gray-300 rounded p-2 w-full"
                        required={field.required}
                      />
                    ) : (
                      <input
                        type="text"
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

          </div>
        </div>
      </div>
    </div>
  );
};

export default AddModalWithSelect;