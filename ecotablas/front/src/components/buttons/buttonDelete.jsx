import React, { useState } from "react";

const ButtonDelete = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={openModal}
        className="block text-white   font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        type="button"
        aria-label="Abrir modal de eliminación"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="text-red-600"
          width={30}
          height={30}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M7 4V2H17V4H22V6H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V6H2V4H7ZM6 6V20H18V6H6ZM9 9H11V17H9V9ZM13 9H15V17H13V9Z" />
        </svg>
      </button>
    </>
  );
};

export default ButtonDelete;
