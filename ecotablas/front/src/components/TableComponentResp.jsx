import React, { useState } from "react";
import Pagination from "./Pagination";
import TablaHead from "./Thead";
import LoadingTable from "./LoadingTable";
import { useRole } from "../context/RoleContext";

const TableComponent = ({
  data,
  titles,
  sortConfig,
  onSort,
  actions,
  hasMaterial,
  itemsPerPage = 5,
  isLoading = false,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { role: userRole } = useRole();

  // Calcular datos paginados
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Función para cambiar la página
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Determinar alineación basada en el tipo de dato
  const getCellAlignment = (type) => {
    switch (type) {
      case "number":
        return "text-right";
      case "date":
        return "text-center";
      default:
        return "text-left";
    }
  };

  // Formatear valores según tipo
  const formatCellValue = (value, title) => {
    if (value === null || value === undefined) return "N/A";

    switch (title.type) {
      case "date":
        return value ? value.slice(0, 10) : "Fecha no disponible";
      case "number":
        return title.unit ? `${value} ${title.unit}` : value;
      default:
        return value;
    }
  };

  return (
    <div className="overflow-hidden rounded-lg border-0 shadow-sm">
    {isLoading ? (
      <LoadingTable loading={isLoading} />
    ) : (
      <div className="w-full overflow-x-auto">
        <table className="min-w-[1000px] w-full bg-white border-0 text-sm">
          <TablaHead
            titles={titles}
            onSort={onSort}
            sortConfig={sortConfig}
            hasMaterial={hasMaterial}
          />
          <tbody>
            {data && data.length > 0 ? (
              paginatedData.map((item, rowIndex) => (
                <tr
                  key={item.id || item.Id}
                  className={`${
                    rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } border-b border-gray-200 transition-colors duration-200 ease-in-out hover:bg-blue-50 group`}
                >
                  {titles.map((title) => (
                    <td
                      key={title.key}
                      className={`py-3 px-4 text-gray-700 ${getCellAlignment(
                        title.type
                      )} group-hover:text-gray-900 border-r border-gray-200 last:border-r-0`}
                    >
                      {title.render
                        ? title.render(item[title.key], item)
                        : formatCellValue(item[title.key], title)}
                    </td>
                  ))}
  
                  {actions &&
                    actions.some(
                      (action) =>
                        Array.isArray(action.allowedRoles) &&
                        action.allowedRoles.includes(userRole)
                    ) && (
                      <td className="py-3 px-4 text-gray-700 group-hover:text-gray-900 border-r border-gray-200 last:border-r-0">
                        <div className="flex justify-center space-x-2">
                          {actions.map(
                            (action, index) =>
                              action.allowedRoles.includes(userRole) && (
                                <div key={index}>
                                  {action.render ? action.render(item) : null}
                                </div>
                              )
                          )}
                        </div>
                      </td>
                    )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={titles.length + (actions ? 1 : 0)}
                  className="text-center py-4 text-gray-500"
                >
                  No hay datos disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )}
  
    {totalPages > 1 && !isLoading && data.length > 0 && (
      <div className="bg-gray-800 px-4 py-3 border-t border-gray-700">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          className="text-gray-100"
        />
      </div>
    )}
  </div>
  
  );
  
};

export default TableComponent;
