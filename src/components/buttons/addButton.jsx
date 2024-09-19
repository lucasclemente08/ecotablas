import React from "react";
import { RiAddCircleFill } from "react-icons/ri";
const AddButton = ({ abrirModal, title }) => {
  return (
    <>
      <button
        onClick={abrirModal}
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 mt-2 mb-5 px-4 rounded"
      >
<div className="flex">
        {title}  <RiAddCircleFill  className="m-1" />

</div>
      </button>
    </>
  );
};

export default AddButton;
