import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const MenuSection = ({ title, menus }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Título principal del menú */}
      <li
        className="flex rounded-md p-2 cursor-pointer justify-center flex-col flex-nowrap text-l hover:bg-light-white text-gray-300 items-center mt-2"
        onClick={toggleMenu}
      >
        <div className="flex flex-col flex-nowrap justify-center items-center">
          <span className="origin-left duration-200 flex font-bold justify-center">
            {title}{" "}
            {isOpen ? (
              <FaChevronUp className="m-1" />
            ) : (
              <FaChevronDown className="m-1" />
            )}
          </span>
        </div>
      </li>

      {/* Submenús */}
      {isOpen &&
        menus.map((menu, index) => (
          <li
            key={index}
            className="flex rounded-md p-2 cursor-pointer justify-center flex-col flex-nowrap text-l hover:bg-light-white text-gray-300 items-center mt-2"
          >
            <Link
              to={menu.link}
              className="flex flex-col flex-nowrap justify-center items-center"
            >
              <span className="origin-left duration-200">{menu.title}</span>
            </Link>
          </li>
        ))}
    </>
  );
};

export default MenuSection;
