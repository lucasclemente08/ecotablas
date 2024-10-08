import React from "react";

const TablaHead = ({ titles }) => {
  return (
    <thead>
      <tr>
        {titles.map((title, key) => (
          <th
            key={key}
            className="border-b-2 py-3 px-4 text-left text-gray-600"
          >
            {title}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TablaHead;
