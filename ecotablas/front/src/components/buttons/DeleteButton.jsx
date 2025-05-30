import React, { useState } from "react";
import axios from "axios";
import { toast,Toaster } from "sonner";
import { MdDelete } from "react-icons/md";

const DeleteButton = ({ id, endpoint, updateList }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDelete = async () => {
    setIsLoading(true);

    try {
      const response = await axios.delete(`${endpoint}/${id}`);

      updateList();
       toast.error(
        "Elemento eliminado correctamente",)
      closeModal();
    } catch (error) {
      console.error(
        "Error al eliminar:",
        error.response?.data || error.message,
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
       <Toaster />
      <button
        onClick={openModal}
        className="ml-2 bg-red-700 flex hover:bg-red-800 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
      >
        <MdDelete className="m-1" />
        Eliminar
      </button>

      {isModalOpen && (
        <div
          className="fixed z-10 inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded-lg w-full max-w-md"
            onClick={(e) => e.stopPropagation()} // Evita que el modal se cierre al hacer clic dentro
          >
            <div className="text-right">
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={closeModal}
              >
                ✖
              </button>
            </div>
            <div className="text-center">
              <h3 className="mb-5 text-lg font-normal text-gray-500">
                ¿Estás seguro de que quieres eliminar este elemento?
              </h3>
              <button
                onClick={handleDelete}
                disabled={isLoading}
                className={`text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Eliminando..." : "Sí, eliminar"}
              </button>
              <button
                onClick={closeModal}
                className="py-2.5 px-5 ml-3 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteButton;
