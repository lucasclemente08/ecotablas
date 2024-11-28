import React, { useEffect, useState } from "react";
import TotalCard from "./TotalChart";
import { FaCogs } from "react-icons/fa";
const ActiveMachine = () => {
  const [maquinarias, setMaquinarias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para obtener los datos de la API
  const fetchMaquinarias = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "http://www.gestiondeecotablas.somee.com/api/Maquinaria/ListarTodo"
      );
      if (!response.ok) throw new Error("Error al obtener las maquinarias");
      const data = await response.json();
      setMaquinarias(data);
      setError(null);
    } catch (error) {
      console.error(error);
      setError("No se pudieron cargar los datos. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaquinarias();
  }, []);

  // Calcula los estados de las maquinarias
  const estados = {
    operativa: maquinarias.filter((m) => m.IdEstado === 1).length,
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

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
