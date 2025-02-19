import { useEffect, useRef } from "react";
import { RiCloseFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import { LuPanelLeftOpen, LuPanelRightOpen } from "react-icons/lu";

import { FaSignOutAlt } from "react-icons/fa";

import MenuSection from "./MenuSectionNavBar";
import { ImTruck } from "react-icons/im";
import { RiTeamFill, RiRecycleFill, } from "react-icons/ri";
import { FaTools, FaDollarSign,FaUserPlus} from "react-icons/fa";
import ReportButton from "./buttons/ReportButton";

import { useRole } from "../context/RoleContext";

const HamburgerModal = ({ isOpen, close }) => {
  const modalRef = useRef(null);
  const navigate = useNavigate();

  const role=useRole();
  
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
  

  const adminMenus = [
    { title: "Gestión de Usuarios", link: "/admin" },
    // { title: "Configuración del Sistema", link: "/admin/config" },
    // { title: "Reportes", link: "/admin/reportes" },
  ];







  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        close(); // Cierra el modal si se hace clic fuera de él
      }
    };

  }, [isOpen, close]);

  if (!isOpen) return null; // No renderizar el modal si isOpen es false

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.clear();
        navigate("/login");
      })
      .catch((error) => console.error("Error al cerrar sesión:", error));
  };

  return (
    <div
      ref={modalRef}
      tabIndex={-1}
      className="fixed top-0 right-0 bottom-0 z-50 w-96 backdrop-blur-md flex flex-col items-center bg-sky-600 rounded-l-lg"
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

<div className="flex flex-col items-center gap-4 w-full text-white">

{role.role === "admin" && <MenuSection title="Administración" menus={adminMenus} icon={<FaUserPlus />} isOpen={isOpen} />}
      <MenuSection title="Empleados" menus={employeeMenus} icon={<RiTeamFill />} isOpen={isOpen} />
      <MenuSection title="Recolección" menus={urbanMenus} icon={<ImTruck />} isOpen={isOpen} />
      <MenuSection title="Materiales" menus={materialMenus} icon={<RiRecycleFill />} isOpen={isOpen} />
      <MenuSection title="Maquinaria" menus={machinesMenus} icon={<FaTools />} isOpen={isOpen} />
      <MenuSection title="Gastos" menus={ExpensesMenus} icon={<FaDollarSign />} isOpen={isOpen} />


      <ReportButton isOpen={isOpen} />

</div>
     <div className="mt-auto flex justify-center mb-4">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 bg-[#7F2323] rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
        >
          <FaSignOutAlt className="w-5 h-5" />
          Cerrar sesión
        </button>
      </div>


    </div>
  );
};

export default HamburgerModal;
