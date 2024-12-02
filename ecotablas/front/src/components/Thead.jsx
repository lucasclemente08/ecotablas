import React, { useState } from "react";

const TablaHead = ({ titles = [], data = [], onSortedData }) => {
  const [sortConfig, setSortConfig] = useState({ campo: "", direction: "asc" });

  const isFewColumns = titles.length <= 3;

  const handleSort = (campo) => {
    let direction = "asc";

    if (sortConfig.campo === campo && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedData = [...data].sort((a, b) => {
      const valA = a[campo]?.toString().toLowerCase() || "";
      const valB = b[campo]?.toString().toLowerCase() || "";

      if (valA < valB) return direction === "asc" ? -1 : 1;
      if (valA > valB) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ campo, direction });
    if (onSortedData) {
      onSortedData(sortedData);
    }
  };

  return (
    <thead>
      <tr>
        {titles.map((title, index) => (
          <th
            key={index}
            onClick={() => handleSort(title.key || title)}
            className={`border-b-2 py-3 bg-gray-700 px-4 text-white ${
              isFewColumns ? "text-center w-1/3" : "text-left"
            } cursor-pointer`}
          >
            <span className="flex items-center justify-between">
              {title.label || title}
              {sortConfig.campo === (title.key || title) && (
                <span className="text-sm ml-2">
                  {sortConfig.direction === "asc" ? "▲" : "▼"}
                </span>
              )}
            </span>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TablaHead;
