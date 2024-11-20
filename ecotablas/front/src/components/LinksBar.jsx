import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuSection from "./MenuSection";
import { ImTruck } from "react-icons/im";
import { RiTeamFill, RiRecycleFill } from "react-icons/ri";

import { FaTools, FaDollarSign } from "react-icons/fa";
const LinksBar = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const [employeeOpen, setEmployeeOpen] = useState(false);
  const [urbanOpen, setUrbanOpen] = useState(false);
  const [materialOpen, setMaterialOpen] = useState(false);
  const [machinesOpen, setMachinesOpen] = useState(false);

  const employeeMenus = [
    { title: "Empleados", link: "/empleados" },
    { title: "Áreas y turnos de trabajo", link: "/areas" },
    { title: "Perfil", link: "/profile" },
  ];

  const urbanMenus = [
    { title: "Recolección Urbanos", link: "/recoleccion" },

    { title: "Empresa Donante", link: "/empresa" },
  ];

  const materialMenus = [
    { title: "Entrada de material", link: "/Entrada/material" },
    { title: "Clasificacíon de material", link: "/clasificacion" },
    // { title: "Material Procesado", link: "/materialProc" },
    { title: "Material Triturado", link: "/materialTri" },
    { title: "Tolva", link: "/Tolva" },
    { title: "Tablas producidas", link: "/tablas" },
    { title: "Volumen", link: "/volumen" },
  ];

  const machinesMenus = [
    { title: "Maquinaria", link: "/maquinaria" },
    { title: "Vehículos", link: "/vehiculos" },
    // { title: "Lavado de material", link: "/lavado" },
    { title: "Plásticos", link: "/material" },
  ];
  const ExpensesMenus = [
    { title: "Gastos de vehículos", link: "/gastos/vehiculos" },
    { title: "Gastos de maquinaria", link: "/gastos/maquinaria" },
  ];

  const toggleEmployeeMenu = () => {
    setEmployeeOpen(!employeeOpen);
  };

  const toggleMachineMenu = () => {
    setMachinesOpen(!machinesOpen);
  };

  const toggleUrbanMenu = () => {
    setUrbanOpen(!urbanOpen);
  };

  const toggleMaterialMenu = () => {
    setMaterialOpen(!materialOpen);
  };

  return (
    <>
      <MenuSection 
  title="Empleados" 
  menus={employeeMenus} 
  icon={<RiTeamFill />} 
/>
<MenuSection 
  title="Recolección" 
  menus={urbanMenus} 
  icon={<ImTruck />} 
/>
<MenuSection 
  title="Materiales" 
  menus={materialMenus} 
  icon={<RiRecycleFill />} 
/>
<MenuSection 
  title="Maquinaria" 
  menus={machinesMenus} 
  icon={<FaTools />} 
/>
<MenuSection 
  title="Gastos" 
  menus={ExpensesMenus} 
  icon={<FaDollarSign />} 
/>
    </>
  );
};

export default LinksBar;
