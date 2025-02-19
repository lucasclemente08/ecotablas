import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { Link, useNavigate } from "react-router-dom";
import { LuPanelLeftOpen, LuPanelRightOpen } from "react-icons/lu";
import Links from "../components/LinksBar";
import { FaSignOutAlt } from "react-icons/fa";
import ReportButton from "../components/buttons/ReportButton";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.clear();
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error al cerrar sesión: ", error);
      });
  };

  return (
    <div
      className={`${
        isOpen ? "w-[250px]" : "w-[80px]"
      } bg-sky-600 h-full flex flex-col duration-300`}
    >
      {/* Botón para colapsar/expandir */}
      <div className="flex justify-end p-2">
        <button
          onClick={toggleSidebar}
          className="text-white p-2 rounded-full focus:outline-none"
        >
          {isOpen ? (
            <LuPanelRightOpen className="w-5 h-5" />
          ) : (
            <LuPanelLeftOpen className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Logo y Título */}
      <div className="flex flex-col items-center mt-4">
        <Link to="/">
          <figure className="text-center flex items-center font-bold text-3xl">
            <img
              width="60"
              height="60"
              className="m-auto"
              src="https://img.icons8.com/external-soft-fill-juicy-fish/60/external-eco-packaging-symbols-soft-fill-soft-fill-juicy-fish.png"
              alt="Logo"
            />
          </figure>
          <h1
            className={`text-white font-medium text-xl duration-300 ${
              !isOpen && "scale-0"
            }`}
          >
            Gestión de Ecotablas
          </h1>
        </Link>
      </div>

      {/* Enlaces */}
      <div className="flex flex-col items-center mt-4">
        <Links isOpen={isOpen} />
            

      
      </div>  <ReportButton isOpen={isOpen} />

      {/* Botón de cerrar sesión */}
      <div className="mt-auto flex justify-center mb-4">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 bg-[#7F2323] rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
        >
          <FaSignOutAlt className="w-5 h-5" />
          {isOpen && "Cerrar sesión"}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
