import { useRole } from '../context/RoleContext';

const TablaHead = ({ titles, onSort, sortConfig, hasMaterial }) => {
  const { role: userRole } = useRole();

  return (
    <thead className="bg-gray-800 border-b-0 border-gray-600">
      <tr>
        {titles.map((title) => {
          const isSortable = title.sortable !== false;
          const isSorted = sortConfig?.campo === title.key;
          
          return (
            <th
              key={title.key}
              onClick={() => isSortable && onSort && onSort(title.key, title.type)}
              className={`
                px-4 py-3 text-sm font-semibold text-gray-100
                ${isSortable ? 'cursor-pointer hover:bg-gray-700 transition-colors duration-150' : ''}
                ${isSorted ? 'text-white bg-gray-700' : ''}
                ${title.type === 'number' ? 'text-right' : title.type === 'date' ? 'text-center' : 'text-left'}
                border-r border-gray-600 last:border-r-0
                first:rounded-tl-lg last:rounded-tr-lg
              `}
              title={title.tooltip}
            >
              <div className={`flex items-center ${title.type === 'number' ? 'justify-end' : title.type === 'date' ? 'justify-center' : 'justify-start'}`}>
                {title.label}
                {isSortable && (
                  <span className="ml-1 text-gray-300">
                    {isSorted 
                      ? (sortConfig.direction === 'asc' ? '↑' : '↓')
                      : '↕'}
                  </span>
                )}
              </div>
            </th>
          );
        })}
        
        {hasMaterial && (
          <th className="px-4 py-3 text-sm font-semibold text-gray-100 uppercase tracking-wider text-center border-r border-gray-600 last:border-r-0">
            Acciones
          </th>
        )}
      </tr>
    </thead>
  );
};

export default TablaHead;