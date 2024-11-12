import React, { useState, useEffect } from 'react';

const FilterTable = ({ data, columns, onFilteredDataChange }) => {
  const [filters, setFilters] = useState({});

  // Función para manejar cambios en los filtros
  const handleFilterChange = (field, filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: { filterType, value },
    }));
  };

  // Filtrar los datos según los filtros aplicados
  useEffect(() => {
    let filteredData = [...data];

    // Aplicamos los filtros
    Object.keys(filters).forEach((field) => {
      const { filterType, value } = filters[field];
      if (!value) return;

      filteredData = filteredData.filter((item) => {
        const fieldValue = item[field];
        
        switch (filterType) {
          case 'greaterThan':
            return Number(fieldValue) > Number(value);
          case 'lessThan':
            return Number(fieldValue) < Number(value);
          case 'recent':
            return new Date(fieldValue) >= new Date(value);
          case 'alphabetical':
            return fieldValue.toString().toLowerCase().includes(value.toLowerCase());
          default:
            return fieldValue.toString().toLowerCase().includes(value.toLowerCase());
        }
      });
    });

    onFilteredDataChange(filteredData); // Pasamos los datos filtrados
  }, [filters, data, onFilteredDataChange]);

  return (
    <div className="filter-table">
      <table className="min-w-full">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.field} className="p-4">
                {col.label}
                <div className="relative">
                  <select
                    onChange={(e) => handleFilterChange(col.field, e.target.value, '')}
                    className="ml-2"
                  >
                    <option value="">Filtrar</option>
                    <option value="text">Texto</option>
                    <option value="greaterThan">Mayor que</option>
                    <option value="lessThan">Menor que</option>
                    <option value="recent">Más reciente</option>
                    <option value="alphabetical">Alfabético</option>
                  </select>
                  <input
                    type="text"
                    className="mt-2"
                    placeholder="Valor"
                    onChange={(e) => handleFilterChange(col.field, filters[col.field]?.filterType, e.target.value)}
                  />
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
