// Pagination.js
import React from "react";

const Pagination = ({ currentPage, totalPages, paginate }) => {
  return (
    <div className="flex justify-between items-center bg-gray-700">
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2  ml-2 hover:text-gray-400 text-white rounded-l"
      >
        Anterior
      </button>
      <span className="text-gray-300">
        Página {currentPage} de {totalPages}
      </span>
      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="px-4 py-2 hover:text-gray-400  text-white rounded-r"
      >
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;
