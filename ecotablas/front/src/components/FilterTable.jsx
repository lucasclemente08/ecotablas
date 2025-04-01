import React, { useState, useEffect } from "react";

const FilterTable = ({ data, columns, onFilteredDataChange }) => {
  const [filters, setFilters] = useState({});

  // Función para aplicar filtros
  const applyFilter = (field, filterType) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      updatedFilters[field] = { filterType, value: "" }; // No necesitamos valor por ahora, solo el tipo de filtro
      return updatedFilters;
    });
  };

  // Filtrar los datos según los filtros aplicados
  useEffect(() => {
    let filteredData = [...data];

    // Aplicamos los filtros
    Object.keys(filters).forEach((field) => {
      const { filterType } = filters[field];
      if (!filterType) return;

      filteredData = filteredData.filter((item) => {
        const fieldValue = item[field];

        switch (filterType) {
          case "greaterThan":
            return Number(fieldValue) > 100; // Usa el valor adecuado que quieras para el filtro "mayor que"
          case "lessThan":
            return Number(fieldValue) < 100; // Usa el valor adecuado que quieras para el filtro "menor que"
          case "recent":
            return new Date(fieldValue) >= new Date("2023-01-01"); // Ejemplo de fecha reciente
          case "alphabetical":
            return fieldValue.toString().toLowerCase().includes("a"); // Filtro alfabético de ejemplo
          default:
            return true;
        }
      });
    });

    onFilteredDataChange(filteredData); // Actualiza los datos filtrados
  }, [filters, data, onFilteredDataChange]);

  return (
    <div className="filter-table">
      <table className="min-w-full">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.field} className="p-4">
                {col.label}
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => applyFilter(col.field, "greaterThan")}
                    className="bg-blue-500 text-white p-2 rounded"
                  >
                    Mayor que
                  </button>
                  <button
                    onClick={() => applyFilter(col.field, "lessThan")}
                    className="bg-blue-500 text-white p-2 rounded"
                  >
                    Menor que
                  </button>
                  <button
                    onClick={() => applyFilter(col.field, "recent")}
                    className="bg-blue-500 text-white p-2 rounded"
                  >
                    Más reciente
                  </button>
                  <button
                    onClick={() => applyFilter(col.field, "alphabetical")}
                    className="bg-blue-500 text-white p-2 rounded"
                  >
                    Alfabético
                  </button>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {columns.map((col) => (
                <td key={col.field} className="p-4">
                  {item[col.field]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FilterTable;
