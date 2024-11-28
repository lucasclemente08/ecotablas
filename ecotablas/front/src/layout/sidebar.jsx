import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { Link, useNavigate } from "react-router-dom";
import { LuPanelLeftOpen } from "react-icons/lu";
import Links from "../components/LinksBar";
import { FaSignOutAlt, FaBars } from "react-icons/fa";
import ReportButton from "../components/buttons/ReportButton";
import { LuPanelRightOpen } from "react-icons/lu";
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
      {/* Sidebar */}
      <div
        className={`${
          open ? "w-60" : "w-20"
        } bg-sky-600 min-h-screen duration-300 `}
      >
           <div className={`${!open ? "m-5" : ""} flex items-center justify-end content-center`}>
  <button
    onClick={() => setOpen(!open)}
    className="text-center align-center text-white p-2 rounded-full  focus:outline-none"
  >
    {open ? (
      <LuPanelRightOpen className="w-5 h-5" />
    ) : (
      <LuPanelLeftOpen className="w-5 h-5" />
    )}
  </button>
</div>

        {/* Logo and Title */}
        <div className="flex flex-col items-center m-1 p-4">
   {/* Toggle Button */}



          <div className="mt-1">
            <Link to="/">
            <figure className="text-center flex items-center  font-bold text-3xl">
                  <img
                    width="60"
                    height="60"
                    className="m-auto"
                    src="https://img.icons8.com/external-soft-fill-juicy-fish/60/external-eco-packaging-symbols-soft-fill-soft-fill-juicy-fish.png"
                    alt="external-eco-packaging-symbols-soft-fill-soft-fill-juicy-fish"
                  />
                </figure>
              <h1
                className={`text-white font-medium text-xl duration-200 ${
                  !open && "scale-0"
                }`}
              >

                Gestión de ecotablas
              </h1>
        
            </Link>
    
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col items-center justify-center ml-2">
          <Links isOpen={open} />
          <div className={`${!open ? "" : ""} flex items-center content-center`}>
          <ReportButton isOpen={open}  />
        </div>
        </div>

    


        {/* Sign Out Button */}
        <div className="mt-20 text-center justify-center mb-5 flex w-full">
          
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 bg-[#7F2323] rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
            aria-label="Cerrar sesión"
          >
            <FaSignOutAlt className="w-5 h-5" />
            {open && "Cerrar sesión"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
