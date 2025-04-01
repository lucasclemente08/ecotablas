import { useState } from "react";
import { FaSearch, FaRedo } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function FilterButton({
  data = [],
  dateField = "date",
  onFilter = () => {},
  onReset = () => {},
  onPageReset = () => {},
}) {
  const [selectedDate, setSelectedDate] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);

  const filterByDate = () => {
    if (!selectedDate) {
      toast.warn("Por favor selecciona una fecha antes de buscar.");
      return;
    }

    const filteredItems = data.filter((item) => {
      const itemDate = new Date(item[dateField]).toISOString().slice(0, 10);
      return itemDate === selectedDate;
    });

    if (filteredItems.length === 0) {
      toast.info("No se encontraron resultados para la fecha seleccionada.");
      return;
    }

    onFilter(filteredItems);
    onPageReset();
    setIsFiltering(true);
    toast.success(`Filtrado aplicado: ${filteredItems.length} resultados`);
  };

  const resetFilter = () => {
    setSelectedDate("");
    onReset();
    onPageReset();
    setIsFiltering(false);
    toast.info("Filtro removido, mostrando todos los registros");
  };

  return (
    <div className="flex items-center space-x-2">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      
      <button
        onClick={filterByDate}
        disabled={!selectedDate}
        className={`flex items-center px-4 py-2 text-white rounded-lg bg-blue-600 hover:bg-blue-700 ${
          !selectedDate ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <FaSearch className="mr-2" />
        Buscar
      </button>
      
      {isFiltering && (
        <button
          onClick={resetFilter}
          className="flex items-center px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
        >
          <FaRedo className="mr-2" />
          Limpiar
        </button>
      )}
    </div>
  );
}

export default FilterButton;