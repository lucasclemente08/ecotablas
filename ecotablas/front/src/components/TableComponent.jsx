import React, { useState } from "react";
import Pagination from "./Pagination"; // Asegúrate de importar el componente de paginación
import TablaHead from "./Thead";
import LoadingTable from "./LoadingTable";
const TableComponent = ({ 
  data, 
  titles, 
  sortConfig, 
  onSort, 
  actions,
  itemsPerPage = 5,  // Puedes definir el número de items por página
  isLoading = false, // Propiedad para controlar el estado de carga
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Lógica de paginación
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  // Función para cambiar la página
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calcular el total de páginas
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div>
      {/* Indicador de carga */}
      {isLoading ? (
     <LoadingTable loading={isLoading} />
      ) : (
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <TablaHead titles={titles} onSort={onSort} sortConfig={sortConfig} />
          <tbody>
            {data && data.length > 0 ? (
              paginatedData.map((item) => (
                <tr key={item.id || item.Id} className="hover:bg-gray-100">
                  {titles.map((title) => (
                    <td key={title.key} className="border-b py-3 px-4">
                      {/* Verificar si la columna es de tipo "Fecha" */}
                      {title.key === "Fecha" ? (
                        item[title.key] ? item[title.key].slice(0, 10) : "Fecha no disponible"
                      ) : title.render ? (
                        title.render(item[title.key], item)
                      ) : (
                        item[title.key] || "N/A"
                      )}
                    </td>
                  ))}
  
                  {actions && (
                    <td className="border-b py-3 px-4">
                      {actions.map((action, index) => (
                        <React.Fragment key={index}>
                          {action.render ? action.render(item) : null}
                        </React.Fragment>
                      ))}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={titles.length + (actions ? 1 : 0)} className="text-center py-3">
                  No hay datos disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Paginación */}
      {totalPages > 1 && !isLoading && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default TableComponent;
