import { RoleProvider, useRole } from '../context/RoleContext';

const TablaHead = ({ titles, onSort, sortConfig, hasMaterial }) => {
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
        {hasMaterial && titles.some((title) => title.hasActions) && (
          <th className="w-1/4 text-center bg-gray-800 py-2 px-4">Acciones</th>
        )}
      </tr>
    </thead>
  );
};

export default TablaHead;