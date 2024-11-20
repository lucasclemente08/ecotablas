import React from "react";

const TablaHead = ({ titles = [] }) => {


  const isFewColumns = titles.length <= 3;
  return (
    <thead className="">
      <tr>
      {titles.map((title, key) => (
          <th
            key={key}
            className={`border-b-2 py-3 items-center bg-gray-700 px-4 text-left text-white ${
              isFewColumns ? "text-center w-1/3" : "text-left"
            }`}
          >
            {title}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TablaHead;
