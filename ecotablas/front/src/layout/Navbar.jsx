// Navbar.jsx
import React from "react";
import { HiMenu } from "react-icons/hi";
import HamburgerModal from "../components/HamburguerModal";

const Navbar = ({ isOpen, close }) => {
  return (
    <nav className="flex justify-end py-2 px-2 font-aeonik">
      <button
        className="md:hidden text-light-green"
        onClick={close}
        aria-label="Abrir menú"
        aria-expanded={isOpen}
      >
        <HiMenu className="text-5xl text-white" />
      </button>
      <HamburgerModal isOpen={isOpen} close={close} />
    </nav>
  );
};

export default Navbar;
