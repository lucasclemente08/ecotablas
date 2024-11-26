import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { Link, useNavigate } from "react-router-dom";
import Links from "../components/LinksBar";
import { FaSignOutAlt } from "react-icons/fa";
import ReportButton from "../components/buttons/ReportButton";
const Sidebar = () => {
  const [open, setOpen] = useState(true);
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
    <div className="flex">
      <div
        className={`${
          open ? "w-60" : "w-20"
        } bg-sky-600 min-h-screen duration-300 shadow-md`}
      >
        <div className="flex flex-col items-center m-1 p-4">
          <div className="mt-1">
            <Link to='/' >

            <h1
              className={`text-white font-medium text-xl duration-200 ${
                !open && "scale-0"
              }`}
            >
               <figure className="text-center font-bold text-3xl">
          <img
            width="60"
            height="60"
            className="m-auto"
            src="https://img.icons8.com/external-soft-fill-juicy-fish/60/external-eco-packaging-symbols-soft-fill-soft-fill-juicy-fish.png"
            alt="external-eco-packaging-symbols-soft-fill-soft-fill-juicy-fish"
          />
      
        </figure>
              Gestión de ecotablas
            </h1>
            </Link>
          </div>
        </div>
        <div className="flex flex-col justify-center ml-4">
        <Links />

        </div>

        <div className="text-left">
          <ReportButton />
        </div>

        <div className="mt-60 text-center justify-center mb-5 flex w-full">
        <button
  onClick={handleSignOut}
  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 bg-[#7F2323] rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
  aria-label="Cerrar sesión"
>
  <FaSignOutAlt className="w-5 h-5" />
  Cerrar sesión
</button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
