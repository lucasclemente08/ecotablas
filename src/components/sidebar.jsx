import { useState, useEffect } from 'react';
import { getAuth, signOut } from "firebase/auth";
const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);


  const Menus = [
    {
      title: "Inicio",
      link: "/", 
    },
    {
      title: "Empleados",
      link: "/empleados",
    },
    {
      title: "Tablas",
      link: "/tablas",
    },
    {
      title: "Plasticos",
      link: "/material",
    },
    {
      title: "Ajustes",
      link: "/ajustes",
    },
  ];
  const handleSignOut = () => {
    if (window.confirm("¿Estás seguro de que deseas cerrar sesión?")) {
        signOut(auth)
            .then(() => {
                navigate('/login');
            })
            .catch((error) => {
                console.error("Error al cerrar sesión: ", error);
            });
    }
};

  return (
    <div className="   h-dvh">
      <div
        className={`${
          open ? "w-28" : "w-20"
        } bg-dark-purple  w-60 min-h-screen  pt-1 bg-sky-600 shadow relative duration-300`}
      >
        <div className="flex flex-col items-center m-1 p-4">
          <div className='mt-10'>
            <h1
              className={`text-white origin-left font-medium text-xl duration-200 ${
                !open && "scale-0"
              }`}
            >
              Gestión de ecotablas
            </h1>
          </div>
        </div>
        <ul className={`   ${!open ? 'pb-6' : 'pt-6'}`}>
        {Menus.map((Menu, index) => (
  <li
    key={index}
    className={`flex rounded-md p-2 cursor-pointer justify-center flex-col flex-nowrap text-l hover:bg-light-white text-gray-300 items-center ${
      Menu.gap ? "mt-9" : "mt-2"
    } ${index === 0 && "bg-light-white"}`}
  >
    <a href={Menu.link} className="flex flex-col flex-nowrap justify-center items-center">

      <span className={`${!open && "hidden"} origin-left duration-200`}>
        {Menu.title}
      </span>
    </a>
  </li>
  
))}
<li> 
               <div className="mt-10 text-center justify-center mb-5 flex w-full">
                <button
                    onClick={handleSignOut}
                    className="font-semibold text-white hover:text-red-600">
                    Cerrar sesión
                </button>
            </div>
        </li>
 

          {/* <div className="text-gray-500 flex text-center py-2 mb-3">
            Alpha version 0.0.1
          </div> */}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
