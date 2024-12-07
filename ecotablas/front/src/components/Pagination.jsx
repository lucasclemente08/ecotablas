import { HiChevronLeft, HiChevronRight } from "react-icons/hi"; // Asegúrate de importar los iconos

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-center items-center space-x-4 py-6">
      {/* Botón Anterior con icono circular */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center px-5 py-3 text-white bg-green-700 hover:bg-green-600 rounded-full transition duration-200 ease-in-out disabled:bg-gray-400"
      >
        <HiChevronLeft className="w-5 h-5" />
        <span className="ml-2">Anterior</span>
      </button>

      {/* Indicador de Páginas con estilo circular */}
      <span className="text-lg font-semibold text-green-800">
        Página {currentPage} de {totalPages}
      </span>

      {/* Botón Siguiente con icono circular */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center px-5 py-3 text-white bg-green-700 hover:bg-green-600 rounded-full transition duration-200 ease-in-out disabled:bg-gray-400"
      >
        <span className="mr-2">Siguiente</span>
        <HiChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Pagination;
