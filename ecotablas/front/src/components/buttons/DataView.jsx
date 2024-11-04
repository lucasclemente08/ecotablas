import React from "react";
import { BsClipboardDataFill } from "react-icons/bs";

const DataView = ({ ShowTable }) => {
  return (
    <button
      onClick={ShowTable}
      className="p-2 block bg-emerald-600 hover:bg-emerald-900 text-white font-bold py-2 mt-2 mb-5 px-4 rounded"
    >
      <div className="flex items-center">
        Ver Tablas <BsClipboardDataFill className="m-1" />
      </div>
    </button>
  );
};

export default DataView;
