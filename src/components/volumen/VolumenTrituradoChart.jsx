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

const VolumenTrituradoChart = ({ dateRange }) => {
  const [volumenTriturado, setVolumenTriturado] = useState(0);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];

    const startDate = dateRange?.startDate || today;
    const endDate = dateRange?.endDate || today;

    axios
      .get(
        "http://www.trazabilidadodsapi.somee.com/api/Volumen/ObtenerVolumen",
        {
          params: {
            fechaInicio: startDate,
            fechaFin: endDate,
          },
        },
      )
      .then((response) => {
        setVolumenTriturado(response.data.VolumenTriturado || 0);
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los datos:", error);
      });
  }, [dateRange]);

  const chartData = {
    labels: ["Volumen Triturado"],
    datasets: [
      {
        label: "Volumen",
        data: [volumenTriturado],
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
        text: `Total Volumen Triturado: ${volumenTriturado} kg`,
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
        Volumen Triturado
      </h3>
      <div style={{ position: "relative", width: "300px", height: "300px" }}>
        <Doughnut data={chartData} options={options} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white font-bold">
          {volumenTriturado} kg
        </div>
      </div>
    </div>
  );
};

export default VolumenTrituradoChart;
