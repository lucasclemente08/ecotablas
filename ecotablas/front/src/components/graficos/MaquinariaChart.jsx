import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels); // Asegúrate de que ChartDataLabels se registre correctamente

const MaquinariaChart = () => {
  const [maquinarias, setMaquinarias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMaquinarias = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "http://www.ecotablasapi.somee.com/api/Maquinaria/ListarTodo",
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
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#FFFFFF",
        },
      },
      datalabels: {
        color: "#FFF",
        anchor: "center",
        align: "center",
        font: {
          weight: "bold",
          size: 14,
        },
        formatter: (value) => (value > 0 ? value : ""),
      },
    },
  };

  return (
    <div className="w-full max-w-sm mx-auto p-4 rounded-md shadow-md">
      {loading ? (
        <p className="text-center text-gray-300">Cargando datos...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <>
          <h3 className="text-xl font-semibold mt-4 text-white text-center mb-4">
            Estados de Maquinarias
          </h3>
          <div className="relative h-[300px]">
            <Doughnut data={data} options={options} />
          </div>
        </>
      )}
    </div>
  );
};

export default MaquinariaChart;
