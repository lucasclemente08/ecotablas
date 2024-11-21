import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const MaquinariaChart = () => {
  const [maquinarias, setMaquinarias] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función para obtener los datos de la API
  const fetchMaquinarias = async () => {
    try {
      const response = await fetch("http://www.gestiondeecotablas.somee.com/api/Maquinaria/ListarTodo"); // Cambia por tu URL
      if (!response.ok) throw new Error("Error al obtener las maquinarias");
      const data = await response.json();
      setMaquinarias(data);
    } catch (error) {
      console.error(error);
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
    rota: maquinarias.filter((m) => m.IdEstado === 2).length,
    enReparacion: maquinarias.filter((m) => m.IdEstado === 3).length,
  };

  const data = {
    labels: ["Operativa", "Rota", "En Reparación"],
    datasets: [
      {
        label: "Cantidad de Maquinarias",
        data: [estados.operativa, estados.rota, estados.enReparacion],
        backgroundColor: ["#4CAF50", "#F44336", "#FFEB3B"],
        borderColor: ["#388E3C", "#D32F2F", "#FBC02D"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  // Renderiza el gráfico o un indicador de carga
  return (
    <div className="w-full max-w-sm mx-auto">
      {loading ? (
        <p className="text-center text-gray-600">Cargando datos...</p>
      ) : (
        <>
          <h3 className="text-xl font-semibold mt-4 text-white text-center mb-4">
            Estados de Maquinarias
          </h3>
          <Doughnut data={data} options={options}  />
        </>
      )}
    </div>
  );
};

export default MaquinariaChart;
