import { useState } from "react";
import { FaSearch, FaArrowLeft } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function FilterButton({
  data = [], // Lista completa de datos
  dateField = "date", // Campo de la fecha en los objetos de la lista
  onFilter = () => {}, // Callback para manejar los datos filtrados
  onReset = () => {}, // Callback para manejar el restablecimiento
  onPageReset = () => {}, // Callback para reiniciar la paginación
}) {
  const [selectedDate, setSelectedDate] = useState(""); // Fecha seleccionada
  const [isFiltering, setIsFiltering] = useState(false); // Alternar entre filtrado y restablecimiento

  const filterByDate = () => {
    if (selectedDate) {
      const filteredItems = data.filter((item) => {
        const itemDate = new Date(item[dateField]).toISOString().slice(0, 10); // Formato YYYY-MM-DD
        return itemDate === selectedDate;
      });

      if (filteredItems.length === 0) {
        toast.info("No se encontraron resultados para la fecha seleccionada.");
      }

      onFilter(filteredItems); // Devuelve los datos filtrados
      onPageReset(); // Reinicia la paginación
      setIsFiltering(true); // Cambia al estado de filtrado
    } else {
      toast.warn("Por favor selecciona una fecha antes de buscar.");
    }
  };

  const resetFilter = () => {
    onReset(data); // Restablece los datos originales
    setSelectedDate(""); // Limpia la fecha seleccionada
    onPageReset(); // Reinicia la paginación
    setIsFiltering(false); // Cambia al estado inicial
  };

  return (
    <div className="flex mb-2 items-center justify-center">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)} // Actualiza la fecha seleccionada
        className="p-2 ml-3 border border-gray-300 rounded"
      />
      <button
        onClick={isFiltering ? resetFilter : filterByDate} // Alterna entre filtrar y restablecer
        className={`flex p-2 ml-1 rounded text-white ${
          isFiltering ? "bg-red-500" : "bg-blue-500"
        }`}
      >
        {isFiltering ? (
          <>
            Volver a atrás <FaArrowLeft className="m-1" />
          </>
        ) : (
          <>
            Buscar por fecha <FaSearch className="m-1" />
          </>
        )}
      </button>
    </div>
  );
}

export default FilterButton;
