import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuSection from "./MenuSection";

const LinksBar = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const [employeeOpen, setEmployeeOpen] = useState(false);
  const [urbanOpen, setUrbanOpen] = useState(false);
  const [materialOpen, setMaterialOpen] = useState(false);
  const [machinesOpen, setMachinesOpen] = useState(false);

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
    { title: "Clasificacíon de material", link: "/clasificacion" },
<<<<<<< HEAD
    { title: "Maquinaria", link: "/maquinaria" },
    { title: "Tolva", link: "/Tolva" },
    { title: "Material Procesado", link: "/materialProc" },
    { title: "Material Triturado", link: "/materialTri" },
    { title: "Lavado de material", link: "/lavado" },
    { title: "Volumen", link: "/volumen" },
    { title: "Tablas producidas", link: "/tablas" },
    { title: "Plásticos", link: "/material" },
=======
    { title: "Material Procesado", link: "/materialProc" },
    { title: "Material Triturado", link: "/materialTri" },
    { title: "Volumen", link: "/volumen" },
    { title: "Tablas producidas", link: "/tablas" },
>>>>>>> c8aedd49f0acaab77dad2adb4286dda9762a827d
  ];

  const machinesMenus = [
    { title: "Maquinaria", link: "/maquinaria" },
    { title: "Tolva", link: "/Tolva" },
    { title: "Lavado de material", link: "/lavado" },
    { title: "Plásticos", link: "/material" },
  ];

  const toggleEmployeeMenu = () => {
    setEmployeeOpen(!employeeOpen);
  };

  const toggleMachineMenu = () => {
    setMachinesOpen(!machinesOpen);
  };

  const toggleUrbanMenu = () => {
    setUrbanOpen(!urbanOpen);
  };

  const toggleMaterialMenu = () => {
    setMaterialOpen(!materialOpen);
  };

  return (
    <>
<<<<<<< HEAD
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
      {/* Sección de Empleados */}
      <li
        className={`flex rounded-md p-2 cursor-pointer justify-center flex-col flex-nowrap text-l hover:bg-light-white text-gray-300 items-center mt-2`}
        onClick={toggleMachineMenu}
      >
        <div className="flex flex-col flex-nowrap justify-center items-center">
          <span
            className={`${!open && "hidden"} origin-left duration-200 flex  font-bold justify-center`}
          >
            Maquinaria{" "}
            {open ? (
              <FaChevronDown className="m-1" />
            ) : (
              <FaChevronUp className="m-1" />
            )}
          </span>
        </div>
      </li>

      {/* Submenús de Empleados */}
      {machinesOpen &&
        machinesMenus.map((menu, index) => (
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
            className={`${!open && "hidden"} font-bold origin-left duration-200 flex`}
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
=======
      <MenuSection title="Empleados" menus={employeeMenus} />
      <MenuSection title="Recolección Urbanos" menus={urbanMenus} />
      <MenuSection title="Materiales" menus={materialMenus} />
      <MenuSection title="Maquinaria" menus={machinesMenus} />
>>>>>>> c8aedd49f0acaab77dad2adb4286dda9762a827d
    </>
  );
};

export default LinksBar;
