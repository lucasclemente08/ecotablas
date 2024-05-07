import { useState, useEffect } from 'react';

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsMobile(window.innerWidth < 900); 
  //   };
  //   window.addEventListener('resize', handleResize);
  //   handleResize();
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

  const Menus = [
    {
      title: "Inicio",
    },
    {
      title: "Empleados",
    },
    {
        title: "Tablas",
      },
      {
        title: "Plasticos",
      },
    {
      title: "Ajustes",
    },
  ];

  return (
    <div className="">
      <div
        className={`${
          open ? "w-28" : "w-20"
        } bg-dark-purple h-screen w-80  p-5  bg-sky-600 shadow relative duration-300`}
      >
        <div className="flex flex-col items-center m-1 p-6">
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
              <a href='/' className="flex flex-col flex-nowrap justify-center items-center">
                <div key={index}></div>
                <span className={`${!open && "hidden"} origin-left duration-200`}>
                  {Menu.title}
                </span>
              </a>
            </li>
          ))}
          {/* <div className="text-gray-500 flex text-center py-2 mb-3">
            Alpha version 0.0.1
          </div> */}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
