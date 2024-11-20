import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { Link, useNavigate } from "react-router-dom";
import Links from "../components/LinksBar";
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
            className="font-semibold text-white hover:text-red-600"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
