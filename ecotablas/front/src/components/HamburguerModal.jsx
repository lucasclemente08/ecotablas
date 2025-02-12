import { useEffect, useRef } from "react";
import { RiCloseFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";

import MenuSection from "./MenuSection";

import { ImTruck } from "react-icons/im";
import { RiTeamFill, RiRecycleFill } from "react-icons/ri";
import { FaTools, FaDollarSign } from "react-icons/fa";
const HamburgerModal = ({ isOpen, close }) => {
  const modalRef = useRef(null);
  const navigate = useNavigate();

  
  const employeeMenus = [
    { title: "Empleados", link: "/empleados" },
    { title: "Áreas y turnos de trabajo", link: "/areas" },
    { title: "Perfil", link: "/profile" },
  ];

  const urbanMenus = [
    { title: "Recolección Urbanos", link: "/recoleccion" },
    { title: "Empresa Donante", link: "/empresa" },
    { title: "Rutas", link: "/rutas" },
  ];

  const materialMenus = [
    { title: "Entrada de material", link: "/Entrada/material" },
    { title: "Clasificacíon de material", link: "/clasificacion" },
    { title: "Material Triturado", link: "/materialTri" },
    { title: "Tolva", link: "/Tolva" },
    { title: "Tablas producidas", link: "/tablas" },
    { title: "Volumen", link: "/volumen" },
  ];

  const machinesMenus = [
    { title: "Maquinaria", link: "/maquinaria" },
    { title: "Vehículos", link: "/vehiculos" },
    { title: "Plásticos", link: "/material" },
  ];

  const ExpensesMenus = [
    { title: "Gastos de vehículos", link: "/gastos/vehiculos" },
    { title: "Gastos de maquinaria", link: "/gastos/maquinaria" },
  ];

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.clear();
        navigate("/login"); // Navegar a la página de inicio de sesión
      })
      .catch((error) => {
        console.error("Error al cerrar sesión:", error);
      });
  };

  return (
    <div
      ref={modalRef}
      tabIndex={-1}
      className="fixed top-0 right-0 bottom-0 z-50 w-3/4 backdrop-blur-md flex flex-col items-center bg-white/50 rounded-l-lg"
    >
     <div className="flex justify-end w-full p-5">
        <button
          onClick={close}
          type="button"
          className="text-red-500 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
          aria-label="Cerrar modal"
        >
          <RiCloseFill size={20} />
        </button>
      </div>

<div></div>

<div>

      <MenuSection title="Empleados" menus={employeeMenus} icon={<RiTeamFill />} isOpen={isOpen} />
      <MenuSection title="Recolección" menus={urbanMenus} icon={<ImTruck />} isOpen={isOpen} />
      <MenuSection title="Materiales" menus={materialMenus} icon={<RiRecycleFill />} isOpen={isOpen} />
      <MenuSection title="Maquinaria" menus={machinesMenus} icon={<FaTools />} isOpen={isOpen} />
      <MenuSection title="Gastos" menus={ExpensesMenus} icon={<FaDollarSign />} isOpen={isOpen} />
</div>

      <div className="mt-20">
        <div className="mt-auto mb-5 flex flex-col justify-end w-full items-end">
          <button
            onClick={handleSignOut}
            className="font-semibold hover:text-red-700 text-end"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default HamburgerModal;
