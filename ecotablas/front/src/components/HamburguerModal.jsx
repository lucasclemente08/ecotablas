import { useEffect, useRef } from "react";
import { RiCloseFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";

import MenuSection from "./MenuSectionNavBar";
import { ImTruck } from "react-icons/im";
import { RiTeamFill, RiRecycleFill } from "react-icons/ri";
import { FaTools, FaDollarSign } from "react-icons/fa";

const HamburgerModal = ({ isOpen, close }) => {
  const modalRef = useRef(null);
  const navigate = useNavigate();

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

      <MenuSection title="Empleados" menus={[{ title: "Empleados", link: "/empleados" }]} icon={<RiTeamFill />} />
      <MenuSection title="Recolección" menus={[{ title: "Recolección Urbanos", link: "/recoleccion" }]} icon={<ImTruck />} />
      <MenuSection title="Materiales" menus={[{ title: "Materiales", link: "/materiales" }]} icon={<RiRecycleFill />} />
      <MenuSection title="Maquinaria" menus={[{ title: "Maquinaria", link: "/maquinaria" }]} icon={<FaTools />} />
      <MenuSection title="Gastos" menus={[{ title: "Gastos", link: "/gastos" }]} icon={<FaDollarSign />} />

      <div className="mt-auto mb-5 flex flex-col justify-center text-center w-full items-end">
        <button onClick={handleSignOut} className="font-semibold hover:text-red-700 text-end">
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default HamburgerModal;
