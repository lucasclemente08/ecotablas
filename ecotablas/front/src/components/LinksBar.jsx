import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuSection from "./MenuSection";

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
    { title: "Vehículos", link: "/vehiculos" },
    { title: "Empresa Donante", link: "/empresa" },
  ];

  const materialMenus = [
    { title: "Entrada de material", link: "/Entrada/material" },
    { title: "Clasificacíon de material", link: "/clasificacion" },
    { title: "Material Procesado", link: "/materialProc" },
    { title: "Material Triturado", link: "/materialTri" },
    { title: "Volumen", link: "/volumen" },
    { title: "Tablas producidas", link: "/tablas" },
  ];

  const machinesMenus = [
    { title: "Maquinaria", link: "/maquinaria" },
    { title: "Tolva", link: "/Tolva" },
    { title: "Lavado de material", link: "/lavado" },
    { title: "Plásticos", link: "/material" },
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
      <MenuSection title="Empleados" menus={employeeMenus} />
      <MenuSection title="Recolección Urbanos" menus={urbanMenus} />
      <MenuSection title="Materiales" menus={materialMenus} />
      <MenuSection title="Maquinaria" menus={machinesMenus} />
    </>
  );
};

export default LinksBar;
