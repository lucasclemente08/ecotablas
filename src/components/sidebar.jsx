import { useState } from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../firebase/firebase';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const [employeeOpen, setEmployeeOpen] = useState(false);
  const [urbanOpen, setUrbanOpen] = useState(false);
  const [materialOpen, setMaterialOpen] = useState(false);

  const employeeMenus = [
    { title: "Empleados", link: "/empleados" },
    { title: "Áreas y turnos de trabajo", link: "/areas" },
    { title: "Perfil", link: "/profile" }
  ];

  const urbanMenus = [
    { title: "Recolección Urbanos", link: "/recoleccion" },
    { title: "Vehículos", link: "/vehiculos" },
    { title: "Empresa Donante", link: "/empresa" }
  ];

  const materialMenus = [
    { title: "Material Triturado", link: "/materialTri" },
    { title: "Material Procesado", link: "/materialProc" },
    { title: "Plásticos", link: "/material" }
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

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        console.error("Error al cerrar sesión: ", error);
      });
  };

  return (
    <div className="h-dvh">
      <div
        className={`${
          open ? "w-28" : "w-20"
        } bg-dark-purple w-60 min-h-screen pt-1 bg-sky-600 shadow relative duration-300`}
      >
        <div className="flex flex-col items-center m-1 p-4">
          <div className="mt-10">
            <h1
              className={`text-white origin-left font-medium text-xl duration-200 ${
                !open && "scale-0"
              }`}
            >
              Gestión de ecotablas
            </h1>
          </div>
        </div>

        {/* Sección de Empleados */}
        <li
          className={`flex rounded-md p-2 cursor-pointer justify-center flex-col flex-nowrap text-l hover:bg-light-white text-gray-300 items-center mt-2`}
          onClick={toggleEmployeeMenu}
        >
          <div className="flex flex-col flex-nowrap justify-center items-center">
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              Empleados
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
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              Recolección de Urbanos
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
                <span className={`${!open && "hidden"} origin-left duration-200`}>
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
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              Materiales
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
