import React, { useEffect, useState } from "react";
import Pagination from "./Pagination"; // Asegúrate de importar el componente de paginación
import TablaHead from "./Thead";
import LoadingTable from "./LoadingTable";
import { useRole } from "../context/RoleContext"; // Asegúrate de que este contexto esté correctamente configurado

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
  const { role: userRole } = useRole(); // Obtenemos solo el rol del usuario

  useEffect(() => {
    console.log("Rol del usuario:", userRole);
  }, [userRole]); // Se actualizará cuando cambie el rol del usuario

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
                <tr key={item.id || item.Id} className= "text-center hover:bg-gray-100">
                  {titles.map((title) => (
                    <td key={title.key} className="border-b py-3 px-4">
                      {/* Verificar si la columna es de tipo "Fecha" */}
                      {title.type === "date" ? (
                        item[title.key] ? item[title.key].slice(0, 10) : "Fecha no disponible"
                      ) : title.render ? (
                        title.render(item[title.key], item)
                      ) : (
                        item[title.key] || "N/A"
                      )}
                    </td>
                  ))}
  
                  {/* Aquí van las acciones */}
                  {actions && (
                    <td className="border-b py-3 flex justify-center  text-center  px-4">
         {actions.map((action, index) => (
  <div
    key={index}
    className="flex items-center justify-start gap-2 py-1"
  >
    {Array.isArray(action.allowedRoles) && action.allowedRoles.includes(userRole) ? (
      <div className="flex items-center text-sm px-3 py-1 rounded">
        {action.render ? action.render(item) : null}
      </div>
    ) : (
      <div className="flex items-center bg-red-100 text-red-700 text-sm px-3 py-1 rounded">
        No permitido
      </div>
    )}
  </div>
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
