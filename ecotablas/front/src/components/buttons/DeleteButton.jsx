import React, { useState } from "react";
import axios from "axios";
import builderApiUrl from "../../utils/BuilderApi";

const DeleteButton = ({ id, endpoint, updateList }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };



  const handleDelete = () => {
    axios
      .delete(`${endpoint}/${id}`)
      .then((response) => {
        setMensaje("Eliminación exitosa");
        updateList(); // Llama a la función para actualizar la lista
        closeModal();
      })
      .catch((error) => {
        console.error("Error al eliminar:", error);
        setMensaje("Error al eliminar");
      });
  };

  return (
    <>
      <button
        onClick={openModal}
        className="ml-2 bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
      >
        Eliminar
      </button>

      {isModalOpen && (
        <div
          className="fixed top-0 right-0 left-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded-lg w-full max-w-md"
            onClick={(e) => e.stopPropagation()} // Prevent closing modal on clicking inside
          >
            <div className="text-right">
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={closeModal}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="text-center">
              <svg
                className="mx-auto mb-4 text-gray-400 w-12 h-12"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500">
                ¿Estás seguro de que quieres eliminar este elemento?
              </h3>
              <button
                onClick={handleDelete}
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
              >
                Sí, estoy seguro
              </button>
              <button
                onClick={closeModal}
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-gray-100"
              >
                No, cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteButton;
