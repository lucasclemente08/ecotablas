import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-center items-center space-x-4 py-3">
      {/* Botón Anterior */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center px-4 py-2 text-blue-100 bg-blue-700 hover:bg-blue-600 rounded-full transition duration-200 ease-in-out disabled:bg-gray-600 disabled:text-gray-400"
      >
        <HiChevronLeft className="w-5 h-5" />
        <span className="ml-2">Anterior</span>
      </button>

      {/* Indicador de Páginas */}
      <span className="text-base font-medium text-blue-100">
        Página {currentPage} de {totalPages}
      </span>

      {/* Botón Siguiente */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center px-4 py-2 text-blue-100 bg-blue-700 hover:bg-blue-600 rounded-full transition duration-200 ease-in-out disabled:bg-gray-600 disabled:text-gray-400"
      >
        <span className="mr-2">Siguiente</span>
        <HiChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Pagination;
