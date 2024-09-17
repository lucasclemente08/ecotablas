import React, { useState } from "react";

const DateFilter = ({ onFilter }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (new Date(startDate) > new Date(endDate)) {
      setErrorMessage("La fecha de inicio no puede ser posterior a la fecha de fin.");
    } else {
      setErrorMessage("");
      onFilter({ startDate, endDate });
    }
  };


  return (
    <div className="mb-4  flex content-center flex-col">

      <form onSubmit={handleSubmit} className="flex gap-2 items-center">
    

        <div className="flex flex-col">
        <label htmlFor="startDate" className="text-sm text-gray-100 ml-1 mb-0.5">Fecha de inicio</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div className="flex flex-col">
        <label htmlFor="startDate" className="text-sm text-gray-100 mb-0.5">Fecha de fin</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2  mt-6 rounded-lg transition duration-200 ease-in-out shadow-md"
        >
          Filtrar
        </button>
       
      </form>

      {errorMessage && (
        <p className="text-red-600 mt-2 text-sm">{errorMessage}</p>
      )}
    </div>
  );
};

export default DateFilter;
