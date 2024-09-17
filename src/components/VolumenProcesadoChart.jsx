import React, { useState, useEffect } from "react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, Filler);

const VolumenProcesadoChart = ({ dateRange }) => {
  const [volumenProcesado, setVolumenProcesado] = useState(0);

  useEffect(() => {
    if (!dateRange.startDate || !dateRange.endDate) return;

    axios
      .get(
        "http://www.trazabilidadodsapi.somee.com/api/Volumen/ObtenerVolumen",
        {
          params: {
            fechaInicio: dateRange.startDate,
            fechaFin: dateRange.endDate,
          },
        },
      )
      .then((response) => {
        setVolumenProcesado(response.data.VolumenProcesado || 0);
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los datos:", error);
      });
  }, [dateRange]);

  const chartData = {
    labels: ["Volumen Procesado"],
    datasets: [
      {
        label: "Volumen",
        data: [volumenProcesado],
        backgroundColor: ["#4CAF50"],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const value = tooltipItem.raw;
            return `${tooltipItem.label}: ${value} kg`;
          },
        },
      },
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `Total Volumen Procesado: ${volumenProcesado} kg`,
        position: "top",
        font: {
          size: 14,
        },
        color: "#FFFFFF",
      },
    },
    elements: {
      arc: {
        borderWidth: 1,
      },
    },
  };

  return (
    <div className="flex flex-col items-center mb-8 p-4">
      <h3 className="text-lg font-semibold text-white mb-2">
        Volumen Procesado
      </h3>
      <div style={{ position: "relative", width: "300px", height: "300px" }}>
        <Doughnut data={chartData} options={options} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white font-bold">
          {volumenProcesado} kg
        </div>
      </div>
    </div>
  );
};

export default VolumenProcesadoChart;
