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
        className="flex rounded-md p-2 cursor-pointer flex-col t justify-center text-left hover:bg-light-white text-gray-200 mt-2"
        onClick={toggleMenu}
      >
        <div className="flex items-center justify-items-start w-full">
          <span className="origin-left duration-200 font-bold">{title}</span>
          {isOpen ? (
            <FaChevronUp className="ml-2" />
          ) : (
            <FaChevronDown className="ml-2" />
          )}
        </div>
      </li>

      {/* Submenús */}
      {isOpen &&
        menus.map((menu, index) => (
          <li
            key={index}
            className="flex rounded-md p-2 cursor-pointer text-left hover:bg-light-white text-gray-300 mt-2"
          >
            <Link to={menu.link} className="w-full">
              <span className="origin-left duration-200">{menu.title}</span>
            </Link>
          </li>
        ))}
    </>
  );
};

export default MenuSection;
