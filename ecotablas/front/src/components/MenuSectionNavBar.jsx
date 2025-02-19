import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const MenuSection = ({ title, menus, icon, isOpen }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const toggleMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  return (
    <div>
      {/* Título principal del menú */}
      <li
        className={`flex items-center rounded-md p-2 cursor-pointer hover:bg-light-white text-black-200 mt-2 ${
          !isOpen && "justify-center"
        }`}
        onClick={toggleMenu}
      >
        <div className="flex items-center ">
        <div className="flex items-center content-center  text-left justify-center m-1 text-lg">
  <div>{icon}</div>
  {isOpen && (
    <span className="ml-4 font-bold origin-left duration-200">
      {title}
    </span>
  )}
</div>


        {isOpen && (
          <div className="ml-2">
            {isOpenMenu ? <FaChevronUp /> : <FaChevronDown />}
          </div>
        )}
             </div>
      </li>

      {/* Submenús */}
      {isOpen && isOpenMenu && (
        <ul>
          {menus.map((menu, index) => (
            <li
              key={index}
              className="flex rounded-md ml-10 p-1.5 cursor-pointer text-left hover:bg-light-white text-white"
            >
              <Link to={menu.link} className="w-full">
                {menu.title}
              </Link>
            </li>
          ))}
        </ul>
    
    )
    }
    </div>
    
  );
};

export default MenuSection;
