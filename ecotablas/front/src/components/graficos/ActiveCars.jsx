import React from "react";
import { FaCogs } from "react-icons/fa";
import { useState, useEffect } from "react";
import TotalCard from "./TotalChart";
const ActiveCars = () => {
  const [trucks, setTrucks] = useState([]);

  const fetchMaquinarias = async () => {
    try {
      const response = await fetch(
        "http://www.ecotablasapi.somee.com/api/Vehiculos/ListarTodo",
      );
      if (!response.ok) throw new Error("Error al obtener las maquinarias");
      const data = await response.json();
      setTrucks(data);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  useEffect(() => {
    fetchMaquinarias();
  }, []);

  // Calcula los estados de las maquinarias
  const estados = {
    operativa: trucks.filter((m) => m.IdEstado === 1).length,
  };

  return (
    <>
      <TotalCard
        title="Vehiculos Operativos"
        value={estados.operativa}
        icon={<FaCogs />}
        iconStyle="text-yellow-400 text-4xl"
        bgColor="bg-yellow-600"
      />
    </>
  );
};

export default ActiveCars;
