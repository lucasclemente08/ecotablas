import React, { useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import HamburgerModal from './HamburguerModal';

import { Link } from 'react-router-dom'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="  ">

   
    <nav className="flex  items-end content-end justify-end  py-3 px-5  bg-sky-600 font-aeonik">
      <div className="flex gap-10 items-center">
        <Link to="/">
          {/* <img src={logo} alt="Aventura Compartida Logo" width={100} height={50} /> */}
        </Link>
        <div className="hidden md:flex">
          
      
        </div>
      </div>
      

      <div className="flex gap-5 items-center">
        <Link
          to="/"
          className="bg-light-green text-white font-medium rounded-full py-3 px-5 hover:bg-white hover:text-light-green hover:border-light-green border hidden md:block"
        >
          Configuracion
        </Link>
        {/* <Avatar /> */}
      </div>

      <button
        className="md:hidden text-light-green"
        onClick={() => setIsOpen(true)}
        aria-label="Abrir menú"
      >
        <HiMenu className="text-5xl text-white" />
      </button>

      <HamburgerModal open={isOpen} close={() => setIsOpen(false)} />

    </nav>
    </div>
  );
};

export default Navbar;
