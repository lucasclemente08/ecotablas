import React from "react";
import MenuSection from "./MenuSection";
import { ImTruck } from "react-icons/im";
import { RiTeamFill, RiRecycleFill } from "react-icons/ri";
import { FaTools, FaDollarSign } from "react-icons/fa";

const LinksBar = ({ isOpen }) => {
  const employeeMenus = [
    { title: "Empleados", link: "/empleados" },
    { title: "Áreas y turnos de trabajo", link: "/areas" },
    { title: "Perfil", link: "/profile" },
  ];

  const urbanMenus = [
    { title: "Recolección Urbanos", link: "/recoleccion" },
    { title: "Empresa Donante", link: "/empresa" },
    { title: "Rutas", link: "/rutas" },
  ];

  const materialMenus = [
    { title: "Entrada de material", link: "/Entrada/material" },
    { title: "Clasificacíon de material", link: "/clasificacion" },
    { title: "Material Triturado", link: "/materialTri" },
    { title: "Tolva", link: "/Tolva" },
    { title: "Tablas producidas", link: "/tablas" },
    { title: "Volumen", link: "/volumen" },
  ];

  const machinesMenus = [
    { title: "Maquinaria", link: "/maquinaria" },
    { title: "Vehículos", link: "/vehiculos" },
    { title: "Plásticos", link: "/material" },
  ];

  const ExpensesMenus = [
    { title: "Gastos de vehículos", link: "/gastos/vehiculos" },
    { title: "Gastos de maquinaria", link: "/gastos/maquinaria" },
  ];

  return (
    <>
      <MenuSection title="Empleados" menus={employeeMenus} icon={<RiTeamFill />} isOpen={isOpen} />
      <MenuSection title="Recolección" menus={urbanMenus} icon={<ImTruck />} isOpen={isOpen} />
      <MenuSection title="Materiales" menus={materialMenus} icon={<RiRecycleFill />} isOpen={isOpen} />
      <MenuSection title="Maquinaria" menus={machinesMenus} icon={<FaTools />} isOpen={isOpen} />
      <MenuSection title="Gastos" menus={ExpensesMenus} icon={<FaDollarSign />} isOpen={isOpen} />
    </>
  );
};

export default LinksBar;
