import React from "react";
import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa6";
import { FaChevronUp } from "react-icons/fa";

const LinksBar = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const [employeeOpen, setEmployeeOpen] = useState(false);
  const [urbanOpen, setUrbanOpen] = useState(false);
  const [materialOpen, setMaterialOpen] = useState(false);

  const employeeMenus = [
    { title: "Empleados", link: "/empleados" },
    { title: "Áreas y turnos de trabajo", link: "/areas" },
    { title: "Perfil", link: "/profile" },
  ];

  const urbanMenus = [
    { title: "Recolección Urbanos", link: "/recoleccion" },
    { title: "Vehículos", link: "/vehiculos" },
    { title: "Empresa Donante", link: "/empresa" },
  ];

  const materialMenus = [
    { title: "Entrada de material", link: "/Entrada/material" },
    { title: "Material Triturado", link: "/materialTri" },
    { title: "Material Procesado", link: "/materialProc" },
    { title: "Volumen", link: "/volumen" },

    { title: "Plásticos", link: "/material" },
  ];

  const toggleEmployeeMenu = () => {
    setEmployeeOpen(!employeeOpen);
  };

  const toggleUrbanMenu = () => {
    setUrbanOpen(!urbanOpen);
  };

  const toggleMaterialMenu = () => {
    setMaterialOpen(!materialOpen);
  };

  return (
    <>
      {/* Sección de Empleados */}
      <li
        className={`flex rounded-md p-2 cursor-pointer justify-center flex-col flex-nowrap text-l hover:bg-light-white text-gray-300 items-center mt-2`}
        onClick={toggleEmployeeMenu}
      >
        <div className="flex flex-col flex-nowrap justify-center items-center">
          <span
            className={`${!open && "hidden"} origin-left duration-200 flex  font-bold justify-center`}
          >
            Empleados{" "}
            {open ? (
              <FaChevronDown className="m-1" />
            ) : (
              <FaChevronUp className="m-1" />
            )}
          </span>
        </div>
      </li>

      {/* Submenús de Empleados */}
      {employeeOpen &&
        employeeMenus.map((menu, index) => (
          <li
            key={index}
            className={`flex rounded-md p-2 cursor-pointer justify-center flex-col flex-nowrap text-l hover:bg-light-white text-gray-300 items-center mt-2`}
          >
            <Link
              to={menu.link}
              className="flex flex-col flex-nowrap justify-center items-center"
            >
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {menu.title}
              </span>
            </Link>
          </li>
        ))}

      {/* Sección de Recolección Urbanos */}
      <li
        className={`flex rounded-md p-2 cursor-pointer justify-center flex-col flex-nowrap text-l hover:bg-light-white text-gray-300 items-center mt-2`}
        onClick={toggleUrbanMenu}
      >
        <div className="flex flex-col flex-nowrap justify-center items-center">
          <span
            className={`${
              open ? "opacity-100 max-h-10" : "opacity-0 max-h-0"
            } overflow-hidden origin-left duration-300 font-bold flex transition-all ease-in-out`}
          >
            Recolección de Urbanos{" "}
            {open ? (
              <FaChevronDown className="m-1" />
            ) : (
              <FaChevronUp className="m-1" />
            )}
          </span>
        </div>
      </li>

      {/* Submenús de Recolección Urbanos */}
      {urbanOpen &&
        urbanMenus.map((menu, index) => (
          <li
            key={index}
            className={`flex rounded-md p-2 cursor-pointer justify-center flex-col flex-nowrap text-l hover:bg-light-white text-gray-300 items-center mt-2`}
          >
            <Link
              to={menu.link}
              className="flex flex-col flex-nowrap justify-center items-center"
            >
              <span
                className={`${!open && "hidden"} origin-left duration-200 `}
              >
                {menu.title}
              </span>
            </Link>
          </li>
        ))}

      {/* Sección de Materiales */}
      <li
        className={`flex rounded-md p-2 cursor-pointer justify-center flex-col flex-nowrap text-l hover:bg-light-white text-gray-300 items-center mt-2`}
        onClick={toggleMaterialMenu}
      >
        <div className="flex flex-col flex-nowrap justify-center items-center">
          <span
            className={`${!open && "hidden"} origin-left duration-200 flex`}
          >
            Materiales{" "}
            {open ? (
              <FaChevronDown className="m-1" />
            ) : (
              <FaChevronUp className="m-1" />
            )}
          </span>
        </div>
      </li>

      {/* Submenús de Materiales */}
      {materialOpen &&
        materialMenus.map((menu, index) => (
          <li
            key={index}
            className={`flex rounded-md p-2 cursor-pointer justify-center flex-col flex-nowrap text-l hover:bg-light-white text-gray-300 items-center mt-2`}
          >
            <Link
              to={menu.link}
              className="flex flex-col flex-nowrap justify-center items-center"
            >
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {menu.title}
              </span>
            </Link>
          </li>
        ))}
    </>
  );
};

export default LinksBar;
