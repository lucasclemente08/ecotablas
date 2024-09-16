import React from "react";

const AddButton = ({ abrirModal, title }) => {
  return (
    <>
      <button
        onClick={abrirModal}
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 mt-2 mb-5 px-4 rounded"
      >
        {title}
      </button>
    </>
  );
};

export default AddButton;
