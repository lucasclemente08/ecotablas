import React, { useEffect } from "react";
import TotalCard from "./TotalChart";
import { FaCogs } from "react-icons/fa";
import { useState } from "react";
const ActiveMachine = () => {
  const [maquinarias, setMaquinarias] = useState([]);

  // Función para obtener los datos de la API
  const fetchMaquinarias = async () => {
    try {
      const response = await fetch(
        "http://www.ecotablasapi.somee.com/api/Maquinaria/ListarTodo",
      );
      if (!response.ok) throw new Error("Error al obtener las maquinarias");
      const data = await response.json();
      setMaquinarias(data);
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
    operativa: maquinarias.filter((m) => m.IdEstado === 1).length,
  };

  return (
    <div>
      <TotalCard
        title="Maquinaria Operativa"
        value={estados.operativa}
        icon={<FaCogs />}
        iconStyle="text-red-400 text-4xl"
        bgColor="bg-red-600"
      />
    </div>
  );
};

export default ActiveMachine;
