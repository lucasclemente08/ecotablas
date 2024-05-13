import React, { useState } from 'react';

const ButtonEdit = ({ pageName }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={openModal}
        className="block text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 p-1 rounded-lg m-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        type="button"
      >
             <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={30}
                        height={30}
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path
                          d="M7.24264 17.9967H3V13.754L14.435 2.319C14.8256 1.92848 15.4587 1.92848 15.8492 2.319L18.6777 5.14743C19.0682 5.53795 19.0682 6.17112 18.6777 6.56164L7.24264 17.9967ZM3 19.9967H21V21.9967H3V19.9967Z"
                        />
                      </svg>
      </button>

      {isModalOpen && (
        <div
          className="fixed top-0 right-0 left-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={closeModal}
        >
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
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
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Formulario de Edición para {pageName}
              </h3>
              {/* Aquí puedes agregar tus campos de edición */}
              <form>
                <div className="mb-4">
                  <label htmlFor="editName" className="block text-gray-700 dark:text-gray-300 mb-2">
                    Nombre:
                  </label>
                  <input type="text" id="editName" name="editName" className="border border-gray-300 px-3 py-2 rounded-lg w-full" />
                </div>
                {/* Agrega más campos de edición según sea necesario */}
                <button className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">
                  Guardar
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ButtonEdit;
