import React from "react";

const Pagination = ({ currentPage, totalPages, paginate }) => {
  return (
    <div className="flex flex-wrap justify-between items-center gap-4 p-4 bg-gray-700 rounded-md">
      {/* Botón Anterior */}
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 text-white rounded-l transition duration-200 ${
          currentPage === 1
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-500"
        }`}
      >
        Anterior
      </button>

      {/* Indicador de Página */}
      <span className="text-gray-300 text-center flex-1 md:flex-none">
        Página {currentPage} de {totalPages}
      </span>

      {/* Botón Siguiente */}
      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={`px-4 py-2 text-white rounded-r transition duration-200 ${
          currentPage >= totalPages
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-500"
        }`}
      >
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;
