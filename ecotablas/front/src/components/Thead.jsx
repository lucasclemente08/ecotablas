
import { RoleProvider, useRole } from '../context/RoleContext';


const TablaHead = ({ titles, onSort, sortConfig }) => {

  const { role: userRole } = useRole(); 
  return (
    <thead className="bg-gray-800 text-white">
    <tr>
      {titles.map((title) => (
        <th
          key={title.key}
          className="w-1/4 py-2 cursor-pointer text-center px-4"
          onClick={() => onSort && onSort(title.key, title.type)}
        >
          {title.label}
          {sortConfig?.campo === title.key && (
            <span className="ml-2">
              {sortConfig.direction === "asc" ? "▲" : "▼"}
            </span>
          )}
        </th>
      ))}

{userRole !== "admin" ? (
  <></> // Si el usuario no es admin, no se muestra la columna de acciones
) : (
  titles.some((title) => title.hasActions) && (
    <th className="w-1/4 text-center bg-gray-800 py-2 px-4">Acciones</th>
  )
)}
</tr>
      {/* Header for actions column */}
    
  </thead>
  );
};
export default TablaHead