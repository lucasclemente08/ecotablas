import React, { useState } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";

const TablaHead = ({ 
  titles = [], 
  data = [], 
  rowsPerPage = 5, 
  currentPage = 0, 
  onSortedAndPaginatedData 
}) => {
  const [sortConfig, setSortConfig] = useState({ campo: "", direction: "asc" });

  const handleSort = (campo, type) => {
    let direction = "asc";

    if (sortConfig.campo === campo && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedData = [...data].sort((a, b) => {
      const valA = a[campo];
      const valB = b[campo];

      if (type === "number") {
        return direction === "asc" ? valA - valB : valB - valA;
      } else if (type === "date") {
        return direction === "asc"
          ? new Date(valA) - new Date(valB)
          : new Date(valB) - new Date(valA);
      } else {
        const strA = (valA ?? "").toString().toLowerCase();
        const strB = (valB ?? "").toString().toLowerCase();
        if (strA < strB) return direction === "asc" ? -1 : 1;
        if (strA > strB) return direction === "asc" ? 1 : -1;
        return 0;
      }
    });

    // Paginate sorted data
    const startIndex = currentPage * rowsPerPage;
    const paginatedData = sortedData.slice(startIndex, startIndex + rowsPerPage);

    setSortConfig({ campo, direction });

    if (onSortedAndPaginatedData) {
      onSortedAndPaginatedData(paginatedData);
    }
  };

  return (
    <thead className="bg-gray-800 text-white">
      <tr>
        {titles.map((title) => (
          <th
            key={title.key}
            className="w-1/4 py-2 cursor-pointer"
            onClick={() => handleSort(title.key, title.type)}
          >
            {title.label}
            {sortConfig.campo === title.key && (
              <span className="ml-2">
                {sortConfig.direction === "asc" ? (
                  <MdExpandLess />
                ) : (
                  <MdExpandMore />
                )}
              </span>
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TablaHead;
